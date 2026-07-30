import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import BundleCard from "@/app/components/bundle-card";
import Reveal from "@/app/components/motion/reveal";
import Marquee from "@/app/components/motion/marquee";
import { StaggerGrid, StaggerItem } from "@/app/components/motion/stagger-grid";
import HeroReveal from "@/app/components/motion/hero-reveal";
import HeroSilhouette from "@/app/components/hero-silhouette";
import { getPublishedBundles } from "@/app/lib/bundles";
import { getSettings } from "@/app/lib/settings";

export default async function Home() {
  const [bundles, settings] = await Promise.all([
    getPublishedBundles(),
    getSettings(),
  ]);
  const featured = bundles;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-sky-50 to-white">
          <HeroSilhouette />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <HeroReveal
              eyebrow={
                <div className="mx-auto max-w-2xl text-center">
                  <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                    {settings.heroEyebrow}
                  </span>
                </div>
              }
              title={
                <div className="mx-auto max-w-2xl text-center">
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                    {settings.heroTitleLine1}
                    {settings.heroTitleLine2 && (
                      <>
                        <br className="hidden sm:block" /> {settings.heroTitleLine2}
                      </>
                    )}
                  </h1>
                </div>
              }
              subheading={
                <div className="mx-auto max-w-2xl text-center">
                  <p className="mt-4 text-base text-zinc-600 sm:text-lg">{settings.heroSubheading}</p>
                </div>
              }
              search={
                <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md sm:flex-row">
                  <div className="flex flex-1 items-center gap-2 px-2">
                    <span className="text-zinc-400">🔍</span>
                    <input
                      type="text"
                      placeholder={settings.heroSearchPlaceholder}
                      className="w-full border-none py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                      suppressHydrationWarning
                    />
                  </div>
                  <Link
                    href="/products"
                    className="flex items-center justify-center rounded-xl bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-sky-600 active:scale-[0.98]"
                  >
                    ค้นหา
                  </Link>
                </form>
              }
              tags={
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-500">
                  <span>{settings.popularSearchLabel}</span>
                  {settings.popularSearchTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-600 transition duration-200 hover:border-sky-300 hover:text-sky-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              }
            />
          </div>
        </section>

        {/* Featured products */}
        <section className="py-14">
          <Reveal className="mx-auto mb-6 flex max-w-6xl items-end justify-between px-4 sm:px-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">{settings.featuredHeading}</h2>
              <p className="mt-1 text-sm text-zinc-500">{settings.featuredSubheading}</p>
            </div>
            <Link
              href="/products"
              className="group text-sm font-medium text-sky-600 transition duration-200 hover:text-sky-700"
            >
              ดูทั้งหมด{" "}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </Reveal>
          <Marquee duration={featured.length * 6}>
            {featured.map((bundle) => (
              <div key={bundle.id} className="w-72 shrink-0 px-2.5">
                <BundleCard bundle={bundle} />
              </div>
            ))}
          </Marquee>
        </section>

        {/* How it works */}
        <section className="border-t border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <Reveal>
              <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">
                ขั้นตอนการเช่า
              </h2>
            </Reveal>
            <StaggerGrid className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { step: "1", title: "เลือกสินค้า", desc: "ค้นหาหรือเลือกดูตามหมวดหมู่ / ยี่ห้อ" },
                { step: "2", title: "กดปุ่ม “จอง”", desc: "ติดต่อผ่าน LINE OA หรือกรอกฟอร์ม" },
                { step: "3", title: "รับสินค้า", desc: "ทีมงานติดต่อกลับเพื่อยืนยันและจัดส่ง" },
              ].map((item) => (
                <StaggerItem
                  key={item.step}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 text-center transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mt-3 font-semibold text-zinc-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
