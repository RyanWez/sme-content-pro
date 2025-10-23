import React from 'react';

export const ResponsiveStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Mobile Sidebar - Hidden by default on ALL screens */
      .mobile-sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.45);
        z-index: 999;
        display: none;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: none;
      }

      .mobile-sidebar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 280px;
        max-width: 85vw;
        background-color: #001529;
        z-index: 1000;
        display: none;
        flex-direction: column;
        transform: translateX(-100%);
        transition: none;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
      }

      /* Desktop - Show desktop sidebar only */
      .desktop-sidebar {
        display: block !important;
      }
      
      .desktop-toggle-btn {
        display: inline-flex !important;
      }
      
      .mobile-menu-btn {
        display: none !important;
      }

      /* Mobile & Tablet (< 1024px) - Hide desktop, show mobile menu */
      @media (max-width: 1023px) {
        /* Hide desktop sidebar completely */
        .desktop-sidebar,
        .ant-layout-sider {
          display: none !important;
        }
        
        .desktop-toggle-btn {
          display: none !important;
        }
        
        /* Show mobile menu button */
        .mobile-menu-btn {
          display: inline-flex !important;
        }
        
        /* Enable mobile sidebar with transitions after mount */
        .mobile-sidebar-overlay {
          display: block;
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-sidebar {
          display: flex;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .mobile-sidebar.active {
          transform: translateX(0);
        }

        /* Prevent body scroll when mobile menu is open */
        body:has(.mobile-sidebar.active) {
          overflow: hidden;
        }

        /* Optimize menu animations */
        .mobile-sidebar .ant-menu {
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .mobile-sidebar .ant-menu-item,
        .mobile-sidebar .ant-menu-submenu {
          transition: background-color 0.2s ease;
        }
      }

      /* Small mobile optimization */
      @media (max-width: 480px) {
        .mobile-sidebar {
          width: 260px;
          max-width: 90vw;
        }
      }

      /* Performance optimizations */
      @media (prefers-reduced-motion: reduce) {
        .mobile-sidebar,
        .mobile-sidebar-overlay {
          transition: none !important;
        }
      }
    `}</style>
  );
};
