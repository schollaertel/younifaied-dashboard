import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Target, Calendar } from "lucide-react";

export const FinancialModel = () => {
  const monthlyData = [
    { month: 1, customers: 8, revenue: 3000, costs: 2694, netIncome: 306, cashPosition: 16306 },
    { month: 2, customers: 18, revenue: 6750, costs: 2694, netIncome: 4056, cashPosition: 20362 },
    { month: 3, customers: 32, revenue: 12000, costs: 2694, netIncome: 9306, cashPosition: 29668 },
    { month: 4, customers: 50, revenue: 21250, costs: 2694, netIncome: 18556, cashPosition: 48224 },
    { month: 5, customers: 72, revenue: 32000, costs: 2694, netIncome: 29306, cashPosition: 77530 },
    { month: 6, customers: 98, revenue: 45250, costs: 2694, netIncome: 42556, cashPosition: 120086 },
  ];

  const revenueStreams = [
    { stream: "Subscription Revenue", year1: 450000, year2: 2100000, year3: 8500000 },
    { stream: "Data Licensing", year1: 150000, year2: 1200000, year3: 12000000 },
    { stream: "Advertising Revenue", year1: 85000, year2: 650000, year3: 3500000 },
    { stream: "In-App Purchases", year1: 135000, year2: 400000, year3: 2000000 },
    { stream: "Affiliate Commissions", year1: 50000, year2: 200000, year3: 1500000 }
  ];

  const startupCosts = [
    { category: "Development Advance", amount: 1500, description: "6 months payment to developer" },
    { category: "Technology Setup", amount: 500, description: "Hosting, licenses, tools" },
    { category: "Legal & Business Setup", amount: 1000, description: "LLC, contracts, compliance" },
    { category: "Initial Marketing Budget", amount: 3000, description: "First customer acquisition" },
    { category: "Business Insurance", amount: 400, description: "2 months prepaid coverage" },
    { category: "Equipment & Software", amount: 1000, description: "Computer, development tools" },
    { category: "Working Capital", amount: 8600, description: "3+ months runway buffer" },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Financial Model & Projections
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three-phase platform strategy with multiple revenue streams and exceptional unit economics
          </p>
        </div>

        <Tabs defaultValue="projections" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="projections">Revenue Projections</TabsTrigger>
            <TabsTrigger value="streams">Revenue Streams</TabsTrigger>
            <TabsTrigger value="costs">Startup Costs</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="projections">
            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Break-Even
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">Month 3</div>
                <p className="text-sm text-muted-foreground">Conservative timeline with multiple revenue streams</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  Year 1 ARR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-2">$735,000</div>
                <p className="text-sm text-muted-foreground">Multiple revenue streams</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-warning" />
                  Year 3 ARR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning mb-2">$25.5M</div>
                <p className="text-sm text-muted-foreground">Platform expansion with AI coaching</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  6-Month Revenue & Cash Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Month</th>
                        <th className="text-right p-2">Customers</th>
                        <th className="text-right p-2">Revenue</th>
                        <th className="text-right p-2">Costs</th>
                        <th className="text-right p-2">Net Income</th>
                        <th className="text-right p-2">Cash Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyData.map((data) => (
                        <tr key={data.month} className="border-b hover:bg-muted">
                          <td className="p-2 font-medium">{data.month}</td>
                          <td className="text-right p-2">{data.customers}</td>
                          <td className="text-right p-2 text-secondary font-medium">
                            ${data.revenue.toLocaleString()}
                          </td>
                          <td className="text-right p-2">${data.costs.toLocaleString()}</td>
                          <td className="text-right p-2 text-accent font-medium">
                            ${data.netIncome.toLocaleString()}
                          </td>
                          <td className="text-right p-2 text-primary font-medium">
                            ${data.cashPosition.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="streams">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Revenue Stream Evolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Revenue Stream</th>
                          <th className="text-right p-3">Year 1</th>
                          <th className="text-right p-3">Year 2</th>
                          <th className="text-right p-3">Year 3</th>
                          <th className="text-right p-3">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {revenueStreams.map((stream, index) => (
                          <tr key={index} className="border-b hover:bg-muted">
                            <td className="p-3 font-medium">{stream.stream}</td>
                            <td className="text-right p-3">${stream.year1.toLocaleString()}</td>
                            <td className="text-right p-3">${stream.year2.toLocaleString()}</td>
                            <td className="text-right p-3">${stream.year3.toLocaleString()}</td>
                            <td className="text-right p-3">
                              <Badge variant="secondary">
                                {Math.round(((stream.year3 - stream.year1) / stream.year1) * 100)}%
                              </Badge>
                            </td>
                          </tr>
                        ))}
                        <tr className="border-b-2 border-primary font-bold bg-primary/5">
                          <td className="p-3">Total ARR</td>
                          <td className="text-right p-3">$735,000</td>
                          <td className="text-right p-3">$4,150,000</td>
                          <td className="text-right p-3">$25,500,000</td>
                          <td className="text-right p-3">
                            <Badge variant="default">3,370%</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">In-App Purchase Revenue Breakdown</CardTitle>
                  <p className="text-sm text-muted-foreground">Premium add-ons generating $135,000 in Year 1 (18% of total revenue)</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Advanced Analytics Package</span>
                        <span className="text-accent font-bold">$35,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Custom Branding Suite</span>
                        <span className="text-accent font-bold">$28,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Tournament Management Tools</span>
                        <span className="text-accent font-bold">$32,000</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">Player Performance Tracking</span>
                        <span className="text-accent font-bold">$25,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">API Access & Integrations</span>
                        <span className="text-accent font-bold">$15,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <span className="font-bold text-primary">Total In-App Revenue</span>
                        <span className="text-primary font-bold text-lg">$135,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Startup Investment Breakdown</CardTitle>
                <p className="text-sm text-muted-foreground">Total initial investment: $16,000 for 6+ months runway</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {startupCosts.map((cost, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{cost.category}</div>
                        <div className="text-sm text-muted-foreground">{cost.description}</div>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        ${cost.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="font-bold text-primary">Total Investment Required</div>
                    <div className="text-xl font-bold text-primary">
                      ${startupCosts.reduce((sum, cost) => sum + cost.amount, 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Unit Economics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Customer Acquisition Cost (CAC)</span>
                    <Badge variant="secondary" className="text-lg">$48</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Lifetime Value (LTV)</span>
                    <Badge variant="secondary" className="text-lg">$6,970</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>LTV/CAC Ratio</span>
                    <Badge variant="secondary" className="text-lg">145.2x</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Payback Period</span>
                    <Badge variant="outline" className="text-lg">0.8 months</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gross Margin</span>
                    <Badge variant="outline" className="text-lg">96%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Growth Targets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Monthly Customer Acquisition</span>
                      <span className="font-bold">15 customers</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Monthly Churn Rate</span>
                      <span className="font-bold">&lt;1.5%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Customer Satisfaction</span>
                      <span className="font-bold">96%+</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Platform Uptime</span>
                      <span className="font-bold">99.9%</span>
                    </div>
                    <Progress value={99} className="h-2" />
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

