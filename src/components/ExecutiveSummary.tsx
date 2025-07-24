import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, DollarSign, Users, Lightbulb } from "lucide-react";

export const ExecutiveSummary = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Executive Summary
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ClockSync provides cloud-hosted, professional-grade digital scoreboard solutions 
            tailored for youth sports venues, leagues, and tournament operators.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-primary flex items-center justify-center gap-3">
              <Target className="w-8 h-8" />
              Mission Statement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-xl text-center text-foreground font-medium italic">
              "Transforming youth sports through intelligent data collection, starting with professional 
              scoreboards and evolving into the comprehensive platform that connects tournaments, 
              recruiting, and coaching intelligence."
            </blockquote>
          </CardContent>
        </Card>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-secondary">
            <CardHeader className="pb-3">
              <DollarSign className="w-8 h-8 text-secondary mb-2" />
              <CardTitle className="text-lg">Phase 1: MVP Foundation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Professional scoreboards with 90% cost savings, establishing venue relationships and data collection.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <Lightbulb className="w-8 h-8 text-accent mb-2" />
              <CardTitle className="text-lg">Phase 2: Tournament Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Player performance data licensing to recruiting companies, creating network effects and premium revenue.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-warning">
            <CardHeader className="pb-3">
              <Users className="w-8 h-8 text-warning mb-2" />
              <CardTitle className="text-lg">Phase 3: AI Coaching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI agents trained on comprehensive game data providing personalized coaching insights and development tracking.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <Target className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-lg">Roster Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Breakthrough feature: Player-level tracking with goals, assists, penalties tied to specific players across tournaments.</p>
            </CardContent>
          </Card>
        </div>

        {/* Market Opportunity */}
        <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-primary text-center mb-4">Market Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">$40B+</div>
                <p className="text-muted-foreground">Youth Sports Market</p>
                <Badge variant="secondary" className="mt-2">45M+ Participants</Badge>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">$2B+</div>
                <p className="text-muted-foreground">Sports Recruiting Data</p>
                <Badge variant="outline" className="mt-2 border-accent text-accent">15% CAGR</Badge>
              </div>
              <div>
                <div className="text-3xl font-bold text-warning mb-2">$3.5B</div>
                <p className="text-muted-foreground">AI Sports Analytics</p>
                <Badge variant="outline" className="mt-2 border-warning text-warning">22% CAGR</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
