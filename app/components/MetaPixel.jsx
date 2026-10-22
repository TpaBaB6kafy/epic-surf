"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackMetaPageView } from "../utils/metaPixel";

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    trackMetaPageView(pathname);
  }, [pathname]);

  return null;
}
