import React from "react";
import classNames from "clsx";

type Partner = {
  name: string;
  logo?: string; // optional path to image
};

const partners: Partner[] = [
  { name: "Global Aid" },
  { name: "HealthWorks" },
  { name: "EduFund" },
  { name: "GreenWorks" },
  { name: "SolarHope" },
  { name: "AquaCare" },
];

const PartnerMarquee: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames("overflow-hidden py-6 relative", className)} aria-hidden={false}>
      <div className="marquee relative">
        <div className="marquee-track flex items-center space-x-8">
          {partners.concat(partners).map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card/30 hover:bg-card/50 focus:bg-card/50 transition-colors cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`Partner ${p.name}`}
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-white">
                {p.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="text-sm font-medium">{p.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Left / right corner shadows */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 hidden sm:block">
        <div className="h-full w-full bg-gradient-to-r from-[hsl(330,100%,50%)]/20 via-[hsl(330,100%,50%)]/5 to-transparent" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 hidden sm:block">
        <div className="h-full w-full bg-gradient-to-l from-[hsl(330,100%,50%)]/20 via-[hsl(330,100%,50%)]/5 to-transparent" />
+      </div>
+
      <style>{`
        .marquee { --marquee-duration: 18s; }
        .marquee-track { display: inline-flex; animation: marquee var(--marquee-duration) linear infinite; }
        .marquee-track:hover, .marquee-track:focus-within { animation-play-state: paused; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

export default PartnerMarquee;
