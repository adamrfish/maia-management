import Image from "next/image";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white border-[0.5px] border-dark p-6 sm:p-8 md:p-12">
      <div className="mb-6">
        <Image src={icon} alt={title} width={40} height={40} />
      </div>
      <h3 className="mb-2 font-montserrat text-[0.833rem] font-medium tracking-[0.005em] text-dark">
        {title}
      </h3>
      <p className="font-montserrat text-[0.833rem] font-normal leading-[1.7] tracking-[0.05em] text-gray-text">
        {description}
      </p>
    </div>
  );
}
