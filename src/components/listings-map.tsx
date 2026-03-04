"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Listing } from "@/types/listing";
import { ListingMapMarker } from "@/components/listing-map-marker";
import { ListingMapPopup } from "@/components/listing-map-popup";
import { MAP_STYLE, applyMaiaStyle } from "@/lib/map-style";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface ListingsMapProps {
  listings: Listing[];
  hoveredListingId: string | null;
  onMarkerHover: (id: string | null) => void;
  className?: string;
}

export function ListingsMap({
  listings,
  hoveredListingId,
  onMarkerHover,
  className,
}: ListingsMapProps) {
  const mapRef = useRef<MapRef>(null);
  const router = useRouter();
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Fit bounds to show all listings
  const fitBounds = useCallback(() => {
    if (!mapRef.current || listings.length === 0) return;

    const validListings = listings.filter(
      (l) => l.lat != null && l.lng != null
    );
    if (validListings.length === 0) return;

    if (validListings.length === 1) {
      mapRef.current.flyTo({
        center: [validListings[0].lng!, validListings[0].lat!],
        zoom: 15,
        duration: 800,
      });
      return;
    }

    const lngs = validListings.map((l) => l.lng!);
    const lats = validListings.map((l) => l.lat!);

    mapRef.current.fitBounds(
      [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ],
      { padding: { top: 60, bottom: 60, left: 60, right: 60 }, duration: 800 }
    );
  }, [listings]);

  // Refit when listings change (filter applied) and clear selection
  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedListing(null);
      fitBounds();
    }, 100);
    return () => clearTimeout(timer);
  }, [fitBounds]);

  // Center for initial view — midpoint of bounding box
  const validListings = listings.filter(
    (l) => l.lat != null && l.lng != null
  );
  const initialViewState = (() => {
    if (validListings.length === 0) {
      return { latitude: 25.78, longitude: -80.18, zoom: 12 };
    }
    const lats = validListings.map((l) => l.lat!);
    const lngs = validListings.map((l) => l.lng!);
    return {
      latitude: (Math.min(...lats) + Math.max(...lats)) / 2,
      longitude: (Math.min(...lngs) + Math.max(...lngs)) / 2,
      zoom: validListings.length === 1 ? 14 : 12,
    };
  })();

  return (
    <div className={className}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        onLoad={() => {
          applyMaiaStyle(mapRef);
          fitBounds();
        }}
        onClick={() => setSelectedListing(null)}
      >
        <NavigationControl position="bottom-right" showCompass={false} />

        {validListings.map((listing) => (
          <Marker
            key={listing.id}
            latitude={listing.lat!}
            longitude={listing.lng!}
            anchor="center"
          >
            <ListingMapMarker
              listing={listing}
              active={
                hoveredListingId === listing.id ||
                selectedListing?.id === listing.id
              }
              onClick={() => {
                if (selectedListing?.id === listing.id) {
                  router.push(`/listings/${listing.slug}`);
                } else {
                  setSelectedListing(listing);
                  // Pan so the popup (above the marker) is fully visible
                  if (mapRef.current && listing.lat != null && listing.lng != null) {
                    mapRef.current.flyTo({
                      center: [listing.lng, listing.lat],
                      offset: [0, 100] as [number, number],
                      duration: 400,
                    });
                  }
                }
              }}
              onMouseEnter={() => onMarkerHover(listing.id)}
              onMouseLeave={() => onMarkerHover(null)}
            />
          </Marker>
        ))}

        {selectedListing &&
          selectedListing.lat != null &&
          selectedListing.lng != null && (
            <Popup
              latitude={selectedListing.lat}
              longitude={selectedListing.lng}
              anchor="bottom"
              offset={16}
              closeOnClick={false}
              onClose={() => setSelectedListing(null)}
              className="listing-popup"
              maxWidth="none"
            >
              <ListingMapPopup listing={selectedListing} />
            </Popup>
          )}
      </Map>
    </div>
  );
}
