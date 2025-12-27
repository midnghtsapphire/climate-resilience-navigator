import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Dashboard",
  subtitle = "Climate Risk Overview" 
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-6"
    >
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search assets, locations..."
            className="w-64 pl-9 h-9 bg-secondary border-border text-sm"
          />
        </div>

        {/* AI Assistant Button */}
        <Button variant="outline" size="sm" className="gap-2 text-xs hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          AI Analysis
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </Button>

        {/* User Menu */}
        <Button variant="ghost" className="gap-2 h-9 px-2">
          <div className="w-7 h-7 rounded-full bg-gradient-accent flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm hidden sm:inline">Admin</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
