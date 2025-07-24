import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building, Trophy, TrendingUp } from "lucide-react";

export const MarketAnalysis = () => {
  const segments = [
    {
      name: "Community Programs",
      description: "Youth leagues, local clubs",
      size: "200+ customers",
      painPoints: "Budget constraints, volunteer management",
      valueProposition: "Affordable, professional scoreboards with flexible pricing",
      priceRange: "$49-$99/month",
      icon: Users,
      color: "secondary"
    },
    {
      name: "Tournament Companies",
      description: "Mobile event operators",
      size: "50+ customers",
      painPoints: "Portability, venue flexibility",
      valueProposition: "Portable, no hardware investment, white-label options",
      priceRange: "$199-$399/month",
      icon: Trophy,
      color: "accent"
    },
    {
      name: "Venues",
      description: "Sports complexes, schools",
      size: "25+ customers",
      painPoints: "Hardware costs, maintenance",
      valueProposition: "Complete hardware replacement with advanced features",
      priceRange: "$299-$999/month",
      icon: Building,
      color: "warning"
    }
  ];

  const trends = [
    "Accelerated digital transformation in sports tech",
    "Increasing cost pressures on youth sports organizations",
    "Growing demand for enhanced spectator and parent engagement",
    "Rising acceptance of mobile-first, cloud-hosted solutions"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Market Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analysis of target segments and market opportunities in the $19.2B youth sports market
          </p>
        </div>

        <Tabs defaultValue="segments" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="segments">Target Segments</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="segments" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {segments.map((segment, index) => {
                const IconComponent = segment.icon;
                return (
                  <Card key={index} className={`hover:shadow-lg transition-all duration-300 border-l-4 ${
                    segment.color === 'secondary' ? 'border-l-secondary' :
                    segment.color === 'accent' ? 'border-l-accent' :
                    'border-l-warning'
                  }`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-full ${
                          segment.color === 'secondary' ? 'bg-secondary/10' :
                          segment.color === 'accent' ? 'bg-accent/10' :
                          'bg-warning/10'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            segment.color === 'secondary' ? 'text-secondary' :
                            segment.color === 'accent' ? 'text-accent' :
                            'text-warning'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{segment.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{segment.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{segment.size}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Pain Points:</h4>
                        <p className="text-sm text-muted-foreground">{segment.painPoints}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Value Proposition:</h4>
                        <p className="text-sm text-muted-foreground">{segment.valueProposition}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Pricing Range:</h4>
                        <Badge className={`${
                          segment.color === 'secondary' ? 'bg-secondary text-secondary-foreground' :
                          segment.color === 'accent' ? 'bg-accent text-accent-foreground' :
                          'bg-warning text-warning-foreground'
                        }`}>{segment.priceRange}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Total Addressable Market</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">275</div>
                    <p className="text-muted-foreground">Total Target Customers</p>
                    <p className="text-sm text-muted-foreground mt-1">Across all segments</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-secondary mb-2">$19.2B</div>
                    <p className="text-muted-foreground">Youth Sports Market</p>
                    <p className="text-sm text-muted-foreground mt-1">45+ million participants</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">$31B+</div>
                    <p className="text-muted-foreground">Sports Technology Market</p>
                    <p className="text-sm text-muted-foreground mt-1">Rapid digital adoption</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Market Trends & Timing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trends.map((trend, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground">{trend}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
                <CardHeader>
                  <CardTitle className="text-lg">Market Timing Advantages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Post-pandemic digital acceleration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Hardware replacement cycle</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Mobile-first generation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Cost-conscious organizations</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-lg">Competitive Landscape</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Legacy hardware vendors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Limited software solutions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">High switching costs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Opportunity for disruption</span>
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