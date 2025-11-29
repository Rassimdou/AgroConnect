import getConnection from "../../services/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.AUTH_MAIL,
        pass: process.env.AUTH_PASS
    }
});

const isProduction = process.env.NODE_ENV === 'production';
const authCookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: false,
};

const clearCookieOptions = {
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    path: '/',
};

const setAuthCookie = (res, token) => {
    res.cookie('token', token, authCookieOptions);
};

export const registernewUser = async (req, res) => {
    const { fullname, email, password, phone_number } = req.body;

    if (!fullname || !email || !password || !phone_number) {
        console.error("Validation error: Missing fields.");
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const connection = await getConnection();
        console.log("Connected to the database successfully.");


        const [existingUsers] = await connection.promise().query(
            "SELECT * FROM users WHERE email = ? OR fullname = ? OR phone_number = ?",
            [email, fullname, phone_number]
        );
        console.log("Existing users:", existingUsers);


        if (existingUsers.length > 0) {
            console.log('user already exists')
            return res.status(409).json({ error: "User already exists with this email or username." });
        }

        const hashedpw = await bcrypt.hash(password, 10);
        const user = { fullname, email, password: hashedpw, phone_number };

        const [result] = await connection.promise().query("INSERT INTO users SET ?", user);
        console.log("User created successfully.");


        await connection.end();
        console.log("Connection to the database closed.");

        await sendOTPverificationEmail({ _id: result.insertId, user_type: "user", email: user.email });

        return res.status(201).json({ userId: result.insertId, message: "User created successfully." });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}
export const registerNewProducer = async (req, res) => {
    const { fullname, email, password, phone_number, location, domain } = req.body;

    if (!fullname || !email || !password || !phone_number || !location || !domain) {
        console.error("Validation error: Missing fields.");
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const connection = await getConnection();
        console.log("Connected to the database successfully.");


        const [existingProducers] = await connection.promise().query(
            "SELECT * FROM producers WHERE email = ? OR fullname = ? OR phone_number = ?",
            [email, fullname, phone_number]
        );
        console.log("Existing Producers:", existingProducers);


        if (existingProducers.length > 0) {
            console.log('producer already exists')
            return res.status(409).json({ error: "producer already exists with this email or username." });
        }

        const hashedpw = await bcrypt.hash(password, 10);
        const producer = { fullname, email, password: hashedpw, phone_number, location, domain };

        const [result] = await connection.promise().query("INSERT INTO producers SET ?", producer);
        console.log("User created successfully.");


        await connection.end();
        console.log("Connection to the database closed.");

        await sendOTPverificationEmail({ _id: result.insertId, user_type: "producer", email: producer.email });

        return res.status(201).json({ userId: result.insertId, message: "User created successfully." });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const registerNewTransporter = async (req, res) => {
    const { fullname, email, password, phone_number, location, vehicule_type, vehicule_plate } = req.body;

    if (!fullname || !email || !password || !phone_number || !vehicule_type || !vehicule_plate) {
        console.error("Validation error: Missing fields.");
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const connection = await getConnection();
        console.log("Connected to the database successfully.");


        const [existingTransporters] = await connection.promise().query(
            "SELECT * FROM transporters WHERE email = ? OR fullname = ? OR phone_number = ?",
            [email, fullname, phone_number]
        );
        console.log("Existing transporter", existingTransporters);


        if (existingTransporters.length > 0) {
            console.log('transporter already exists')
            return res.status(409).json({ error: "transporter already exists with this email or username." });
        }

        const hashedpw = await bcrypt.hash(password, 10);
        const transporter = { fullname, email, password: hashedpw, phone_number, vehicule_type, vehicule_plate };

        const [result] = await connection.promise().query("INSERT INTO transporters SET ?", transporter);
        console.log("User created successfully.");


        await connection.end();
        console.log("Connection to the database closed.");

        await sendOTPverificationEmail({ _id: result.insertId, user_type: "transporter", email: transporter.email });

        return res.status(201).json({ userId: result.insertId, message: "User created successfully." });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const loginUsers = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.error("Validation error: Missing fields.");
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        const connection = await getConnection();
        console.log("Connected to the database successfully.");
        const [users] = await connection.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: "user not found please sign in" });
        }
        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        console.log("User logged in successfully.");
        const token = jwt.sign({ id: user.id, fullname: user.fullname, role: "user", verified: user.verified_status }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        console.log(token);
        setAuthCookie(res, token);
        await connection.end();
        return res.status(200).json({ message: "Login successful." });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error." });
    };


}

export const loginproducers = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.error("Validation error: Missing fields.");
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        const connection = await getConnection();
        console.log("Connected to the database successfully.");
        const [producers] = await connection.promise().query("SELECT * FROM producers WHERE email = ?", [email]);
        if (producers.length === 0) {
            return res.status(401).json({ error: "producer not found please sign in" });
        }
        const producer = producers[0];
        const passwordMatch = await bcrypt.compare(password, producer.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        console.log("Producer logged in successfully.");
        const token = jwt.sign({ id: producer.id, fullname: producer.fullname, role: "producer", verified: producer.verified_status }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        setAuthCookie(res, token);
        await connection.end();
        return res.status(200).json({ message: "Login successful." });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error." });
    };


}
export const logintransporters = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.error("Validation error: Missing fields.");
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        const connection = await getConnection();
        console.log("Connected to the database successfully.");
        const [transporters] = await connection.promise().query("SELECT * FROM transporters WHERE email = ?", [email]);
        if (transporters.length === 0) {
            return res.status(401).json({ error: "transporter not found please sign in" });
        }
        const transporter = transporters[0];
        const passwordMatch = await bcrypt.compare(password, transporter.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        console.log("Transporter logged in successfully.");
        const token = jwt.sign({ id: transporter.id, fullname: transporter.fullname, role: "transporter", verified: transporter.verified_status }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        setAuthCookie(res, token);
        await connection.end();
        return res.status(200).json({ message: "Login successful." });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error." });
    };


}

export const getuserProfile = (req, res) => {
    // req.user is attached by the authenticateToken middleware.
    res.json({ user: req.user });

};

export const getproducerProfile = (req, res) => {
    res.json({ producer: req.user });
};
export const gettransporterProfile = (req, res) => {
    res.json({ transporter: req.user });
};

export const logout = (req, res) => {
    res.clearCookie('token', clearCookieOptions);
    res.status(200).json({ message: "Logout successful." });
};


export const verifyOTP = async (req, res) => {
    const { user_id, user_fullname, user_role, otp } = req.body;
    if (!user_id || !otp) {
        return res.status(400).json({ error: "User ID and OTP are required." });
    }
    try {
        const connection = await getConnection();
        const [userOTPverificationRecords] = await connection.promise().query("SELECT * FROM otp_verifications WHERE user_id = ?", [user_id]);
        if (userOTPverificationRecords.length === 0) {
            return res.status(400).json({ error: "OTP not found. Please request a new one." });
        } else {
            const expires_at = userOTPverificationRecords[0].expires_at;
            const hashedOTP = userOTPverificationRecords[0].otp_code;

            if (expires_at < Date.now()) {
                await connection.promise().query("DELETE FROM otp_verifications WHERE user_id = ?", [user_id]);
                await connection.end();
                return res.status(400).json({ error: "OTP has expired. Please request a new one." });
            } else {
                const isOTPValid = await bcrypt.compare(otp.toString(), hashedOTP);
                if (!isOTPValid) {
                    return res.status(400).json({ error: "Invalid OTP. Please try again." });
                } else {
                    if (user_role === "producer") {
                        await connection.promise().query("UPDATE producers SET verified_status = ? WHERE id = ?", ["verified", user_id]);
                    }
                    if (user_role === "user") {
                        await connection.promise().query("UPDATE users SET verified_status = ? WHERE id = ?", ["verified", user_id]);
                    }
                    if (user_role === "transporter") {
                        await connection.promise().query("UPDATE transporters SET verified_status = ? WHERE id = ?", ["verified", user_id]);
                    }
                    if (user_role === "service") {
                        await connection.promise().query("UPDATE services SET verified_status = ? WHERE id = ?", ["verified", user_id]);
                    }
                    await connection.promise().query("DELETE FROM otp_verifications WHERE user_id = ?", [user_id]);
                    await connection.end();
                    const [id, fullname] = [user_id, user_fullname,];
                    const token = jwt.sign({ id, fullname, role: user_role, verified: "verified" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                    setAuthCookie(res, token);
                    return res.status(200).json({ message: "Email verified successfully." });
                }
            }
        }

    } catch (err) {
        console.error("Error verifying OTP:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const sendOTPverificationEmail = async ({ _id, email, user_type }) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);

        const mailOptions = {
            from: process.env.AUTH_MAIL,
            to: email,
            subject: "Verify your email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email.</p>
                   <p>This OTP <b>expires in 60 minutes</b>.</p>`
        };

        const hashedOTP = await bcrypt.hash(otp.toString(), 10);
        const connection = await getConnection();
        const expires_at = new Date(Date.now() + 3600000);

        await connection.promise().query(
            `INSERT INTO otp_verifications (user_id, user_type, otp_code, created_at, expires_at)
             VALUES (?, ?, ?, NOW(), ?)
             ON DUPLICATE KEY UPDATE otp_code = ?, created_at = NOW(), expires_at = ?`,
            [_id, user_type, hashedOTP, expires_at, hashedOTP, expires_at]
        );

        await connection.end();

        await transporter.sendMail(mailOptions);

        console.log(`Sending OTP ${otp} to email: ${email}`);

        return { success: true };
    } catch (err) {
        console.error("Error sending OTP:", err);
        return { success: false };
    }
};


const authController = {
    registernewUser,
    registerNewProducer,
    registerNewTransporter,
    loginUsers,
    loginproducers,
    logintransporters,
    getuserProfile,
    getproducerProfile,
    gettransporterProfile,
    logout,
    verifyOTP
};

export default authController;
