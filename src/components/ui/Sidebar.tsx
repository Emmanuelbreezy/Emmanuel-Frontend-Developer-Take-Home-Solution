import React from "react";
import { ReactNode } from "react";
import { useIsMobile } from "@/hook/use-mobile";

interface PropsType {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
}

const Sidebar = ({ children, className, isOpen }: PropsType) => {
  const isMobile = useIsMobile();
  return (
    <>
      <div
        className={`
          fixed top-0 left-0 h-full z-50 bg-white text-black
          transition-transform duration-300 ease-in-out 
          ${isMobile ? "w-36" : "w-64"} 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${className}
        `}
      >
        {children}
      </div>
    </>
  );
};

Sidebar.displayName = "Sidebar";

interface SidebarMenuType {
  children: ReactNode;
  className?: string;
}

const SidebarMenu: React.FC<SidebarMenuType> = ({ children, className }) => {
  return (
    <div className={`${className}`}>
      <ul className="w-full list-none !p-0">{children}</ul>
    </div>
  );
};

SidebarMenu.displayName = "SidebarMenu";

interface SidebarMenuItemType {
  children: ReactNode;
  className?: string;
}

const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemType>(
  ({ children, className }, ref) => {
    return (
      <li ref={ref} className={`w-full mb-1 ${className}`}>
        {children}
      </li>
    );
  }
);

SidebarMenuItem.displayName = "SidebarMenuItem";

export { Sidebar, SidebarMenu, SidebarMenuItem };
