import React from "react";
import { SiteFooter } from "@/components/site-footer";
import MarketingHeader from "@/components/ui/marketing/MarketingHeader";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default MarketingLayout;
