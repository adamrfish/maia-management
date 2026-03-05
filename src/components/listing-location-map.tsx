"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Home } from "lucide-react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAP_STYLE, applyMaiaStyle } from "@/lib/map-style";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface ListingLocationMapProps {
  lat: number;
  lng: number;
  address: string;
}

function ListingLocationMapInner({ lat, lng, address }: ListingLocationMapProps) {
  const mapRef = useRef<MapRef>(null);

  return (
    <div className="h-[18rem] overflow-hidden rounded-sm border border-border-light md:h-[24rem]">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        onLoad={() => applyMaiaStyle(mapRef)}
        scrollZoom={false}
      >
        <NavigationControl position="bottom-right" showCompass={false} />
        <Marker latitude={lat} longitude={lng} anchor="bottom">
          <div className="flex flex-col items-center" title={address}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-dark shadow-lg">
              <Home size={16} strokeWidth={1.5} className="text-cream" />
            </div>
            <div className="h-2 w-2 -mt-1 rotate-45 border-r-2 border-b-2 border-white bg-dark" />
          </div>
        </Marker>
      </Map>
    </div>
  );
}

export const ListingLocationMap = dynamic(
  () => Promise.resolve(ListingLocationMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[18rem] items-center justify-center rounded-sm border border-border-light bg-cream-mid md:h-[24rem]">
        <span className="text-[0.833rem] text-gray-text">Loading map...</span>
      </div>
    ),
  }
);
