import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, AlertTriangle, MoreVertical, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  overallRisk: 'low' | 'moderate' | 'high' | 'critical';
  riskScore: number;
  value: string;
  primaryRisk: string;
}

interface AssetListProps {
  assets: Asset[];
  onAssetSelect?: (asset: Asset) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onAssetSelect }) => {
  const riskStyles = {
    low: 'bg-accent/10 text-accent border-accent/20',
    moderate: 'bg-primary/10 text-primary border-primary/20',
    high: 'bg-risk-heat/10 text-risk-heat border-risk-heat/20',
    critical: 'bg-risk-fire/10 text-risk-fire border-risk-fire/20',
  };

  return (
    <div className="space-y-2">
      {assets.map((asset, index) => (
        <motion.div
          key={asset.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onAssetSelect?.(asset)}
          className="glass-panel p-4 cursor-pointer hover:border-primary/30 transition-all group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">{asset.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{asset.location}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium border",
                riskStyles[asset.overallRisk]
              )}>
                {asset.overallRisk.charAt(0).toUpperCase() + asset.overallRisk.slice(1)}
              </span>
              <span className="text-xs text-muted-foreground">
                Score: {asset.riskScore}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <AlertTriangle className="w-3 h-3" />
              <span>{asset.primaryRisk}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Asset Value</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-foreground">{asset.value}</span>
              <TrendingUp className="w-3 h-3 text-accent" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AssetList;
