import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

(async () => {
  const productCount = await prisma.product.count({ where: { image: { startsWith: "/products/" } } });
  const bundleCount = await prisma.bundle.count({ where: { image: { startsWith: "/products/" } } });
  const settingsCount = await prisma.siteSettings.count({ where: { logoImage: { startsWith: "/products/" } } });
  console.log({ productCount, bundleCount, settingsCount });
  await prisma.$disconnect();
})();
