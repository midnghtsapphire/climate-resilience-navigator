import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import { Layers, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClimateMapProps {
  accessToken?: string;
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
}

const ClimateMap: React.FC<ClimateMapProps> = ({ 
  accessToken = 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNTh6dWpqMzE5NWwyam9rNndyeGMwem8ifQ.example',
  onLocationSelect 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string>('flood');

  const layers = [
    { id: 'flood', name: 'Flood Risk', color: 'hsl(199, 89%, 48%)' },
    { id: 'fire', name: 'Wildfire', color: 'hsl(25, 95%, 53%)' },
    { id: 'heat', name: 'Extreme Heat', color: 'hsl(38, 92%, 50%)' },
    { id: 'sea', name: 'Sea Level', color: 'hsl(186, 100%, 42%)' },
  ];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = accessToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5795, 39.8283],
      zoom: 4,
      pitch: 20,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Add demo risk zones
      if (map.current) {
        // Simulated flood risk layer
        map.current.addSource('flood-risk', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: { risk: 'high' },
                geometry: {
                  type: 'Polygon',
                  coordinates: [[
                    [-90.5, 29.5], [-89.5, 29.5], [-89.5, 30.5], [-90.5, 30.5], [-90.5, 29.5]
                  ]]
                }
              },
              {
                type: 'Feature',
                properties: { risk: 'medium' },
                geometry: {
                  type: 'Polygon',
                  coordinates: [[
                    [-122.5, 37.5], [-121.5, 37.5], [-121.5, 38.5], [-122.5, 38.5], [-122.5, 37.5]
                  ]]
                }
              }
            ]
          }
        });

        map.current.addLayer({
          id: 'flood-risk-layer',
          type: 'fill',
          source: 'flood-risk',
          paint: {
            'fill-color': [
              'match',
              ['get', 'risk'],
              'high', 'rgba(14, 165, 233, 0.4)',
              'medium', 'rgba(14, 165, 233, 0.25)',
              'rgba(14, 165, 233, 0.15)'
            ],
            'fill-outline-color': 'rgba(14, 165, 233, 0.8)'
          }
        });

        // Add heat zones
        map.current.addSource('heat-risk', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: { risk: 'extreme' },
                geometry: {
                  type: 'Polygon',
                  coordinates: [[
                    [-112, 33], [-111, 33], [-111, 34], [-112, 34], [-112, 33]
                  ]]
                }
              },
              {
                type: 'Feature',
                properties: { risk: 'high' },
                geometry: {
                  type: 'Polygon',
                  coordinates: [[
                    [-117, 34], [-116, 34], [-116, 35], [-117, 35], [-117, 34]
                  ]]
                }
              }
            ]
          }
        });

        map.current.addLayer({
          id: 'heat-risk-layer',
          type: 'fill',
          source: 'heat-risk',
          layout: { visibility: 'none' },
          paint: {
            'fill-color': [
              'match',
              ['get', 'risk'],
              'extreme', 'rgba(245, 158, 11, 0.5)',
              'high', 'rgba(245, 158, 11, 0.3)',
              'rgba(245, 158, 11, 0.15)'
            ],
            'fill-outline-color': 'rgba(245, 158, 11, 0.8)'
          }
        });

        // Add fire zones
        map.current.addSource('fire-risk', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: { risk: 'critical' },
                geometry: {
                  type: 'Polygon',
                  coordinates: [[
                    [-119, 36], [-118, 36], [-118, 37], [-119, 37], [-119, 36]
                  ]]
                }
              }
            ]
          }
        });

        map.current.addLayer({
          id: 'fire-risk-layer',
          type: 'fill',
          source: 'fire-risk',
          layout: { visibility: 'none' },
          paint: {
            'fill-color': 'rgba(249, 115, 22, 0.4)',
            'fill-outline-color': 'rgba(249, 115, 22, 0.9)'
          }
        });

        // Add sea level rise zones
        map.current.addSource('sea-risk', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: { risk: 'high' },
                geometry: {
                  type: 'Polygon',
                  coordinates: [[
                    [-80.5, 25], [-80, 25], [-80, 26], [-80.5, 26], [-80.5, 25]
                  ]]
                }
              }
            ]
          }
        });

        map.current.addLayer({
          id: 'sea-risk-layer',
          type: 'fill',
          source: 'sea-risk',
          layout: { visibility: 'none' },
          paint: {
            'fill-color': 'rgba(6, 182, 212, 0.4)',
            'fill-outline-color': 'rgba(6, 182, 212, 0.9)'
          }
        });
      }
    });

    map.current.on('click', (e) => {
      if (onLocationSelect) {
        onLocationSelect({ lat: e.lngLat.lat, lng: e.lngLat.lng });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [accessToken, onLocationSelect]);

  const toggleLayer = (layerId: string) => {
    if (!map.current || !mapLoaded) return;
    
    setActiveLayer(layerId);
    
    const layerMappings: Record<string, string> = {
      flood: 'flood-risk-layer',
      fire: 'fire-risk-layer',
      heat: 'heat-risk-layer',
      sea: 'sea-risk-layer',
    };

    Object.entries(layerMappings).forEach(([key, mapLayer]) => {
      const visibility = key === layerId ? 'visible' : 'none';
      if (map.current?.getLayer(mapLayer)) {
        map.current.setLayoutProperty(mapLayer, 'visibility', visibility);
      }
    });
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!map.current) return;
    const currentZoom = map.current.getZoom();
    map.current.easeTo({
      zoom: direction === 'in' ? currentZoom + 1 : currentZoom - 1,
      duration: 300
    });
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Layer Controls */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="map-overlay top-4 left-4 p-3"
      >
        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-foreground">
          <Layers className="w-4 h-4 text-primary" />
          <span>Risk Layers</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeLayer === layer.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: layer.color }}
              />
              {layer.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Zoom Controls */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="map-overlay top-4 right-4 p-1.5 flex flex-col gap-1"
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleZoom('in')}
          className="h-8 w-8 hover:bg-secondary"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleZoom('out')}
          className="h-8 w-8 hover:bg-secondary"
        >
          <Minus className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Legend */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="map-overlay bottom-4 right-4 p-3"
      >
        <p className="text-xs font-medium text-muted-foreground mb-2">Risk Level</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary/20 border border-primary/40" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary/40 border border-primary/60" />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary/70 border border-primary" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>
      </motion.div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-background/10" />
    </div>
  );
};

export default ClimateMap;
