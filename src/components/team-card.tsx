import Image from "next/image";

interface TeamCardProps {
  name: string;
  title: string;
  bio: string;
  phone: string;
  email: string;
  image?: string;
}

export function TeamCard({
  name,
  title,
  bio,
  phone,
  email,
  image,
}: TeamCardProps) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      {image ? (
        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg">
          <Image src={image} alt={name} fill sizes="16rem" className="object-cover" />
        </div>
      ) : (
        <div className="mb-4 flex aspect-square w-full items-center justify-center rounded-lg bg-muted">
          <span className="text-4xl font-bold text-muted-foreground">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
      )}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mb-3 text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {bio}
      </p>
      <div className="flex gap-3">
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <Image src="/icons/call.png" alt="Phone" width={16} height={16} />
          {phone}
        </a>
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <Image src="/icons/email.png" alt="Email" width={16} height={16} />
          Email
        </a>
      </div>
    </div>
  );
}
