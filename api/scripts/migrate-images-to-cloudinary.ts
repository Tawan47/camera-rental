import { readFile, readdir } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const PRODUCTS_DIR = path.join(__dirname, "..", "..", "public", "products");

async function uploadFile(filename: string): Promise<string> {
  const filePath = path.join(PRODUCTS_DIR, filename);
  const publicId = path.parse(filename).name;
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "products",
    public_id: publicId,
    resource_type: "image",
    overwrite: true,
  });
  return result.secure_url;
}

async function main() {
  const files = (await readdir(PRODUCTS_DIR)).filter((f) => f.toLowerCase().endsWith(".jpg"));
  console.log(`Found ${files.length} files in ${PRODUCTS_DIR}`);

  const urlByOldPath = new Map<string, string>();

  for (const file of files) {
    const oldPath = `/products/${file}`;
    const url = await uploadFile(file);
    urlByOldPath.set(oldPath, url);
    console.log(`Uploaded ${oldPath} -> ${url}`);
  }

  let productCount = 0;
  for (const [oldPath, url] of urlByOldPath) {
    const result = await prisma.product.updateMany({ where: { image: oldPath }, data: { image: url } });
    productCount += result.count;
  }

  let bundleCount = 0;
  for (const [oldPath, url] of urlByOldPath) {
    const result = await prisma.bundle.updateMany({ where: { image: oldPath }, data: { image: url } });
    bundleCount += result.count;
  }

  let settingsCount = 0;
  const logoUrl = urlByOldPath.get("/products/logo-plu.jpg");
  if (logoUrl) {
    const result = await prisma.siteSettings.updateMany({
      where: { logoImage: "/products/logo-plu.jpg" },
      data: { logoImage: logoUrl },
    });
    settingsCount = result.count;
  }

  console.log(
    `Updated ${productCount} products, ${bundleCount} bundles, ${settingsCount} site settings rows.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
