// ─────────────────────────────────────────────────────────────
// Sanity Batch Import Script v3 - Chronological Sort Enabled
// Uploads all existing artwork + year covers to Sanity
// ─────────────────────────────────────────────────────────────

const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

// Load the secret variables safely from your local .env file
require('dotenv').config();

// ── Sanity client config ──
const client = createClient({
  projectId: "3kct911x",
  dataset: "production",
  useCdn: false,
  // Your secret token is read dynamically here and is completely hidden from GitHub!
  token: process.env.SANITY_IMPORT_TOKEN,
  apiVersion: "2024-01-01",
});

// ── Month abbreviation → full name map ──
const monthMap = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  June: "June",
  Jul: "July",
  July: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

// ── Month abbreviation → numeric sorting index map ──
const monthNumberMap = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  June: 6,
  Jul: 7,
  July: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

// ── All gallery data ──
const galleryData = [
  {
    year: "2020",
    coverImage: "2020.jpg",
    images: [
      { month: "Aug", file: "2020/Aug/art (1).webp", order: 1 },
      { month: "Aug", file: "2020/Aug/art (2).webp", order: 2 },
      { month: "Aug", file: "2020/Aug/art (3).webp", order: 3 },
      { month: "Aug", file: "2020/Aug/art (4).webp", order: 4 },
      { month: "Aug", file: "2020/Aug/art (5).webp", order: 5 },
      { month: "Aug", file: "2020/Aug/art (6).webp", order: 6 },
      { month: "Aug", file: "2020/Aug/art (7).webp", order: 7 },
      { month: "Aug", file: "2020/Aug/art (8).webp", order: 8 },
      { month: "Aug", file: "2020/Aug/art (9).webp", order: 9 },
      { month: "Sep", file: "2020/Sep/art (1).webp", order: 1 },
      { month: "Sep", file: "2020/Sep/art (2).webp", order: 2 },
      { month: "Sep", file: "2020/Sep/art (3).webp", order: 3 },
      { month: "Sep", file: "2020/Sep/art (4).webp", order: 4 },
      { month: "Sep", file: "2020/Sep/art (5).webp", order: 5 },
      { month: "Sep", file: "2020/Sep/art (6).webp", order: 6 },
      { month: "Sep", file: "2020/Sep/art (7).webp", order: 7 },
      { month: "Oct", file: "2020/Oct/art (1).jpg", order: 1 },
      { month: "Oct", file: "2020/Oct/art (2).jpg", order: 2 },
      { month: "Oct", file: "2020/Oct/art (3).jpg", order: 3 },
      { month: "Oct", file: "2020/Oct/art (4).jpg", order: 4 },
      { month: "Oct", file: "2020/Oct/art (5).jpg", order: 5 },
      { month: "Oct", file: "2020/Oct/art (6).jpg", order: 6 },
      { month: "Oct", file: "2020/Oct/art (7).jpg", order: 7 },
      { month: "Nov", file: "2020/Nov/art (1).jpg", order: 1 },
      { month: "Nov", file: "2020/Nov/art (2).jpg", order: 2 },
      { month: "Dec", file: "2020/Dec/art (1).jpg", order: 1 },
      { month: "Dec", file: "2020/Dec/art (2).jpg", order: 2 },
      { month: "Dec", file: "2020/Dec/art (3).jpg", order: 3 },
      { month: "Dec", file: "2020/Dec/art (4).jpg", order: 4 },
      { month: "Dec", file: "2020/Dec/art (5).jpg", order: 5 },
      { month: "Dec", file: "2020/Dec/art (6).jpg", order: 6 },
    ],
  },
  {
    year: "2021",
    coverImage: "2021.jpg",
    images: [
      { month: "Jan", file: "2021/Jan/art (1).jpg", order: 1 },
      { month: "Jan", file: "2021/Jan/art (2).jpg", order: 2 },
      { month: "Jan", file: "2021/Jan/art (3).jpg", order: 3 },
      { month: "Feb", file: "2021/Feb/art (1).jpg", order: 1 },
      { month: "Feb", file: "2021/Feb/art (2).jpg", order: 2 },
      { month: "Feb", file: "2021/Feb/art (3).jpg", order: 3 },
      { month: "Mar", file: "2021/Mar/art (1).jpg", order: 1 },
      { month: "Mar", file: "2021/Mar/art (2).jpg", order: 2 },
      { month: "Mar", file: "2021/Mar/art (3).jpeg", order: 3 },
      { month: "Apr", file: "2021/Apr/art (1).jpg", order: 1 },
      { month: "Apr", file: "2021/Apr/art (2).jpg", order: 2 },
      { month: "Apr", file: "2021/Apr/art (3).jpg", order: 3 },
      { month: "Apr", file: "2021/Apr/art (4).jpg", order: 4 },
      { month: "May", file: "2021/May/art (1).jpg", order: 1 },
      { month: "May", file: "2021/May/art (2).jpg", order: 2 },
      { month: "June", file: "2021/June/art.jpg", order: 1 },
      { month: "July", file: "2021/July/art (1).jpg", order: 1 },
      { month: "July", file: "2021/July/art (2).jpg", order: 2 },
      { month: "Aug", file: "2021/Aug/art (1).jpg", order: 1 },
      { month: "Aug", file: "2021/Aug/art (2).jpg", order: 2 },
      { month: "Aug", file: "2021/Aug/art (3).jpg", order: 3 },
      { month: "Sep", file: "2021/Sep/art (1).jpg", order: 1 },
      { month: "Sep", file: "2021/Sep/art (2).jpg", order: 2 },
      { month: "Oct", file: "2021/Oct/art (1).jpg", order: 1 },
      { month: "Oct", file: "2021/Oct/art (2).jpg", order: 2 },
      { month: "Oct", file: "2021/Oct/art (3).jpg", order: 3 },
      { month: "Nov", file: "2021/Nov/art (1).jpg", order: 1 },
      { month: "Nov", file: "2021/Nov/art (2).jpg", order: 2 },
      { month: "Nov", file: "2021/Nov/art (3).jpg", order: 3 },
      { month: "Nov", file: "2021/Nov/art (4).jpg", order: 4 },
      { month: "Nov", file: "2021/Nov/art (5).jpg", order: 5 },
      { month: "Dec", file: "2021/Dec/art (1).jpg", order: 1 },
      { month: "Dec", file: "2021/Dec/art (2).jpg", order: 2 },
      { month: "Dec", file: "2021/Dec/art (3).jpg", order: 3 },
      { month: "Dec", file: "2021/Dec/art (4).jpg", order: 4 },
      { month: "Dec", file: "2021/Dec/art (5).jpg", order: 5 },
    ],
  },
  {
    year: "2022",
    coverImage: "2022.jpg",
    images: [
      { month: "Jan", file: "2022/Jan/art (1).jpg", order: 1 },
      { month: "Jan", file: "2022/Jan/art (2).jpg", order: 2 },
      { month: "Feb", file: "2022/Feb/art (1).jpg", order: 1 },
      { month: "Feb", file: "2022/Feb/art (2).jpg", order: 2 },
      { month: "Feb", file: "2022/Feb/art (3).jpg", order: 3 },
      { month: "Feb", file: "2022/Feb/art (4).jpg", order: 4 },
      { month: "Feb", file: "2022/Feb/art (5).jpg", order: 5 },
      { month: "Mar", file: "2022/Mar/art (1).jpg", order: 1 },
      { month: "Mar", file: "2022/Mar/art (2).jpg", order: 2 },
      { month: "Mar", file: "2022/Mar/art (3).jpg", order: 3 },
      { month: "Mar", file: "2022/Mar/art (4).jpg", order: 4 },
      { month: "Mar", file: "2022/Mar/art (5).jpg", order: 5 },
      { month: "Mar", file: "2022/Mar/art (5).jpeg", order: 6 },
      { month: "Mar", file: "2022/Mar/art (6).jpeg", order: 7 },
      { month: "Mar", file: "2022/Mar/art (7).jpg", order: 8 },
      { month: "Apr", file: "2022/Apr/art (1).jpg", order: 1 },
      { month: "Apr", file: "2022/Apr/art (2).jpg", order: 2 },
      { month: "May", file: "2022/May/art.jpg", order: 1 },
      { month: "June", file: "2022/June/art (1).jpg", order: 1 },
      { month: "June", file: "2022/June/art (2).jpg", order: 2 },
      { month: "June", file: "2022/June/art (3).jpeg", order: 3 },
      { month: "July", file: "2022/July/art.jpg", order: 1 },
      { month: "Sep", file: "2022/Sep/art (1).jpg", order: 1 },
      { month: "Sep", file: "2022/Sep/art (2).jpg", order: 2 },
      { month: "Oct", file: "2022/Oct/art.jpeg", order: 1 },
      { month: "Dec", file: "2022/Dec/art (1).jpg", order: 1 },
      { month: "Dec", file: "2022/Dec/art (2).jpg", order: 2 },
      { month: "Dec", file: "2022/Dec/art (3).jpg", order: 3 },
    ],
  },
  {
    year: "2023",
    coverImage: "2023.jpg",
    images: [
      { month: "Jan", file: "2023/Jan/art.jpg", order: 1 },
      { month: "Mar", file: "2023/Mar/art.jpg", order: 1 },
      { month: "Dec", file: "2023/Dec/art.jpg", order: 1 },
    ],
  },
  {
    year: "2024",
    coverImage: "2024.jpg",
    images: [
      { month: "Feb", file: "2024/Feb/art.jpg", order: 1 },
      { month: "Mar", file: "2024/Mar/art.jpg", order: 1 },
      { month: "Apr", file: "2024/Apr/art (1).jpg", order: 1 },
      { month: "Apr", file: "2024/Apr/art (2).jpg", order: 2 },
      { month: "May", file: "2024/May/art.jpg", order: 1 },
      { month: "June", file: "2024/June/art.jpg", order: 1 },
      { month: "July", file: "2024/July/art.jpg", order: 1 },
      { month: "Nov", file: "2024/Nov/art.jpg", order: 1 },
    ],
  },
  {
    year: "2025",
    coverImage: "2025.jpg",
    images: [
      { month: "Mar", file: "2025/Mar/art.jpg", order: 1 },
      { month: "May", file: "2025/May/art.jpg", order: 1 },
    ],
  },
];

// ── Helper: upload an image file to Sanity ──
async function uploadImage(filePath) {
  const fullPath = path.resolve(__dirname, "public/assets", filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️  File not found, skipping: ${filePath}`);
    return null;
  }
  const fileBuffer = fs.readFileSync(fullPath);
  const ext = path.extname(filePath).replace(".", "").toLowerCase();
  const mimeType =
    ext === "webp" ? "image/webp" :
    ext === "jpeg" ? "image/jpeg" :
    ext === "png" ? "image/png" :
    "image/jpeg";

  const asset = await client.assets.upload("image", fileBuffer, {
    filename: path.basename(filePath),
    contentType: mimeType,
  });
  return asset._id;
}

// ── Helper: create one artwork document with sorting index ──
async function createArtwork({ year, month, monthIndex, order, imageAssetId }) {
  const fullMonth = monthMap[month] || month;
  return client.create({
    _type: "artwork",
    year,
    month: fullMonth,
    monthIndex, // Automates sorting chronologically
    order,      // Resolves interior monthly sort ordering
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: imageAssetId },
    },
  });
}

// ── Helper: create one yearCover document ──
async function createYearCover({ year, imageAssetId }) {
  return client.create({
    _type: "yearCover",
    year,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: imageAssetId },
    },
  });
}

// ── Main Execution Loop ──
async function run() {
  console.log("🚀 Starting Sanity chronological batch import...\n");

  let total = 0;
  let failed = 0;

  for (const yearData of galleryData) {
    console.log(`\n📅 Processing year ${yearData.year}...`);

    // Upload cover image and create yearCover document
    process.stdout.write(`  Uploading cover ${yearData.coverImage}... `);
    try {
      const coverAssetId = await uploadImage(yearData.coverImage);
      if (coverAssetId) {
        await createYearCover({ year: yearData.year, imageAssetId: coverAssetId });
        console.log("✅ cover saved");
      }
    } catch (err) {
      console.log(`❌ Cover error: ${err.message}`);
      failed++;
    }

    // Upload each artwork image and create artwork document
    for (const item of yearData.images) {
      process.stdout.write(`  [${item.file}] uploading... `);
      try {
        const assetId = await uploadImage(item.file);
        if (!assetId) { failed++; continue; }

        // Find the numerical representation of the month
        const numericalMonth = monthNumberMap[item.month] || 1;

        await createArtwork({
          year: yearData.year,
          month: item.month,
          monthIndex: numericalMonth,
          order: item.order,
          imageAssetId: assetId,
        });
        console.log("✅");
        total++;
      } catch (err) {
        console.log(`❌ Error: ${err.message}`);
        failed++;
      }
    }
  }

  console.log("\n─────────────────────────────────");
  console.log(`✅ Done! ${total} artworks + 6 year covers imported successfully.`);
  if (failed > 0) console.log(`⚠️  ${failed} files skipped or failed.`);
  console.log("─────────────────────────────────");
}

run().catch(console.error);