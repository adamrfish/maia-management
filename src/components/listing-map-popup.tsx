import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/listing";

interface ListingMapPopupProps {
  listing: Listing;
}

export function ListingMapPopup({ listing }: ListingMapPopupProps) {
  const primaryImage = listing.images[0];
  const bedsLabel = listing.beds === 0 ? "Studio" : `${listing.beds} bd`;

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block w-[18rem]"
    >
      <div className="relative h-36 w-full overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={listing.address}
            fill
            sizes="18rem"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cream-mid">
            <span className="text-[0.694rem] text-gray-text">No photo</span>
          </div>
        )}
        <div className="absolute bottom-2 right-2 z-10">
          <span className="bg-dark/80 px-2 py-1 text-[0.579rem] font-medium tracking-wider text-cream">
            {listing.availableDate === "now"
              ? "Available Now"
              : listing.availableDateFormatted}
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="text-[1rem] font-medium tracking-[0.025em]">
          {listing.rentFormatted}
          <span className="text-[0.694rem] font-normal text-gray-text">
            /mo
          </span>
        </div>
        <div className="mt-0.5 text-[0.694rem] tracking-[0.05em]">
          {bedsLabel} | {listing.baths} ba | {listing.sqft} sqft
        </div>
        <div className="mt-1 text-[0.694rem] tracking-[0.05em] text-gray-text">
          {listing.streetAddress}
        </div>
      </div>
    </Link>
  );
}
