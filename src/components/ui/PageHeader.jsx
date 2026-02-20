import Breadcrumb from "./Breadcrumb";

/**
 * Reusable page header with breadcrumb, title, and description.
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {Array<{label: string, href?: string}>} breadcrumbs - Breadcrumb items
 */
export default function PageHeader({ title, description, breadcrumbs }) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-8">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-2 text-gray-600">{description}</p>}
      </div>
    </div>
  );
}
