import { Banner, NewDrops, CategoriesSection, Reviews } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col max-w-360 mx-auto">
      <main className="flex-1 mt-6 lg:mt-10 flex flex-col gap-12 lg:gap-20">
        {/* Banner Section */}
        <div className="animate-[fadeInUp_0.6s_ease-out_both]">
          <Banner />
        </div>

        {/* New Drops Section */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
          <NewDrops />
        </div>

        {/* Categories Section – full-width dark bg */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
          <CategoriesSection />
        </div>

        {/* Reviews Section */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
          <Reviews />
        </div>
      </main>

      {/* Footer spacer */}
      <div className="mt-12 lg:mt-20" />
    </div>
  );
}
