'use client';

import { useState } from 'react';
import { Card, Table, Tag, Button, Space, Tabs, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ContentItem, ContentType } from '@/types/dashboard';
import { formatDate, getContentTypeColor, getStatusColor } from '@/lib/dashboard/utils';
import type { ColumnsType } from 'antd/es/table';

interface ContentTableProps {
  data: ContentItem[];
}

export default function ContentTable({ data }: ContentTableProps) {
  const [activeTab, setActiveTab] = useState<ContentType>('all');
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const columns: ColumnsType<ContentItem> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '40%',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      render: (type: ContentType) => (
        <Tag color={getContentTypeColor(type)}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Words',
      dataIndex: 'wordCount',
      key: 'wordCount',
      width: '10%',
      render: (count) => count?.toLocaleString() || '-',
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '13%',
      render: (date) => formatDate(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '10%',
      render: () => (
        <Space size="small">
          <Button type="text" size="small" icon={<EyeOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} />
          <Button type="text" size="small" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const tabItems = [
    { key: 'all', label: 'All Content' },
    { key: 'blog', label: 'Blog' },
    { key: 'promotion', label: 'Promotion' },
    { key: 'product', label: 'Product' },
  ];

  return (
    <Card
      title="Content Overview"
      extra={
        <Input
          placeholder="Search content..."
          prefix={<SearchOutlined />}
          style={{ width: 250 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      }
      style={{ marginBottom: 24 }}
    >
      <Tabs
        activeKey={activeTab}
        items={tabItems}
        onChange={(key) => setActiveTab(key as ContentType)}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </Card>
  );
}
