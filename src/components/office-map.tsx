"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAP_STYLE, applyMaiaStyle } from "@/lib/map-style";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

// 420 Lincoln Road Suite 258, Miami Beach, FL 33139
const OFFICE_LAT = 25.7907;
const OFFICE_LNG = -80.1351;

function OfficeMapInner() {
  const mapRef = useRef<MapRef>(null);

  return (
    <div className="h-[16rem] overflow-hidden border border-border-light md:h-[20rem]">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          latitude: OFFICE_LAT,
          longitude: OFFICE_LNG,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        onLoad={() => applyMaiaStyle(mapRef)}
        scrollZoom={false}
      >
        <NavigationControl position="bottom-right" showCompass={false} />
        <Marker latitude={OFFICE_LAT} longitude={OFFICE_LNG} anchor="center">
          <div className="relative flex items-center justify-center" title="Maia Management Office">
            <span className="absolute h-10 w-10 animate-ping rounded-full bg-dark/20" />
            <span className="relative h-4 w-4 rounded-full border-2 border-white bg-dark shadow-lg" />
          </div>
        </Marker>
      </Map>
    </div>
  );
}

export const OfficeMap = dynamic(() => Promise.resolve(OfficeMapInner), {
  ssr: false,
  loading: () => (
    <div className="flex h-[16rem] items-center justify-center border border-border-light bg-cream-mid md:h-[20rem]">
      <span className="text-[0.833rem] text-gray-text">Loading map...</span>
    </div>
  ),
});
