import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Mail, Globe, Award } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/lovable-uploads/cae00e2a-9dc7-48fd-aa35-446f8744436d.png" 
                alt="ClockSync Logo" 
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold">ClockSync</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Empowering youth sports communities with innovative, scalable scoreboard technology 
              that enhances the game experience for all stakeholders.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@clocksync.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">www.clocksync.com</span>
              </div>
            </div>
          </div>

          {/* Key Messages */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Key Messages
            </h3>
            <div className="space-y-4">
              <Card className="bg-white/10 border-white/20 p-4">
                <p className="text-sm font-medium">"Real-time sports timing solutions"</p>
              </Card>
              <Card className="bg-white/10 border-white/20 p-4">
                <p className="text-sm font-medium">"Synchronize your game, elevate your event"</p>
              </Card>
              <Card className="bg-white/10 border-white/20 p-4">
                <p className="text-sm font-medium">"Professional timing technology for every sport"</p>
              </Card>
              <Card className="bg-white/10 border-white/20 p-4">
                <p className="text-sm font-medium">"From scorekeeper to spectator - everyone stays in sync"</p>
              </Card>
            </div>
          </div>

          {/* Success Metrics */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Success Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">Month 2</div>
                <p className="text-xs text-primary-foreground/80">Break-even</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">$26.4K</div>
                <p className="text-xs text-primary-foreground/80">MRR Month 6</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">{'<'}2%</div>
                <p className="text-xs text-primary-foreground/80">Churn Rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">99.9%</div>
                <p className="text-xs text-primary-foreground/80">Uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Personality */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <h3 className="text-lg font-bold mb-4 text-center">Brand Personality</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              Professional
            </Badge>
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
              Innovative
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              Reliable
            </Badge>
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
              User-Friendly
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              Sports-Focused
            </Badge>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-primary-foreground/20">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 ClockSync. All rights reserved. Interactive Business Plan 2025.
          </p>
        </div>
      </div>
    </footer>
  );
};