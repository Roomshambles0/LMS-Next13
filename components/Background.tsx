"use client";

import { useSelectedLayoutSegment } from "next/navigation";

const SHOW_BACKGROUND_SEGMENTS = [
    "tools",
    "pricing",
    "help",
    "features",
    "customers",
    "blog",
    "(blog-post)",
    "login",
    "register",
    "auth",
  ];

  export function Background() {
    let segment;

      segment = useSelectedLayoutSegment();
   
    return (
      <div style={styles.backgroundMain}>
        
      </div>
    )
  }

  const styles = {
    backgroundMain: {
      backgroundColor: "#dad6d6",
      opacity: 1,
      backgroundImage: " linear-gradient(30deg, #45452c 12%, transparent 12.5%, transparent 87%, #45452c 87.5%, #45452c), linear-gradient(150deg, #45452c 12%, transparent 12.5%, transparent 87%, #45452c 87.5%, #45452c), linear-gradient(30deg, #45452c 12%, transparent 12.5%, transparent 87%, #45452c 87.5%, #45452c), linear-gradient(150deg, #45452c 12%, transparent 12.5%, transparent 87%, #45452c 87.5%, #45452c), linear-gradient(60deg, #45452c77 25%, transparent 25.5%, transparent 75%, #45452c77 75%, #45452c77), linear-gradient(60deg, #45452c77 25%, transparent 25.5%, transparent 75%, #45452c77 75%, #45452c77)",
      backgroundSize: "32px 56px",
      backgroundPosition:"0 0, 0 0, 16px 28px, 16px 28px, 0 0, 16px 28px",
    },
  };
