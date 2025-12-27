import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp,
  Droplets,
  Flame,
  Thermometer,
  MapPin,
  Plus,
  Filter
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import RiskIndicator from '@/components/RiskIndicator';
import AssetList from '@/components/AssetList';
import ClimateMap from '@/components/ClimateMap';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  const demoAssets = [
    {
      id: '1',
      name: 'Downtown Office Complex',
      type: 'Commercial',
      location: 'Miami, FL',
      overallRisk: 'high' as const,
      riskScore: 78,
      value: '$45.2M',
      primaryRisk: 'Flood Risk'
    },
    {
      id: '2',
      name: 'Coastal Resort Property',
      type: 'Hospitality',
      location: 'San Diego, CA',
      overallRisk: 'moderate' as const,
      riskScore: 52,
      value: '$28.7M',
      primaryRisk: 'Wildfire'
    },
    {
      id: '3',
      name: 'Industrial Warehouse',
      type: 'Industrial',
      location: 'Phoenix, AZ',
      overallRisk: 'critical' as const,
      riskScore: 89,
      value: '$12.4M',
      primaryRisk: 'Extreme Heat'
    },
    {
      id: '4',
      name: 'Residential Portfolio',
      type: 'Residential',
      location: 'New Orleans, LA',
      overallRisk: 'high' as const,
      riskScore: 71,
      value: '$67.8M',
      primaryRisk: 'Storm Surge'
    }
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeNav}
        onItemClick={setActiveNav}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" subtitle="Climate Risk Overview • Updated 2 hours ago" />
        
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Assets"
              value="247"
              subtitle="Across 12 regions"
              icon={Building2}
              trend="up"
              trendValue="+12"
              delay={0.1}
            />
            <StatCard
              title="Assets at Risk"
              value="38"
              subtitle="15.4% of portfolio"
              icon={AlertTriangle}
              variant="fire"
              trend="up"
              trendValue="+5"
              delay={0.15}
            />
            <StatCard
              title="Potential Exposure"
              value="$142M"
              subtitle="Annual risk estimate"
              icon={DollarSign}
              variant="heat"
              trend="down"
              trendValue="-8%"
              delay={0.2}
            />
            <StatCard
              title="Adaptation Score"
              value="72"
              subtitle="Portfolio resilience"
              icon={TrendingUp}
              variant="accent"
              trend="up"
              trendValue="+4"
              delay={0.25}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="xl:col-span-2 glass-panel p-1 h-[500px]"
            >
              <ClimateMap />
            </motion.div>

            {/* Risk Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="glass-panel p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Risk Breakdown</h3>
                <span className="text-xs text-muted-foreground">2050 Projection</span>
              </div>
              
              <div className="space-y-3">
                <RiskIndicator
                  type="flood"
                  level={72}
                  label="Flood & Storm Surge"
                  trend="increasing"
                  delay={0.4}
                />
                <RiskIndicator
                  type="heat"
                  level={85}
                  label="Extreme Heat Days"
                  trend="increasing"
                  delay={0.45}
                />
                <RiskIndicator
                  type="fire"
                  level={58}
                  label="Wildfire Exposure"
                  trend="stable"
                  delay={0.5}
                />
                <RiskIndicator
                  type="sea"
                  level={45}
                  label="Sea Level Rise"
                  trend="increasing"
                  delay={0.55}
                />
                <RiskIndicator
                  type="storm"
                  level={63}
                  label="Hurricane Intensity"
                  trend="increasing"
                  delay={0.6}
                />
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Portfolio Risk</span>
                  <span className="font-semibold text-risk-heat">High</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on RCP 4.5 scenario modeling with proprietary downscaling
                </p>
              </div>
            </motion.div>
          </div>

          {/* Asset Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Tabs defaultValue="high-risk" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-semibold text-foreground">Asset Portfolio</h3>
                  <TabsList className="bg-secondary h-8">
                    <TabsTrigger value="high-risk" className="text-xs h-6 px-3">High Risk</TabsTrigger>
                    <TabsTrigger value="all" className="text-xs h-6 px-3">All Assets</TabsTrigger>
                    <TabsTrigger value="monitored" className="text-xs h-6 px-3">Monitored</TabsTrigger>
                  </TabsList>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <Filter className="w-3.5 h-3.5" />
                    Filter
                  </Button>
                  <Button size="sm" className="gap-2 text-xs">
                    <Plus className="w-3.5 h-3.5" />
                    Add Asset
                  </Button>
                </div>
              </div>

              <TabsContent value="high-risk" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AssetList assets={demoAssets.filter(a => a.overallRisk === 'high' || a.overallRisk === 'critical')} />
                </div>
              </TabsContent>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AssetList assets={demoAssets} />
                </div>
              </TabsContent>

              <TabsContent value="monitored" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AssetList assets={demoAssets.slice(0, 2)} />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
