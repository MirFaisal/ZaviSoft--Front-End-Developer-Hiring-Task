import ProductDetailClient from "./ProductDetailClient";

const API_BASE = "https://api.escuelajs.co/api/v1";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Not found");
    const product = await res.json();

    return {
      title: `${product.title} | KICKS`,
      description: product.description?.slice(0, 160) || "Shop this product on KICKS",
      openGraph: {
        title: product.title,
        description: product.description?.slice(0, 160),
        images: product.images?.[0] ? [product.images[0]] : [],
      },
    };
  } catch {
    return {
      title: "Product | KICKS",
      description: "Browse our collection of quality sneakers and shoes",
    };
  }
}

export default function ProductDetailPage(props) {
  return <ProductDetailClient {...props} />;
}
