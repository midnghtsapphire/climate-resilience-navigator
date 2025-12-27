import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'flood' | 'fire' | 'heat' | 'sea' | 'accent';
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = 'default',
  delay = 0
}) => {
  const variantStyles = {
    default: 'border-border hover:border-primary/30',
    flood: 'border-risk-flood/20 hover:border-risk-flood/40',
    fire: 'border-risk-fire/20 hover:border-risk-fire/40',
    heat: 'border-risk-heat/20 hover:border-risk-heat/40',
    sea: 'border-risk-sea/20 hover:border-risk-sea/40',
    accent: 'border-accent/20 hover:border-accent/40',
  };

  const iconStyles = {
    default: 'bg-primary/10 text-primary',
    flood: 'bg-risk-flood/10 text-risk-flood',
    fire: 'bg-risk-fire/10 text-risk-fire',
    heat: 'bg-risk-heat/10 text-risk-heat',
    sea: 'bg-risk-sea/10 text-risk-sea',
    accent: 'bg-accent/10 text-accent',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-risk-fire' : trend === 'down' ? 'text-accent' : 'text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        "stat-card group",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105",
          iconStyles[variant]
        )}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs", trendColor)}>
            <TrendIcon className="w-3 h-3" />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold text-foreground tracking-tight">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
