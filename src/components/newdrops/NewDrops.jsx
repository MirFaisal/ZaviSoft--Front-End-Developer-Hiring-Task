import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    image: "/images/product-1.jpg",
    badge: "New",
  },
  {
    id: 2,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    image: "/images/product-2.jpg",
    badge: "New",
  },
  {
    id: 3,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    image: "/images/product-3.jpg",
    badge: "New",
  },
  {
    id: 4,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    image: "/images/product-4.jpg",
    badge: "New",
  },
];

export default function NewDrops() {
  return (
    <section className="mx-4 lg:mx-10 xl:mx-15">
      {/* Header row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <h2 className="font-rubik font-semibold text-3xl lg:text-[74px] text-[#232321] uppercase leading-[0.95] max-w-147.25">
          Don&apos;t miss out new drops
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center justify-center h-12 px-4 rounded-lg bg-[#232321] font-rubik font-medium text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors w-fit shrink-0">
          Shop New Drops
        </Link>
      </div>

      {/* Product cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col gap-4">
            {/* Image container */}
            <div className="relative bg-[#fafafa] rounded-[28px] p-2 aspect-square lg:h-87.5 lg:aspect-auto">
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-2 left-2 bg-[#4a69e2] px-4 py-3 rounded-br-3xl rounded-tl-3xl">
                  <span className="font-rubik font-semibold text-xs text-white">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-4">
              <p className="font-rubik font-semibold text-lg lg:text-2xl text-[#232321] leading-normal line-clamp-2 h-12 lg:h-14">
                {product.name}
              </p>
              <Link
                href={`/products/${product.id}`}
                className="flex items-center justify-center h-12 w-full rounded-lg bg-[#232321] font-rubik font-medium text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors">
                <span>View Product -&nbsp;</span>
                <span className="text-[#ffa52f]">${product.price}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
