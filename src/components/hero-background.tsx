import Image from "next/image";

export function HeroBackground() {
  return (
    <div className="fixed top-0 left-0 right-0 z-0 h-screen pointer-events-none overflow-hidden animate-hero-bg">
      <div className="absolute right-0 top-0 origin-top-right animate-hero-bg-scale">
        <Image
          src="/background.webp"
          alt=""
          width={838}
          height={600}
          className="h-[15rem] w-auto md:h-[25rem]"
          priority
          fetchPriority="high"
        />
      </div>
      <div className="absolute left-0 top-0 origin-top-left animate-hero-bg-scale">
        <Image
          src="/leaf-left.webp"
          alt=""
          width={1218}
          height={800}
          className="h-[10rem] w-auto md:h-[16rem]"
          priority
        />
      </div>
    </div>
  );
}
