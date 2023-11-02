"use client";

import Loader from "@/components/Layout/Loader";

const Loading = () => {
  return (
    <div className="flex h-[90vh] w-[90vw] backdrop-blur-3xl items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
