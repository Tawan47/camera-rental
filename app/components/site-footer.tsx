export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-zinc-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
              📷
            </span>
            <span className="tracking-tight">CamRent</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            บริการเช่ากล้องและอุปกรณ์ถ่ายภาพ ครบ จบ ในที่เดียว
            ส่งไว ราคาเป็นมิตร
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">เมนู</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li>สินค้าทั้งหมด</li>
            <li>หมวดหมู่</li>
            <li>ยี่ห้อ</li>
            <li>ติดต่อเรา</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">ช่องทางติดต่อ</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li>LINE OA: @camrent</li>
            <li>โทร: 02-123-4567</li>
            <li>อีเมล: hello@camrent.mock</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">เวลาทำการ</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li>จันทร์ - ศุกร์: 09:00 - 19:00</li>
            <li>เสาร์ - อาทิตย์: 10:00 - 18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-400">
        นี่คือหน้าตัวอย่าง (mock UI) เพื่อนำเสนอลูกค้า ข้อมูลทั้งหมดเป็นข้อมูลจำลอง
      </div>
    </footer>
  );
}
