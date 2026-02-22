import CategoryClient from "./CategoryClient";

const API_BASE = "https://api.escuelajs.co/api/v1";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_BASE}/categories/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Not found");
    const category = await res.json();

    return {
      title: `${category.name} | KICKS`,
      description: `Browse all products in ${category.name} at KICKS.`,
    };
  } catch {
    return {
      title: "Category | KICKS",
      description: "Browse products by category at KICKS.",
    };
  }
}

export default function CategoryPage(props) {
  return <CategoryClient {...props} />;
}
