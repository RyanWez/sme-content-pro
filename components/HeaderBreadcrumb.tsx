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

export default function HeaderBreadcrumb() {
  const pathname = usePathname();

  const pathSnippets = pathname.split('/').filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const title =
      breadcrumbNameMap[url] ||
      (index === pathSnippets.length - 1 ? '404' : pathSnippets[index]);

    return {
      title:
        index === pathSnippets.length - 1 ? title : <Link href={url}>{title}</Link>,
    };
  });

  return <Breadcrumb items={breadcrumbItems} />;
}
