import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { MarketAnalysis } from "@/components/MarketAnalysis";
import { ProductStrategy } from "@/components/ProductStrategy";
import { FinancialModel } from "@/components/FinancialModel";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="executive-summary">
        <ExecutiveSummary />
      </div>
      <div id="market-analysis">
        <MarketAnalysis />
      </div>
      <div id="product-strategy">
        <ProductStrategy />
      </div>
      <div id="financial-model">
        <FinancialModel />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
