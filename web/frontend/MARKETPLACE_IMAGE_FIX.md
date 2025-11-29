## Fix for Marketplace.jsx Image Display

### Problem
Images are not loading in the Marketplace because the `normalizeProducts` function doesn't properly handle the images array from the API.

### Solution
Replace the `normalizeProducts` function (around line 103-116) with this updated version:

```javascript
const normalizeProducts = (items = []) =>
  items.map((item, idx) => {
    // Normalize images array - handle both strings and objects
    let imageUrl = '🛒';
    if (item.images && item.images.length > 0) {
      const firstImage = item.images[0];
      if (typeof firstImage === 'string') {
        imageUrl = firstImage;
      } else {
        imageUrl = firstImage?.image_url || firstImage?.url || '🛒';
      }
    } else if (item.image) {
      imageUrl = item.image;
    }

    return {
      id: item.id ?? `api-${idx}`,
      name: item.name ?? 'Unnamed product',
      price: Number(item.price) || 0,
      quantity: item.quantity_available ?? item.quantity ?? 0,
      qualityScore: item.quality_score ?? item.qualityScore ?? 70,
      region: item.region ?? item.location ?? 'Unknown region',
      type: item.category ?? item.type ?? 'Other',
      image: imageUrl,
      supplier: item.producer?.fullname ?? item.supplier ?? `Producer #${item.producer_id ?? 'N/A'}`,
      demand: item.demand ?? item.demand_level ?? 'Medium',
      inquiries: item.inquiries ?? item.inquiries_count ?? 0,
    };
  });
```

### What Changed
- Added proper handling for images array that can contain either:
  - **Strings**: Direct image paths
  - **Objects**: With `image_url` or `url` properties
- This matches the same logic used in ProductDetail.jsx
- Falls back to emoji if no image is found

### How to Apply
1. Open `src/components/buyer/Marketplace.jsx`
2. Find the `normalizeProducts` function (starts around line 103)
3. Replace the entire function with the code above
4. Save the file

The images should now load correctly in the marketplace! 🎉
