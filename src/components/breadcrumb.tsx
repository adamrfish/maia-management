import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="pt-6 pb-4 text-[0.694rem] tracking-[0.05em] text-gray-text">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors duration-200 hover:text-dark"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-dark">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
