import type { MapRef } from "react-map-gl/mapbox";

export const MAP_STYLE = "mapbox://styles/mapbox/light-v11";

/**
 * Warm cream/earth-tone overrides applied on map load.
 * Transforms the stock Mapbox light style to match the Maia brand palette.
 */
export function applyMaiaMapStyle(map: mapboxgl.Map) {
  const style = map.getStyle();
  if (!style?.layers) return;

  for (const layer of style.layers) {
    const id = layer.id;
    const type = layer.type;

    // Background — warm cream
    if (id === "background") {
      map.setPaintProperty(id, "background-color", "#f3eee7");
      continue;
    }

    // Land / landuse — warm tones
    if (id === "land" || id.startsWith("landuse")) {
      if (type === "fill") {
        // Parks get a muted sage green
        if (id.includes("park")) {
          map.setPaintProperty(id, "fill-color", "#dde8d6");
        } else {
          map.setPaintProperty(id, "fill-color", "#ede9e1");
        }
      }
      continue;
    }

    // Water — soft blue-grey (not the default bright blue)
    if (id.startsWith("water")) {
      if (type === "fill") {
        map.setPaintProperty(id, "fill-color", "#c4d4dc");
      } else if (type === "line") {
        map.setPaintProperty(id, "line-color", "#b8c8d1");
      }
      continue;
    }

    // Buildings — subtle warm grey
    if (id.startsWith("building")) {
      if (type === "fill") {
        map.setPaintProperty(id, "fill-color", "#e4dfd8");
      }
      continue;
    }

    // Roads — muted warm palette
    if (id.startsWith("road")) {
      if (type === "line") {
        if (id.includes("major") || id.includes("motorway") || id.includes("trunk")) {
          map.setPaintProperty(id, "line-color", "#d6d0c7");
        } else {
          map.setPaintProperty(id, "line-color", "#e8e3db");
        }
      }
      continue;
    }

    // Road labels — dark for readability
    if (id.startsWith("road") && type === "symbol") {
      map.setPaintProperty(id, "text-color", "#6b6560");
      continue;
    }

    // Place / poi labels — earth-tone
    if ((id.startsWith("place") || id.startsWith("poi")) && type === "symbol") {
      map.setPaintProperty(id, "text-color", "#6b6560");
      continue;
    }

    // Transit — subtle
    if (id.startsWith("transit")) {
      if (type === "line") {
        map.setPaintProperty(id, "line-color", "#d6d0c7");
      }
      continue;
    }

    // Admin boundaries — very subtle
    if (id.startsWith("admin")) {
      if (type === "line") {
        map.setPaintProperty(id, "line-color", "#d6d0c7");
      }
      continue;
    }
  }
}

/**
 * Helper to call from react-map-gl onLoad.
 * Pass the MapRef and it handles the underlying mapbox-gl instance.
 */
export function applyMaiaStyle(mapRef: React.RefObject<MapRef | null>) {
  const map = mapRef.current?.getMap();
  if (map) applyMaiaMapStyle(map);
}
