import React from "react";
import { useRouter } from "next/router";
import { SendPlausibleEvent } from "utils/gtm";

const PageTracker = ({ children }) => {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      SendPlausibleEvent("pageview", { url });
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return <>{children}</>;
};

export default PageTracker;
