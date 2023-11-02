"use client";
import { useState, useEffect } from "react";

import StoreModal from "@/components/modals/storeModal";

export default function ModalsProviders() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
}
