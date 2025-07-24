import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Clock, Megaphone, QrCode, Settings, Plus } from "lucide-react";

export const ProductStrategy = () => {
  const features = [
    {
      icon: Monitor,
      title: "Real-time Scoreboard Updates",
      description: "Multi-sport compatibility with instant synchronization across all devices",
      color: "secondary"
    },
    {
      icon: Clock,
      title: "Reliable Timer & Penalty Tracking",
      description: "Persistent timer with comprehensive penalty management system",
      color: "accent"
    },
    {
      icon: Megaphone,
      title: "Dynamic Sponsor Advertising",
      description: "Automated rotation of sponsor content with revenue optimization",
      color: "warning"
    },
    {
      icon: QrCode,
      title: "QR Code Access",
      description: "Instant spectator access via mobile-optimized interfaces",
      color: "primary"
    },
    {
      icon: Settings,
      title: "Management Dashboard",
      description: "User-friendly controls for league and venue administration",
      color: "secondary"
    },
    {
      icon: Plus,
      title: "Roster Integration (Breakthrough)",
      description: "Player-level tracking with goals, assists, penalties tied to specific players",
      color: "warning"
    }
  ];

  const pricingTiers = [
    {
      name: "Basic",
      price: "$49",
      period: "per month",
      description: "Perfect for single venue operations",
      features: [
        "Up to 2 scoreboards",
        "Basic analytics",
        "QR code access",
        "Email support",
        "Standard templates"
      ],
      color: "secondary",
      popular: false
    },
    {
      name: "Professional",
      price: "$149",
      period: "per month",
      description: "Ideal for multi-venue leagues",
      features: [
        "Up to 10 scoreboards",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
        "Tournament management",
        "Sponsor ad management"
      ],
      color: "primary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$999",
      period: "per month",
      description: "For large organizations and tournaments",
      features: [
        "Unlimited scoreboards",
        "White-label solution",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "Advanced reporting",
        "Player performance data"
      ],
      color: "accent",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Product Strategy & Roadmap
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three-phase evolution from professional scoreboards to comprehensive sports intelligence platform
          </p>
        </div>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features">Core Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Strategy</TabsTrigger>
            <TabsTrigger value="roadmap">Development Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Phase 1: Core Features (Months 1-6)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <Card key={index} className={`border-l-4 border-l-${feature.color} hover:shadow-lg transition-all duration-300`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${feature.color}/10 rounded-lg`}>
                              <IconComponent className={`w-6 h-6 text-${feature.color}`} />
                            </div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className={`relative ${tier.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''} hover:shadow-lg transition-all duration-300`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl text-primary">{tier.name}</CardTitle>
                    <div className="text-4xl font-bold text-foreground">
                      {tier.price}
                      <span className="text-lg font-normal text-muted-foreground">/{tier.period}</span>
                    </div>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className={`w-2 h-2 bg-${tier.color} rounded-full`}></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-lg">Phase 1 (Months 1-6)</CardTitle>
                  <Badge variant="outline" className="border-primary text-primary">MVP Foundation</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Professional scoreboards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">QR code spectator access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Roster integration system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Sponsor advertising platform</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-lg">Phase 2 (Months 7-18)</CardTitle>
                  <Badge variant="outline" className="border-accent text-accent">Tournament Platform</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Tournament management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Player performance data licensing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Recruiter dashboard access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Cross-tournament analytics</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30">
                <CardHeader>
                  <CardTitle className="text-lg">Phase 3 (Months 18-36)</CardTitle>
                  <Badge variant="outline" className="border-warning text-warning">AI Intelligence</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">AI coaching agents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Player development insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Predictive analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Enterprise licensing</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
