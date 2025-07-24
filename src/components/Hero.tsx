import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Zap, Users, TrendingUp } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-accent to-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/cae00e2a-9dc7-48fd-aa35-446f8744436d.png" 
              alt="ClockSync Logo" 
              className="h-20 w-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Interactive Business Plan
            <span className="block text-secondary">2025</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Building the Future of Youth Sports Intelligence - From Scoreboards to AI Coaching
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => {
                const element = document.getElementById('executive-summary');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold shadow-lg"
            >
              Explore Business Plan
            </Button>
            <Button 
              size="lg"
              onClick={() => {
                const element = document.getElementById('financial-model');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white/20 text-white border-2 border-white/60 hover:bg-white hover:text-primary text-lg px-8 py-4 h-auto font-semibold backdrop-blur-sm transition-all duration-300"
            >
              View Financial Model
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-secondary rounded-full">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">$735,000</h3>
            <p className="text-white/80">Year 1 ARR Target</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-warning rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Month 3</h3>
            <p className="text-white/80">Break-Even Point</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent rounded-full">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">145.2x</h3>
            <p className="text-white/80">LTV/CAC Ratio</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-secondary rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">50,000+</h3>
            <p className="text-white/80">Target Facilities</p>
          </Card>
        </div>
      </div>
    </section>
  );
};
