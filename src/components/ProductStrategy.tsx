import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Zap, Crown, Star, Users, BarChart3, Settings, Smartphone } from "lucide-react";

export const ProductStrategy = () => {
  const coreFeatures = [
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: "Real-time Scoreboard Updates",
      description: "Multi-sport compatibility with instant synchronization across all devices"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Reliable Timer & Penalty Tracking", 
      description: "Persistent timer with comprehensive penalty management system"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Dynamic Sponsor Advertising",
      description: "Automated rotation of sponsor content with revenue optimization"
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "QR Code Access",
      description: "Instant spectator access via mobile-optimized interfaces"
    },
    {
      icon: <Settings className="w-8 h-8 text-gray-600" />,
      title: "Management Dashboard",
      description: "User-friendly controls for league and venue administration"
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Roster Integration (Breakthrough)",
      description: "Player-level tracking with goals, assists, penalties tied to specific players"
    }
  ];

  const pricingTiers = [
    {
      name: "FREE",
      price: "$0",
      period: "/month",
      description: "Perfect for trying ClockSynk",
      popular: false,
      features: [
        "1 scoreboard",
        "Basic timer functionality", 
        "QR code spectator access",
        "ClockSynk advertising (revenue share)",
        "Community support",
        "Standard templates"
      ],
      buttonText: "Start Free",
      buttonVariant: "outline"
    },
    {
      name: "Starter",
      price: "$49", 
      period: "/month",
      description: "Perfect for single venue operations",
      popular: false,
      features: [
        "Up to 2 scoreboards",
        "Basic analytics",
        "QR code access", 
        "Email support",
        "Standard templates",
        "Basic sponsor management"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline"
    },
    {
      name: "Professional",
      price: "$149",
      period: "/month", 
      description: "Ideal for multi-venue leagues",
      popular: true,
      features: [
        "Up to 10 scoreboards",
        "Advanced analytics",
        "Custom branding",
        "Priority support", 
        "Tournament management",
        "Sponsor ad management",
        "Player performance tracking"
      ],
      buttonText: "Most Popular",
      buttonVariant: "default"
    },
    {
      name: "Enterprise",
      price: "$999",
      period: "/month",
      description: "For large organizations and tournaments", 
      popular: false,
      features: [
        "Unlimited scoreboards",
        "White-label solution",
        "API access",
        "Dedicated support",
        "Custom integrations", 
        "Advanced reporting",
        "Player performance data",
        "Custom development"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline"
    }
  ];

  const inAppPurchases = [
    {
      name: "Advanced Analytics Package",
      price: "$29/month",
      description: "Deep insights into game performance, player statistics, and trend analysis",
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />
    },
    {
      name: "Custom Branding Suite", 
      price: "$19/month",
      description: "Full white-label customization with your logos, colors, and branding",
      icon: <Star className="w-6 h-6 text-yellow-600" />
    },
    {
      name: "Tournament Management Tools",
      price: "$39/month", 
      description: "Advanced bracket management, scheduling, and multi-venue coordination",
      icon: <Crown className="w-6 h-6 text-purple-600" />
    },
    {
      name: "Player Performance Tracking",
      price: "$25/month",
      description: "Individual player statistics, development tracking, and recruiting insights", 
      icon: <Users className="w-6 h-6 text-green-600" />
    },
    {
      name: "API Access & Integrations",
      price: "$15/month",
      description: "Connect with existing systems, export data, and build custom integrations",
      icon: <Settings className="w-6 h-6 text-gray-600" />
    }
  ];

  const developmentPhases = [
    {
      phase: "Phase 1 (Months 1-6)",
      title: "MVP Foundation", 
      badge: "MVP Foundation",
      badgeColor: "bg-blue-100 text-blue-800",
      features: [
        "Professional scoreboards",
        "QR code spectator access", 
        "Roster integration system",
        "Sponsor advertising platform"
      ]
    },
    {
      phase: "Phase 2 (Months 7-18)",
      title: "Tournament Platform",
      badge: "Tournament Platform", 
      badgeColor: "bg-purple-100 text-purple-800",
      features: [
        "Tournament management",
        "Player performance data licensing",
        "Recruiter dashboard access", 
        "Cross-tournament analytics"
      ]
    },
    {
      phase: "Phase 3 (Months 18-36)",
      title: "AI Intelligence",
      badge: "AI Intelligence",
      badgeColor: "bg-orange-100 text-orange-800", 
      features: [
        "AI coaching agents",
        "Player development insights",
        "Predictive analytics",
        "Enterprise licensing"
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-6">
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

          <TabsContent value="features">
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-8">Phase 1: Core Features (Months 1-6)</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreFeatures.map((feature, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        {feature.icon}
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pricingTiers.map((tier, index) => (
                  <Card key={index} className={`relative h-full ${tier.popular ? 'border-primary border-2' : ''}`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                      <div className="text-3xl font-bold text-primary">
                        {tier.price}<span className="text-sm text-muted-foreground">{tier.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full" 
                        variant={tier.buttonVariant as "default" | "outline"}
                      >
                        {tier.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Premium In-App Purchases</CardTitle>
                  <p className="text-muted-foreground">
                    Additional revenue streams through premium add-ons available across all paid tiers
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inAppPurchases.map((purchase, index) => (
                      <Card key={index} className="border-dashed">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            {purchase.icon}
                            <div>
                              <h4 className="font-semibold text-sm">{purchase.name}</h4>
                              <p className="text-primary font-bold text-sm">{purchase.price}</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{purchase.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total In-App Purchase Revenue Potential</span>
                      <span className="text-primary font-bold text-lg">$135,000/year</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      18% of total revenue from premium add-ons across customer base
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="roadmap">
            <div className="grid md:grid-cols-3 gap-6">
              {developmentPhases.map((phase, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <Badge className={phase.badgeColor}>{phase.badge}</Badge>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

