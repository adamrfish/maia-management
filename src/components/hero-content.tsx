import Link from "next/link";

export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto max-w-[42rem] text-center">
      {/* Kicker */}
      <p
        className="text-[0.694rem] uppercase tracking-[0.125em] animate-fade-up opacity-0"
        style={{ animationDelay: "0.2s" }}
      >
        Unlock the door to
      </p>

      {/* Headline */}
      <h1
        className="mt-5 mb-6 text-[2.074rem] font-medium leading-tight tracking-[0.025em] md:text-[2.986rem] animate-fade-up opacity-0"
        style={{ animationDelay: "0.35s" }}
      >
        Miami&rsquo;s vibrant lifestyle
      </h1>

      {/* Body */}
      <p
        className="mx-auto max-w-[32rem] text-[1rem] leading-[1.7] tracking-[0.025em] text-gray-text animate-fade-up opacity-0"
        style={{ animationDelay: "0.5s" }}
      >
        Find your next apartment or let us manage your property. Maia brings
        personalized service to Miami&apos;s best neighborhoods.
      </p>

      {/* CTAs */}
      <div
        className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-6 animate-fade-up opacity-0"
        style={{ animationDelay: "0.65s" }}
      >
        <Link
          href="/listings"
          className="w-full border border-dark bg-dark px-8 py-3.5 text-center text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark sm:w-auto sm:py-4"
        >
          Find apartments
        </Link>
        <Link
          href="/management"
          className="w-full border border-dark bg-cream px-8 py-3.5 text-center text-[0.694rem] tracking-[0.075em] transition-colors duration-200 hover:bg-dark hover:text-cream active:scale-[0.98] sm:w-auto sm:py-4"
        >
          Manage property
        </Link>
      </div>
    </div>
  );
}
