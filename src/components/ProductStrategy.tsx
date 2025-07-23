import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Clock, Megaphone, QrCode, Settings, Users, Plus } from "lucide-react";

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
      icon: Users,
      title: "Roster Integration (Breakthrough)",
      description: "Player-level tracking with goals, assists, penalties tied to specific players",
      color: "accent"
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      fields: "1 scoreboard (limited hours)",
      features: [
        "Basic scoreboard functionality",
        "ClockSynk affiliate advertising",
        "QR code spectator access",
        "Email support",
        "Standard templates"
      ],
      target: "Lead generation & sales pipeline",
      highlight: false
    },
    {
      name: "Starter",
      price: "$49",
      fields: "Up to 2 scoreboards",
      features: [
        "All Free features",
        "Remove ClockSynk branding",
        "Basic analytics",
        "Priority email support",
        "Custom team colors"
      ],
      target: "Single venue operations",
      highlight: false
    },
    {
      name: "Professional",
      price: "$149",
      fields: "Up to 10 scoreboards",
      features: [
        "All Starter features",
        "Advanced analytics",
        "Custom branding",
        "Tournament management",
        "Sponsor ad management",
        "Priority support",
        "Player performance data"
      ],
      target: "Multi-venue leagues",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "$999",
      fields: "Unlimited scoreboards",
      features: [
        "All Professional features",
        "White-label solution",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "Advanced reporting",
        "Data licensing opportunities"
      ],
      target: "Large organizations & tournaments",
      highlight: false
    }
  ];

  const addOns = [
    "Additional scoreboards ($15/week or $39/month)",
    "Advanced advertising slots ($19.99/month)",
    "Penalty tracking enhancements ($9.99/month)",
    "Professional appearance upgrades ($14.99/month)",
    "Custom integrations ($29.99/month)"
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

          <TabsContent value="features" className="space-y-8">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Phase 1: Core Features (Months 1-6)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="text-center p-6 rounded-lg bg-background border">
                        <div className={`inline-flex p-3 rounded-full mb-4 ${
                          feature.color === 'secondary' ? 'bg-secondary/10' :
                          feature.color === 'accent' ? 'bg-accent/10' :
                          feature.color === 'warning' ? 'bg-warning/10' :
                          'bg-primary/10'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            feature.color === 'secondary' ? 'text-secondary' :
                            feature.color === 'accent' ? 'text-accent' :
                            feature.color === 'warning' ? 'text-warning' :
                            'text-primary'
                          }`} />
                        </div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className={`relative ${
                  tier.highlight 
                    ? 'ring-2 ring-primary shadow-lg scale-105' 
                    : 'hover:shadow-md transition-shadow'
                }`}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {tier.price}{tier.name !== "Free" && <span className="text-sm text-muted-foreground">/month</span>}
                    </div>
                    <Badge variant="outline">{tier.fields}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium">Target: {tier.target}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Plus className="w-6 h-6 text-primary" />
                  In-App Purchase Add-Ons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addOns.map((addon, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{addon}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Free Tier Strategy</h4>
                  <p className="text-sm text-muted-foreground">
                    Free users see ClockSynk affiliate advertising, generating leads for our sales team to convert to custom sponsor ads. 
                    This creates a pipeline from every signup while providing value to users.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
                <CardHeader>
                  <CardTitle className="text-lg">Phase 1: MVP Foundation</CardTitle>
                  <Badge variant="secondary">Months 1-6</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Professional scoreboard platform</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Real-time sync & QR access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Basic roster integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Affiliate advertising system</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-lg">Phase 2: Tournament Platform</CardTitle>
                  <Badge variant="outline">Months 7-18</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Tournament management system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Player performance data collection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Recruiting data licensing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Advanced analytics dashboard</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30">
                <CardHeader>
                  <CardTitle className="text-lg">Phase 3: AI Intelligence</CardTitle>
                  <Badge variant="outline">Months 18-36</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">AI coaching recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Player development tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Predictive analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm">Strategic acquisition readiness</span>
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
