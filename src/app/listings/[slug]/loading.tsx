export default function ListingLoading() {
  return (
    <section className="bg-cream">
      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-[60rem]">
          {/* Gallery skeleton */}
          <div className="pt-12 pb-4">
            <div className="aspect-[4/3] w-full animate-shimmer md:aspect-[2.5/1]" />
          </div>
          {/* Content skeleton */}
          <div className="py-8 md:py-12">
            <div className="h-8 w-64 animate-shimmer" />
            <div className="mt-3 h-4 w-40 animate-shimmer" />
            <div className="mt-6 h-10 w-32 animate-shimmer" />
            <div className="mt-8 grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 animate-shimmer" />
              ))}
            </div>
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full animate-shimmer" />
              <div className="h-4 w-5/6 animate-shimmer" />
              <div className="h-4 w-4/6 animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
