import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Globe = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      projection: { name: 'globe' },
      zoom: 1.2,
      center: [20, 20],
      pitch: 0,
      interactive: false,
    });

    // Add atmosphere
    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgba(14, 165, 233, 0.1)',
        'high-color': 'rgba(6, 182, 212, 0.2)',
        'horizon-blend': 0.05,
        'space-color': 'rgba(10, 14, 39, 0)',
        'star-intensity': 0.15,
      });
    });

    // Smooth rotation
    const secondsPerRevolution = 120;
    let userInteracting = false;

    function spinGlobe() {
      if (!map.current || userInteracting) return;
      
      const distancePerSecond = 360 / secondsPerRevolution;
      const center = map.current.getCenter();
      center.lng -= distancePerSecond / 60;
      map.current.easeTo({ center, duration: 1000, easing: (n) => n });
    }

    map.current.on('moveend', spinGlobe);
    spinGlobe();

    setIsInitialized(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      initializeMap(apiKey.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="absolute inset-0 opacity-40">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-2">Enable 3D Globe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Mapbox public token to display the rotating Earth.
              Get yours at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
            </p>
            <Input
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mb-4"
            />
            <Button type="submit" className="w-full">
              Initialize Globe
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
