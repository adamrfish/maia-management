import { MapPin } from "lucide-react";

interface MapSkeletonProps {
  className?: string;
}

export function MapSkeleton({ className = "h-[24rem]" }: MapSkeletonProps) {
  return (
    <div className={`relative overflow-hidden bg-cream-mid ${className}`}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 animate-shimmer" />

      {/* Fake map roads */}
      <div className="absolute inset-0 opacity-[0.07]">
        {/* Horizontal roads */}
        <div className="absolute left-0 right-0 top-[30%] h-px bg-dark" />
        <div className="absolute left-0 right-0 top-[55%] h-[2px] bg-dark" />
        <div className="absolute left-0 right-0 top-[78%] h-px bg-dark" />
        {/* Vertical roads */}
        <div className="absolute bottom-0 left-[22%] top-0 w-px bg-dark" />
        <div className="absolute bottom-0 left-[48%] top-0 w-[2px] bg-dark" />
        <div className="absolute bottom-0 left-[72%] top-0 w-px bg-dark" />
      </div>

      {/* Center pin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center opacity-20">
          <MapPin size={28} strokeWidth={1.5} className="text-dark" />
        </div>
      </div>
    </div>
  );
}
