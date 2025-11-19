'use client';

import { MapPin, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface MapConfig {
  latitude: number;
  longitude: number;
  zoom: number;
}

export default function MapConfigurationPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [mapConfig, setMapConfig] = useState<MapConfig>({
    latitude: 9.0192,
    longitude: 38.7578,
    zoom: 13
  });

  useEffect(() => {
    const fetchMapConfig = async () => {
      try {
        const response = await fetch('/api/public/contact/config');
        const data = await response.json();
        if (data.success && data.data) {
          setMapConfig({
            latitude: data.data.latitude,
            longitude: data.data.longitude,
            zoom: data.data.zoom || 13
          });
        }
      } catch (error) {
        console.error('Failed to fetch map config:', error);
      }
    };

    fetchMapConfig();
  }, []);

  const handleMapConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMapConfig(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactLocation: mapConfig
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Map configuration saved successfully');
      } else {
        throw new Error(data.error || 'Failed to save map configuration');
      }
    } catch (error) {
      console.error('Error saving map configuration:', error);
      toast.error('Failed to save map configuration');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Map Configuration</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure the map location for the contact page
        </p>
      </div>

      {/* Map Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Contact Map Configuration
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Update the map location that appears on the Contact Us page. You can get the coordinates from Google Maps by right-clicking on a location and selecting "What's here?".
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={mapConfig.latitude}
                onChange={handleMapConfigChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={mapConfig.longitude}
                onChange={handleMapConfigChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Zoom Level (1-20)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                name="zoom"
                value={mapConfig.zoom}
                onChange={handleMapConfigChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${mapConfig.latitude},${mapConfig.longitude}&z=${mapConfig.zoom}&output=embed`}
                allowFullScreen={false}
                aria-hidden="false"
                tabIndex={0}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Map preview showing the current location settings
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end">
        <button 
          onClick={handleSubmit}
          disabled={isSaving}
          className={`flex items-center space-x-2 px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
}
