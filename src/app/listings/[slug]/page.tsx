import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllListings, getListingBySlug, getRelatedListings } from "@/lib/listings";
import { ListingGallery } from "@/components/listing-gallery";
import { ListingApplyCard } from "@/components/listing-apply-card";
import { ListingHighlights } from "@/components/listing-highlights";
import { ListingLocationMap } from "@/components/listing-location-map";
import { ListingMobileBar } from "@/components/listing-mobile-bar";
import { ListingShareSave } from "@/components/listing-share-save";
import { ListingCard } from "@/components/listing-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { FadeIn } from "@/components/ui/motion-primitives";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const listings = getAllListings();
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};

  const description = `${listing.rentFormatted}/mo — ${listing.beds === 0 ? "Studio" : `${listing.beds} bed`}, ${listing.baths} bath, ${listing.sqft} sqft apartment in ${listing.city}.`;
  const ogImage = listing.images[0]?.url;

  return {
    title: listing.streetAddress,
    description,
    alternates: {
      canonical: `https://maiamgmt.com/listings/${listing.slug}`,
    },
    openGraph: {
      title: `${listing.streetAddress} — ${listing.rentFormatted}/mo`,
      description,
      url: `https://maiamgmt.com/listings/${listing.slug}`,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: listing.streetAddress }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${listing.streetAddress} — ${listing.rentFormatted}/mo`,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const relatedListings = getRelatedListings(slug, 2);
  const isAvailableNow = listing.availableDate === "now";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: listing.streetAddress,
    description: listing.description,
    url: `https://maiamgmt.com/listings/${listing.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.streetAddress,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip,
      addressCountry: "US",
    },
    ...(listing.lat != null && listing.lng != null && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: listing.lat,
        longitude: listing.lng,
      },
    }),
    numberOfBedrooms: listing.beds,
    numberOfBathroomsTotal: listing.baths,
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.sqft,
      unitCode: "FTK",
    },
    ...(listing.images[0] && { image: listing.images[0].url }),
    offers: {
      "@type": "Offer",
      price: listing.rent,
      priceCurrency: "USD",
      availability: isAvailableNow
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[60rem]">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Apartments", href: "/listings" },
                { label: listing.streetAddress },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[60rem]">
            <div className="pt-2 pb-4">
              <ListingGallery
                images={listing.images}
                address={listing.address}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[60rem]">
            <div className="bg-white border border-border-light p-6 md:p-10 my-6 md:my-10">
              <FadeIn>
                {/* Property header */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h1 className="text-[1.44rem] font-medium tracking-[0.025em] sm:text-[1.728rem]">
                        {listing.streetAddress}
                      </h1>
                      <p className="mt-1 text-[0.833rem] tracking-[0.05em] text-gray-text">
                        {listing.city}
                        {listing.neighborhood && ` · ${listing.neighborhood}`}
                      </p>
                    </div>
                    <ListingShareSave />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <span className="text-[1.6rem] font-semibold tracking-[0.025em] sm:text-[2rem]">
                      {listing.rentFormatted}
                      <span className="text-[0.833rem] font-normal text-gray-text">
                        /mo
                      </span>
                    </span>
                    {isAvailableNow ? (
                      <span className="bg-available px-3 py-1 text-[0.694rem] font-medium tracking-[0.05em] text-available-text">
                        Available Now
                      </span>
                    ) : (
                      <span className="bg-dark/10 px-3 py-1 text-[0.694rem] tracking-[0.05em]">
                        {listing.availableDateFormatted}
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlights bar */}
                <ListingHighlights listing={listing} />

                {/* Two-column layout */}
                <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
                  {/* Left: description + amenities + pet policy */}
                  <div className="space-y-8">
                    <div>
                      <h2 className="mb-3 text-[0.694rem] font-medium uppercase tracking-[0.125em] text-gray-text">
                        About this property
                      </h2>
                      <div className="whitespace-pre-line text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
                        {listing.description}
                      </div>
                    </div>

                    {listing.amenities.length > 0 && (
                      <div className="border-t border-border-light pt-8">
                        <h2 className="mb-3 text-[0.694rem] font-medium uppercase tracking-[0.125em] text-gray-text">
                          Amenities
                        </h2>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                          {listing.amenities.map((amenity) => (
                            <li
                              key={amenity}
                              className="text-[0.833rem] tracking-[0.05em]"
                            >
                              {amenity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {listing.petPolicy && (
                      <div className="border-t border-border-light pt-8">
                        <h2 className="mb-3 text-[0.694rem] font-medium uppercase tracking-[0.125em] text-gray-text">
                          Pet Policy
                        </h2>
                        <p className="text-[0.833rem] tracking-[0.05em]">
                          {listing.petPolicy}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right: sticky apply card */}
                  <div className="hidden md:block md:sticky md:top-24 md:self-start">
                    <ListingApplyCard listing={listing} />
                  </div>
                </div>

                {/* Location map */}
                {listing.lat != null && listing.lng != null && (
                  <div className="mt-12 border-t border-border-light pt-8">
                    <h2 className="mb-4 text-[0.694rem] font-medium uppercase tracking-[0.125em] text-gray-text">
                      Location
                    </h2>
                    <ListingLocationMap
                      lat={listing.lat}
                      lng={listing.lng}
                      address={listing.address}
                    />
                  </div>
                )}

                {/* Related listings */}
                {relatedListings.length > 0 && (
                  <div className="mt-12 border-t border-border-light pt-8">
                    <h2 className="mb-6 text-[0.694rem] font-medium uppercase tracking-[0.125em] text-gray-text">
                      More apartments available
                    </h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      {relatedListings.map((related) => (
                        <ListingCard key={related.id} listing={related} />
                      ))}
                    </div>
                  </div>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile bottom bar */}
      <ListingMobileBar listing={listing} />
      {/* Spacer for mobile bottom bar */}
      <div className="h-[4.5rem] md:hidden" />
    </>
  );
}
