import Image from "next/image";

interface PropertyCardProps {
  image: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  zillowUrl: string;
}

export function PropertyCard({
  image,
  address,
  price,
  beds,
  baths,
  sqft,
  zillowUrl,
}: PropertyCardProps) {
  return (
    <a
      href={zillowUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-[22rem] flex-shrink-0 flex-col transition-transform duration-500 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute left-3 top-3 z-10">
          <Image
            src="/icons/expand.svg"
            alt=""
            width={24}
            height={24}
            className="opacity-70"
          />
        </div>
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
          <Image
            src="/icons/property-details.svg"
            alt=""
            width={16}
            height={16}
          />
          <span className="font-montserrat text-[0.694rem] font-medium uppercase tracking-wider text-white">
            Property Details
          </span>
        </div>
        <Image
          src={image}
          alt={address}
          fill
          sizes="22rem"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Text content */}
      <div className="pt-4">
        <div className="font-montserrat text-[1.2rem] font-semibold tracking-[0.05em] text-dark">
          {price}
        </div>
        <div className="mt-1 flex items-center">
          <span className="font-montserrat text-[0.833rem] font-semibold tracking-[0.05em] text-dark">
            {beds}
          </span>
          <span className="ml-0.5 font-montserrat text-[0.833rem] tracking-[0.05em] text-dark">
            bds
          </span>
          <span className="mx-1 font-montserrat text-[0.833rem] tracking-[0.05em] text-dark">
            |
          </span>
          <span className="font-montserrat text-[0.833rem] font-semibold tracking-[0.05em] text-dark">
            {baths}
          </span>
          <span className="ml-0.5 font-montserrat text-[0.833rem] tracking-[0.05em] text-dark">
            ba
          </span>
          <span className="mx-1 font-montserrat text-[0.833rem] tracking-[0.05em] text-dark">
            |
          </span>
          <span className="font-montserrat text-[0.833rem] font-semibold tracking-[0.05em] text-dark">
            {sqft}
          </span>
          <span className="ml-0.5 font-montserrat text-[0.833rem] tracking-[0.05em] text-dark">
            sqft
          </span>
        </div>
        <div className="mt-2 font-montserrat text-[0.694rem] tracking-[0.05em] text-dark">
          {address}
        </div>
      </div>
    </a>
  );
}
