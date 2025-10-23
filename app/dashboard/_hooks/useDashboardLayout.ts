import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getMenuKeyFromPathname, getRouteFromMenuKey } from '../_components/navigation/NavigationUtils';

export const useDashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getSelectedKey = (): string[] => {
    return getMenuKeyFromPathname(pathname);
  };

  const handleMenuClick = (e: { key: string }) => {
    const route = getRouteFromMenuKey(e.key);
    if (route) {
      router.push(route);
    }
    setMobileMenuOpen(false);
  };

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleChat = () => setChatOpen(!chatOpen);
  const closeChat = () => setChatOpen(false);

  return {
    collapsed,
    mobileMenuOpen,
    chatOpen,
    mounted,
    pathname,
    getSelectedKey,
    handleMenuClick,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
    toggleChat,
    closeChat,
  };
};
