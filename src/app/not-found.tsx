import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-cream">
      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-[75rem]">
          <div className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
            <p className="text-[0.694rem] uppercase tracking-[0.125em] text-gray-text">
              404
            </p>
            <h1 className="mt-4 text-[1.728rem] font-medium tracking-[0.025em]">
              Page not found
            </h1>
            <p className="mt-4 max-w-[28rem] text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let us help you find what you need.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/"
                className="border border-dark bg-dark px-6 py-3 text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark"
              >
                Go home
              </Link>
              <Link
                href="/listings"
                className="border border-dark px-6 py-3 text-[0.694rem] tracking-[0.075em] transition-colors duration-200 hover:bg-dark hover:text-cream"
              >
                Browse apartments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
