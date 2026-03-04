import type { Listing } from "@/types/listing";

interface ListingApplyCardProps {
  listing: Listing;
}

export function ListingApplyCard({ listing }: ListingApplyCardProps) {
  const bedsLabel = listing.beds === 0 ? "Studio" : `${listing.beds} bd`;

  return (
    <div className="border border-border-light bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="text-[1.44rem] font-semibold tracking-[0.025em]">
        {listing.rentFormatted}
        <span className="text-[0.833rem] font-normal text-gray-text">/mo</span>
      </div>

      <div className="mt-2 text-[0.833rem] tracking-[0.05em] text-gray-text">
        {bedsLabel} · {listing.baths} ba · {listing.sqft} sqft
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-[0.833rem]">
          <span className="text-gray-text">Availability</span>
          <span className="font-medium">
            {listing.availableDate === "now"
              ? "Available Now"
              : listing.availableDateFormatted}
          </span>
        </div>

        {listing.securityDeposit != null && (
          <div className="flex items-center justify-between text-[0.833rem]">
            <span className="text-gray-text">Security Deposit</span>
            <span className="font-medium">
              ${listing.securityDeposit.toLocaleString()}
            </span>
          </div>
        )}

        {listing.applicationFee != null && (
          <div className="flex items-center justify-between text-[0.833rem]">
            <span className="text-gray-text">Application Fee</span>
            <span className="font-medium">${listing.applicationFee}</span>
          </div>
        )}

        {listing.utilitiesNote && (
          <div className="border-t border-border-light pt-3 text-[0.694rem] leading-relaxed text-gray-text">
            {listing.utilitiesNote}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={listing.applyUrl.replace("/rental_applications/new", "/contact_requests/new")}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full border border-dark py-4 text-center text-[0.694rem] tracking-[0.075em] text-dark transition-colors duration-200 hover:bg-dark hover:text-cream"
        >
          Schedule a Tour
        </a>
        <a
          href={listing.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full border border-dark bg-dark py-4 text-center text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
