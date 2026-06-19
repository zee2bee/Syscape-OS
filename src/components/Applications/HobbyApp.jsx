import React, { useMemo } from "react";

export default function HobbyApp({ name }) {
  // Normalize the custom string input for cleaner URL matching
  const cleanName = (name || "technology").toLowerCase().trim();
  const queryParam = encodeURIComponent(cleanName);

  // Lock in a random themed image instance when this specific hobby frame initializes
  const dynamicImageUrl = useMemo(() => {
    const randomSignature = Math.floor(Math.random() * 1000) + 1;
    // Route to LoremFlickr keyword matching matrix with a locked unique session ID
    return `https://loremflickr.com/600/400/${queryParam}?lock=${randomSignature}`;
  }, [queryParam]);

  // Premium background asset fallback vector if external network nodes fail
  const fallbackUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop`;

  return (
    <div className="flex flex-col h-full justify-between space-y-3 font-mono">
      <div className="border border-white/10 rounded overflow-hidden relative group bg-black/40 h-64">
        <img
          src={dynamicImageUrl}
          alt={`Visual matrix for ${name}`}
          onError={(e) => {
            // Guard loop to ensure fallback rendering doesn't re-trigger error events
            if (e.target.src !== fallbackUrl) {
              e.target.src = fallbackUrl;
            }
          }}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] text-cyber-primary uppercase tracking-widest bg-black/60 px-2 py-0.5 border border-cyber-primary/30 rounded">
            THREAD RUNTIME ACTIVE
          </span>
          <h3 className="text-base font-bold text-white uppercase tracking-wider mt-1 drop-shadow-md">
            {name}
          </h3>
        </div>
      </div>
      <div className="text-xs text-white/50 bg-black/20 p-2 border border-white/5 rounded leading-relaxed">
        Executing subsystem process tracking mapping for module entry:{" "}
        <span className="text-cyber-secondary font-bold">{name}.exe</span>.
        Operational environment verification: stable.
      </div>
    </div>
  );
}
