import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Map, 
  Building2, 
  LineChart, 
  Settings,
  Shield,
  Bell,
  HelpCircle,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed = false, 
  onToggle,
  activeItem = 'dashboard',
  onItemClick 
}) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'map', icon: Map, label: 'Risk Map' },
    { id: 'assets', icon: Building2, label: 'Assets' },
    { id: 'analysis', icon: LineChart, label: 'Analysis' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: 3 },
  ];

  const bottomItems = [
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "h-16 border-b border-sidebar-border flex items-center px-4",
        collapsed ? "justify-center" : "gap-3"
      )}>
        <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="font-semibold text-foreground text-sm">ClimateShield</h1>
            <p className="text-[10px] text-muted-foreground">Decision Support</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onItemClick?.(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
              activeItem === item.id
                ? "bg-sidebar-primary/10 text-sidebar-primary"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 flex-shrink-0 transition-colors",
              activeItem === item.id ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
            )} />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="py-4 px-2 border-t border-sidebar-border space-y-1">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
              activeItem === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="h-12 border-t border-sidebar-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className={cn(
          "w-5 h-5 transition-transform",
          collapsed && "rotate-180"
        )} />
      </button>
    </motion.aside>
  );
};

export default Sidebar;
