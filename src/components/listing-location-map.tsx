"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
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
    <div className="h-[24rem] overflow-hidden rounded-sm border border-border-light">
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
        <Marker latitude={lat} longitude={lng} anchor="center">
          <div className="relative flex items-center justify-center" title={address}>
            {/* Pulse ring */}
            <span className="absolute h-10 w-10 animate-ping rounded-full bg-dark/20" />
            {/* Marker dot */}
            <span className="relative h-4 w-4 rounded-full border-2 border-white bg-dark shadow-lg" />
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
      <div className="flex h-[24rem] items-center justify-center rounded-sm border border-border-light bg-cream-mid">
        <span className="text-[0.833rem] text-gray-text">Loading map...</span>
      </div>
    ),
  }
);
