'use client';

import { Breadcrumb } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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

  const pathSnippets = pathname.split('/').filter((i) => i);
  
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const title = breadcrumbNameMap[url] || url;
    
    return {
      title: index === pathSnippets.length - 1 ? title : <Link href={url}>{title}</Link>,
    };
  });

  const pageTitle = breadcrumbNameMap[pathname] || '404';

  return (
    <div style={{ marginBottom: 16 }}>
      <Breadcrumb items={breadcrumbItems} />
      <h1 style={{ fontSize: 24, fontWeight: 600, marginTop: 8, marginBottom: 0 }}>
        {pageTitle}
      </h1>
    </div>
  );
}
