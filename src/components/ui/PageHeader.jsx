import Breadcrumb from "./Breadcrumb";

/**
 * Reusable page header with breadcrumb, title, and description.
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {Array<{label: string, href?: string}>} breadcrumbs - Breadcrumb items
 */
export default function PageHeader({ title, description, breadcrumbs }) {
  return (
    <div className="">
      <div className="max-w-360 mx-auto px-4 lg:px-[60px] py-8 lg:py-12">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <h1 className="font-rubik font-semibold text-3xl lg:text-5xl text-kicks-dark uppercase">
          {title}
        </h1>
        {description && (
          <p className="mt-2 font-open-sans text-base text-kicks-dark/60">{description}</p>
        )}
      </div>
    </div>
  );
}
