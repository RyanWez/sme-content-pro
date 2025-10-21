'use client';

import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';

export default function Error404Page() {
  const router = useRouter();

  return (
    <>
      <PageHeader />
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => router.push('/dashboard')}>
            Back Home
          </Button>
        }
      />
    </>
  );
}
