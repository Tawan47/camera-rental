export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  pricePerDay: number;
  deposit: number;
  image: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  published: boolean;
  description: string;
  specs: { label: string; value: string }[];
  includes: string[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  productCount: number;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
  productCount: number;
};

export const categories: Category[] = [
  { id: "mirrorless", name: "กล้อง Mirrorless", icon: "📷", productCount: 12 },
  { id: "dslr", name: "กล้อง DSLR", icon: "📸", productCount: 8 },
  { id: "lens", name: "เลนส์", icon: "🔍", productCount: 20 },
  { id: "action", name: "Action Camera", icon: "🎥", productCount: 6 },
  { id: "drone", name: "โดรน", icon: "🚁", productCount: 5 },
  { id: "accessory", name: "อุปกรณ์เสริม", icon: "🎒", productCount: 15 },
];

export const brands: Brand[] = [
  { id: "sony", name: "Sony", logo: "SONY", productCount: 14 },
  { id: "canon", name: "Canon", logo: "Canon", productCount: 11 },
  { id: "nikon", name: "Nikon", logo: "Nikon", productCount: 9 },
  { id: "fujifilm", name: "Fujifilm", logo: "FUJIFILM", productCount: 7 },
  { id: "gopro", name: "GoPro", logo: "GoPro", productCount: 6 },
  { id: "dji", name: "DJI", logo: "DJI", productCount: 5 },
];

export const products: Product[] = [
  {
    id: "sony-a7iv",
    name: "Sony Alpha A7 IV",
    brand: "Sony",
    category: "mirrorless",
    pricePerDay: 890,
    deposit: 5000,
    image: "🎞️",
    rating: 4.8,
    reviewCount: 124,
    available: true,
    published: true,
    description:
      "กล้อง Mirrorless Full-frame รุ่นท็อป เซนเซอร์ 33MP วิดีโอ 4K60p เหมาะสำหรับงานถ่ายภาพและวิดีโอระดับมืออาชีพ",
    specs: [
      { label: "เซนเซอร์", value: "Full-frame 33MP" },
      { label: "วิดีโอ", value: "4K 60p" },
      { label: "ระบบโฟกัส", value: "759 จุด AF" },
      { label: "จอ", value: "Vari-angle Touchscreen" },
    ],
    includes: ["ตัวกล้อง", "แบตเตอรี่ 2 ก้อน", "สายชาร์จ", "เมมโมรี่การ์ด 64GB", "กระเป๋ากันกระแทก"],
  },
  {
    id: "canon-r6ii",
    name: "Canon EOS R6 Mark II",
    brand: "Canon",
    category: "mirrorless",
    pricePerDay: 850,
    deposit: 5000,
    image: "🎞️",
    rating: 4.7,
    reviewCount: 98,
    available: true,
    published: true,
    description: "กล้อง Mirrorless Full-frame ถ่ายต่อเนื่อง 40fps โฟกัสไว เหมาะกับงานกีฬาและสัตว์ป่า",
    specs: [
      { label: "เซนเซอร์", value: "Full-frame 24.2MP" },
      { label: "วิดีโอ", value: "4K 60p" },
      { label: "ถ่ายต่อเนื่อง", value: "40 fps" },
      { label: "จอ", value: "Vari-angle Touchscreen" },
    ],
    includes: ["ตัวกล้อง", "แบตเตอรี่ 2 ก้อน", "สายชาร์จ", "เมมโมรี่การ์ด 64GB", "กระเป๋ากันกระแทก"],
  },
  {
    id: "fuji-xt5",
    name: "Fujifilm X-T5",
    brand: "Fujifilm",
    category: "mirrorless",
    pricePerDay: 650,
    deposit: 4000,
    image: "🎞️",
    rating: 4.9,
    reviewCount: 76,
    available: true,
    published: true,
    description: "กล้อง APS-C ดีไซน์คลาสสิก เซนเซอร์ 40MP มาพร้อม Film Simulation ที่เป็นเอกลักษณ์",
    specs: [
      { label: "เซนเซอร์", value: "APS-C 40MP" },
      { label: "วิดีโอ", value: "6.2K 30p" },
      { label: "กันสั่น", value: "IBIS 7 stop" },
      { label: "จอ", value: "3-way Tilt" },
    ],
    includes: ["ตัวกล้อง", "แบตเตอรี่ 2 ก้อน", "สายชาร์จ", "เมมโมรี่การ์ด 64GB"],
  },
  {
    id: "nikon-z8",
    name: "Nikon Z8",
    brand: "Nikon",
    category: "mirrorless",
    pricePerDay: 1200,
    deposit: 8000,
    image: "🎞️",
    rating: 4.9,
    reviewCount: 54,
    available: false,
    published: true,
    description: "กล้อง Flagship Full-frame 45.7MP ถ่ายต่อเนื่อง 20fps บอดี้แข็งแรงทนทาน",
    specs: [
      { label: "เซนเซอร์", value: "Full-frame 45.7MP" },
      { label: "วิดีโอ", value: "8K 30p / 4K 120p" },
      { label: "ถ่ายต่อเนื่อง", value: "20 fps RAW" },
      { label: "จอ", value: "Tilt Touchscreen" },
    ],
    includes: ["ตัวกล้อง", "แบตเตอรี่ 2 ก้อน", "สายชาร์จ", "เมมโมรี่การ์ด 128GB", "กระเป๋ากันกระแทก"],
  },
  {
    id: "canon-rf24-70",
    name: "Canon RF 24-70mm f/2.8L",
    brand: "Canon",
    category: "lens",
    pricePerDay: 450,
    deposit: 6000,
    image: "🔭",
    rating: 4.8,
    reviewCount: 61,
    available: true,
    published: true,
    description: "เลนส์ซูมมาตรฐานรูรับแสงกว้างคงที่ f/2.8 คมชัดทุกช่วงซูม เหมาะกับงานแทบทุกประเภท",
    specs: [
      { label: "ช่วงซูม", value: "24-70mm" },
      { label: "รูรับแสง", value: "f/2.8" },
      { label: "มาวด์", value: "Canon RF" },
      { label: "กันสั่น", value: "ไม่มี (ใช้ IBIS ตัวกล้อง)" },
    ],
    includes: ["ตัวเลนส์", "ฝาหน้า-หลัง", "ฮูด", "กระเป๋าเลนส์"],
  },
  {
    id: "sony-fx3",
    name: "Sony FX3",
    brand: "Sony",
    category: "mirrorless",
    pricePerDay: 1500,
    deposit: 10000,
    image: "🎬",
    rating: 4.7,
    reviewCount: 43,
    available: true,
    published: true,
    description: "กล้องซีนีม่าตัวเล็กสำหรับงานวิดีโอโดยเฉพาะ พร้อมพัดลมระบายความร้อนในตัว",
    specs: [
      { label: "เซนเซอร์", value: "Full-frame 12.1MP" },
      { label: "วิดีโอ", value: "4K 120p" },
      { label: "รูปแบบไฟล์", value: "S-Log3 / RAW output" },
      { label: "เสียง", value: "XLR handle grip" },
    ],
    includes: ["ตัวกล้อง", "แบตเตอรี่ 2 ก้อน", "สายชาร์จ", "เมมโมรี่การ์ด 128GB", "ไมค์ XLR"],
  },
  {
    id: "gopro-hero12",
    name: "GoPro Hero 12 Black",
    brand: "GoPro",
    category: "action",
    pricePerDay: 300,
    deposit: 2000,
    image: "📹",
    rating: 4.6,
    reviewCount: 89,
    available: true,
    published: true,
    description: "กล้อง Action Camera กันน้ำ กันสั่นระดับ HyperSmooth 6.0 เหมาะกับกีฬาผาดโผน",
    specs: [
      { label: "วิดีโอ", value: "5.3K 60p" },
      { label: "กันน้ำ", value: "ลึก 10 เมตร" },
      { label: "กันสั่น", value: "HyperSmooth 6.0" },
      { label: "แบตเตอรี่", value: "ถ่ายได้ 2.5 ชม." },
    ],
    includes: ["ตัวกล้อง", "แบตเตอรี่ 2 ก้อน", "ไม้เซลฟี่", "เมมโมรี่การ์ด 64GB", "เคสกันน้ำ"],
  },
  {
    id: "dji-air3",
    name: "DJI Air 3",
    brand: "DJI",
    category: "drone",
    pricePerDay: 950,
    deposit: 8000,
    image: "🚁",
    rating: 4.8,
    reviewCount: 37,
    available: true,
    published: true,
    description: "โดรนกล้องคู่ ถ่ายไกลได้ไกลขึ้น บินได้นานสูงสุด 46 นาที มีระบบหลบสิ่งกีดขวางรอบทิศทาง",
    specs: [
      { label: "กล้อง", value: "กล้องคู่ Wide + Tele" },
      { label: "วิดีโอ", value: "4K 60fps HDR" },
      { label: "เวลาบิน", value: "46 นาที" },
      { label: "หลบสิ่งกีดขวาง", value: "รอบทิศทาง" },
    ],
    includes: ["ตัวโดรน", "รีโมท", "แบตเตอรี่ 3 ก้อน", "ใบพัดสำรอง", "กระเป๋าใส่โดรน"],
  },
];

export const stats = {
  totalProducts: products.length,
  totalCategories: categories.length,
  totalBrands: brands.length,
  activeBookings: 7,
  monthlyBookings: 42,
};

export const recentBookings = [
  { id: "BK-1042", customer: "คุณสมชาย ใจดี", product: "Sony Alpha A7 IV", date: "2026-07-24", status: "รอยืนยัน" as const, channel: "LINE OA" },
  { id: "BK-1041", customer: "คุณพิมพ์ชนก แสงทอง", product: "Canon EOS R6 Mark II", date: "2026-07-23", status: "ยืนยันแล้ว" as const, channel: "ฟอร์มติดต่อ" },
  { id: "BK-1040", customer: "คุณธนกร วัฒนกุล", product: "DJI Air 3", date: "2026-07-23", status: "ยืนยันแล้ว" as const, channel: "LINE OA" },
  { id: "BK-1039", customer: "คุณอารีย์ ศรีสุข", product: "Fujifilm X-T5", date: "2026-07-22", status: "เสร็จสิ้น" as const, channel: "LINE OA" },
  { id: "BK-1038", customer: "คุณกิตติ มั่นคง", product: "GoPro Hero 12 Black", date: "2026-07-21", status: "ยกเลิก" as const, channel: "ฟอร์มติดต่อ" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
