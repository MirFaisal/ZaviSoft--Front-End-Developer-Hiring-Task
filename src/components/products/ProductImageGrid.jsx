import Image from "next/image";

const CORNER_CLASSES = [
  "rounded-tl-[48px]",
  "rounded-tr-[48px]",
  "rounded-bl-[48px]",
  "rounded-br-[48px]",
];

export default function ProductImageGrid({ images = [], alt = "Product" }) {
  return (
    <div className="hidden lg:grid grid-cols-2 gap-4">
      {images.slice(0, 4).map((src, i) => (
        <div
          key={i}
          className={`relative aspect-[429/510] ${CORNER_CLASSES[i]} overflow-hidden bg-[#fafafa]`}>
          <Image
            src={src}
            alt={`${alt} - ${i + 1}`}
            fill
            className="object-cover object-top"
            sizes="30vw"
            priority={i === 0}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
