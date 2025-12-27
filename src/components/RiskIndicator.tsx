import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Flame, Thermometer, Waves, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskIndicatorProps {
  type: 'flood' | 'fire' | 'heat' | 'sea' | 'storm';
  level: number; // 0-100
  label: string;
  trend?: 'increasing' | 'decreasing' | 'stable';
  delay?: number;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  type,
  level,
  label,
  trend,
  delay = 0
}) => {
  const icons = {
    flood: Droplets,
    fire: Flame,
    heat: Thermometer,
    sea: Waves,
    storm: Wind,
  };

  const colors = {
    flood: { bar: 'bg-risk-flood', glow: 'shadow-[0_0_20px_hsl(199,89%,48%,0.3)]' },
    fire: { bar: 'bg-risk-fire', glow: 'shadow-[0_0_20px_hsl(25,95%,53%,0.3)]' },
    heat: { bar: 'bg-risk-heat', glow: 'shadow-[0_0_20px_hsl(38,92%,50%,0.3)]' },
    sea: { bar: 'bg-risk-sea', glow: 'shadow-[0_0_20px_hsl(186,100%,42%,0.3)]' },
    storm: { bar: 'bg-risk-storm', glow: 'shadow-[0_0_20px_hsl(263,70%,50%,0.3)]' },
  };

  const Icon = icons[type];
  const color = colors[type];

  const getLevelLabel = (level: number) => {
    if (level >= 75) return 'Critical';
    if (level >= 50) return 'High';
    if (level >= 25) return 'Moderate';
    return 'Low';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-4 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors"
    >
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center",
        `risk-${type}`
      )}>
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className={cn(
            "text-xs font-medium",
            level >= 75 ? 'text-risk-fire' : level >= 50 ? 'text-risk-heat' : level >= 25 ? 'text-primary' : 'text-accent'
          )}>
            {getLevelLabel(level)}
          </span>
        </div>
        
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
            className={cn(
              "h-full rounded-full transition-all",
              color.bar,
              level >= 75 && color.glow
            )}
          />
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">{level}% risk score</span>
          {trend && (
            <span className={cn(
              "text-xs",
              trend === 'increasing' ? 'text-risk-fire' : trend === 'decreasing' ? 'text-accent' : 'text-muted-foreground'
            )}>
              {trend === 'increasing' ? '↑ Rising' : trend === 'decreasing' ? '↓ Falling' : '→ Stable'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RiskIndicator;
