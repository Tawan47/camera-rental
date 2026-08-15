import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createInquirySchema = z
  .object({
    name: z.string().min(1),
    phone: z.string().min(1),
    lineId: z.string().min(1).optional(),
    productId: z.string().min(1).optional(),
    bundleId: z.string().min(1).optional(),
    pickupDate: z.coerce.date(),
    returnDate: z.coerce.date(),
    note: z.string().min(1).optional(),
  })
  .refine((data) => !(data.productId && data.bundleId), {
    message: 'เลือกได้แค่สินค้าเดี่ยวหรือเซ็ตเช่าอย่างใดอย่างหนึ่ง',
    path: ['productId'],
  })
  .refine((data) => !!data.productId || !!data.bundleId, {
    message: 'ต้องระบุสินค้าหรือเซ็ตเช่าที่สนใจ',
    path: ['productId'],
  })
  .refine((data) => data.returnDate > data.pickupDate, {
    message: 'วันที่คืนต้องอยู่หลังวันที่รับ',
    path: ['returnDate'],
  });

export class CreateInquiryDto extends createZodDto(createInquirySchema) {}
