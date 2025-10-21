'use client';

import { usePathname } from 'next/navigation';

const breadcrumbNameMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/content': 'Content',
  '/dashboard/content/blog': 'Blog Content Writer',
  '/dashboard/content/promotion': 'Promotion Idea',
  '/dashboard/content/product': 'Product Caption',
  '/dashboard/error': 'Error Pages',
  '/dashboard/error/404': '404',
};

export default function PageHeader() {
  const pathname = usePathname();
  const pageTitle = breadcrumbNameMap[pathname] || '404';

  return (
    <div style={{ marginBottom: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 0 }}>
        {pageTitle}
      </h1>
    </div>
  );
}
