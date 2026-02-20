import { Banner, NewDrops, CategoriesSection, Reviews } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col max-w-360 mx-auto">
      <main className="flex-1 mt-6 lg:mt-10 flex flex-col gap-12 lg:gap-20">
        {/* Banner Section */}
        <Banner />

        {/* New Drops Section */}
        <NewDrops />

        {/* Categories Section – full-width dark bg */}
        <CategoriesSection />

        {/* Reviews Section */}
        <Reviews />
      </main>

      {/* Footer spacer */}
      <div className="mt-12 lg:mt-20" />
    </div>
  );
}
