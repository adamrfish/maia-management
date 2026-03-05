export default function ListingsLoading() {
  return (
    <section className="bg-cream">
      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-[75rem]">
          {/* Breadcrumb skeleton */}
          <div className="pt-6 pb-4">
            <div className="h-3 w-32 animate-pulse rounded bg-cream-mid" />
          </div>

          {/* Filter bar skeleton */}
          <div className="border-b border-border-light py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-44 animate-pulse bg-cream-mid" />
              <div className="hidden h-10 w-20 animate-pulse bg-cream-mid md:block" />
              <div className="hidden h-10 w-20 animate-pulse bg-cream-mid md:block" />
              <div className="hidden h-10 w-24 animate-pulse bg-cream-mid md:block" />
              <div className="ml-auto h-10 w-24 animate-pulse bg-cream-mid" />
            </div>
          </div>

          {/* Map + sidebar skeleton */}
          <div className="flex flex-col lg:h-[calc(100dvh-6.5rem)] lg:flex-row">
            <div className="hidden shrink-0 lg:block lg:w-[24rem] xl:w-[28rem]">
              <div className="space-y-0">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-border-light px-5 py-4"
                  >
                    <div className="aspect-[3/2] w-full animate-pulse bg-cream-mid" />
                    <div className="mt-3 h-5 w-24 animate-pulse bg-cream-mid" />
                    <div className="mt-2 h-3 w-36 animate-pulse bg-cream-mid" />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[45dvh] shrink-0 animate-pulse bg-cream-mid lg:h-auto lg:min-h-0 lg:flex-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
