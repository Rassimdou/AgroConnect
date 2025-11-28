# API Reference

All endpoints assume the server defined in `server.js` and use the base URL `http://<host>:<port>/api`. Unless stated otherwise, request/response bodies are JSON.

## Authentication & User Management (`/api/auth`)

### `POST /api/auth/register/user`
- **Description:** Create a standard user account and trigger email OTP verification.
- **Auth:** Not required.
- **Body:** `{ fullname, email, password, phone_number }` (all required).
- **Responses:**
  - `201 { userId, message }` on success (message: “User created successfully.”).
  - `400 { error }` when any required field is missing.
  - `409 { error }` if email, fullname, or phone number already exist.
  - `500 { error }` for database/other errors.

### `POST /api/auth/register/producer`
- **Body:** `{ fullname, email, password, phone_number, location, domain }`.
- **Behavior/Responses:** Same pattern as user registration; OTP email targets `producer`.

### `POST /api/auth/register/transporter`
- **Body:** `{ fullname, email, password, phone_number, location, vehicule_type, vehicule_plate }`.
- **Behavior/Responses:** Same pattern as user registration; OTP email targets `transporter`.

### `POST /api/auth/login/user`
- **Description:** Authenticate a user and issue a JWT (HTTP-only `token` cookie).
- **Body:** `{ email, password }`.
- **Responses:** `200 { message: "Login successful." }`, `400 { error }` for missing input, `401 { error }` for invalid credentials, `500 { error }` for server issues.

### `POST /api/auth/login/producer` and `POST /api/auth/login/transporter`
- Same contract as user login but scoped to the corresponding table/role. JWT payload contains `{ id, fullname, role, verified }` (where `verified` mirrors `verified_status` column).

### `POST /api/auth/verify/otp`
- **Description:** Validate OTP, mark the account as verified, issue a new JWT.
- **Body:** `{ user_id, user_fullname, user_role, otp }`.
- **Responses:** `200 { message }` on success; `400 { error }` for missing fields, unknown/expired/invalid OTP; `500 { error }` on failure.

### `GET /api/auth/profile/user`
- **Description:** Return authenticated user payload (`{ user: req.user }`).
- **Auth:** Requires valid JWT and `user` role (`authenticateToken`, `checkRole('user')`).
- **Responses:** `200 { user }`, `401` if no token, `403` if role mismatch.

### `GET /api/auth/profile/producer`
- **Response Body:** `{ producer: req.producer }` (note: middleware must populate `req.producer`; currently only JWT payload is set, so this endpoint will return `undefined` unless middleware augments the request).

### `GET /api/auth/profile/transporter`
- Same shape as producer profile but returns `{ transporter: req.transporter }`.

### `POST /api/auth/logout`
- **Description:** Clears the `token` cookie.
- **Responses:** `200 { message: "Logout successful." }`.

## AI Verification (`/api/ai`)

### `POST /api/ai/validate/product`
- **Description:** Aggregate multiple AI/heuristic checks to approve, recommend, or revoke a product listing.
- **Auth:** No middleware in `airoutes.js`, but typically should be protected.
- **Body:**
  ```json
  {
    "product_id": number,
    "image_path": "absolute/or/relative/path/to/file",   // optional
    "exif_metadata": { ... }                              // optional
  }
  ```
- **Process:**
  1. Loads product (must be in `pending_ai` state) from `products` table.
  2. Optionally runs image scoring prompt (`prompt.txt`) via Gemini (`aiImageProccessing`).
  3. Computes account-age score for the producer.
  4. Runs fraud-risk analysis prompt (`prompt2.txt`).
  5. Checks anomaly heuristics (recent listings, revoked history).
  6. Combines scores using `final = image*0.4 + accountAge*0.2 + fraud*0.2 + anomaly*0.2`.
- **Outcome:**
  - `final > 9`: product deleted (state implied `revoked_by_ai`), response `200` with `action: "banned_and_deleted"`.
  - `4 ≤ final ≤ 9`: product updated to `approved_by_ai`, response `200` with `action: "approved"`.
  - `< 4`: product updated to `recommended_by_ai`, response `200` with `action: "recommended"`.
- **Success Response:**
  ```json
  {
    "success": true,
    "finalScore": number,
    "breakdown": {
      "aiImageScore": number,
      "accountAgeScore": number,
      "fraudScore": number,
      "anomalyScore": number
    },
    "state": "approved_by_ai" | "recommended_by_ai" | "revoked_by_ai",
    "action": "approved" | "recommended" | "banned_and_deleted",
    "message": "Product approved with caution." // varies with final score
  }
  ```
- **Error Responses:** `400 { error }` for missing product ID or already-processed product, `404 { error }` if product not found, `500 { error }` for other failures.

## Reviews (`/api/review`)

> **Note:** `reviewRoutes.js` currently does not secure these endpoints—any caller can invoke them.

### `POST /api/review/give`
- **Description:** Create a review and update the corresponding summary row.
- **Body:** `{ author_id, author_type, target_id, target_type, rating, comment }` (all required).
- **Responses:**
  - `201 { message: "Review created successfully." }` when the target has no prior summary.
  - `409 { error }` if the author already reviewed the same target.
  - `400 { error }` for missing inputs.
  - `500 { error }` on DB failure.
  - _Current implementation does not send a response when updating an existing summary (bug)._

### `GET /api/review/getreviews/:target_id/:target_type`
- **Description:** Fetch all reviews for a specific target.
- **Responses:** `200` with an array of review records, `400 { error }` if params missing, `500 { error }` on failure.

---

### Authentication Helpers
- `authenticateToken` reads the JWT from `Authorization: Bearer <token>` or the `token` cookie.
- `checkRole(...roles)` verifies `req.user.role` (populated by the JWT payload) is one of the allowed roles.

Use these middlewares to protect additional routes as needed.


