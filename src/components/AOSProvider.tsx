"use client";

import { useEffect } from "react";

interface AOSProviderProps {
  children: React.ReactNode;
}

export function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Dynamically import AOS
      import("aos")
        .then((AOSModule) => {
          // Handle both default and named exports
          const AOS = AOSModule.default || AOSModule;

          if (AOS && typeof AOS.init === "function") {
            AOS.init({
              duration: 800,
              easing: "ease-in-out",
              once: true,
              offset: 100,
              delay: 100,
            });
          } else {
            console.warn("AOS not properly loaded");
          }
        })
        .catch((error) => {
          console.warn("AOS failed to load:", error);
        });
    }
  }, []);

  return <>{children}</>;
}
