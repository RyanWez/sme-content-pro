import {
  UploadOutlined,
} from '@ant-design/icons';
import { BlocksScale } from '@/components/icons/BlocksScale';
import { Pencil2 } from '@/components/icons/Pencil2';
import { FormEditionClipboardWrite } from '@/components/icons/FormEditionClipboardWrite';
import { CollaborationsIdea } from '@/components/icons/CollaborationsIdea';
import { ProductLaunchLaptop } from '@/components/icons/ProductLaunchLaptop';

export const getMenuItems = (isOnDashboard: boolean) => [
  {
    key: '1',
    icon: <BlocksScale isActive={isOnDashboard} />,
    label: 'Dashboard',
  },
  {
    key: '2',
    icon: <Pencil2 />,
    label: 'Content',
    children: [
      {
        key: '2-1',
        icon: <FormEditionClipboardWrite />,
        label: 'Blog Content Writer',
      },
      {
        key: '2-2',
        icon: <CollaborationsIdea />,
        label: 'Promotion Idea',
      },
      {
        key: '2-3',
        icon: <ProductLaunchLaptop />,
        label: 'Product Caption',
      },
    ],
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
  },
];
