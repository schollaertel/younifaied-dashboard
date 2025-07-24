import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Target, Calendar } from "lucide-react";

export const FinancialModel = () => {
  const monthlyData = [
    { month: 1, customers: 8, revenue: 3000, costs: 2694, netIncome: 306, cash: 16306 },
    { month: 2, customers: 18, revenue: 6750, costs: 2694, netIncome: 4056, cash: 20362 },
    { month: 3, customers: 32, revenue: 12000, costs: 2694, netIncome: 9306, cash: 29668 },
    { month: 4, customers: 50, revenue: 21250, costs: 2694, netIncome: 18556, cash: 48224 },
    { month: 5, customers: 72, revenue: 32000, costs: 2694, netIncome: 29306, cash: 77530 },
    { month: 6, customers: 98, revenue: 45250, costs: 2694, netIncome: 42556, cash: 120086 },
  ];

  const revenueStreams = [
    { stream: "Subscription Revenue", year1: 450000, year2: 2100000, year3: 8500000, color: "primary" },
    { stream: "Data Licensing", year1: 150000, year2: 1200000, year3: 12000000, color: "secondary" },
    { stream: "Advertising Revenue", year1: 85000, year2: 650000, year3: 3500000, color: "accent" },
    { stream: "Affiliate Commissions", year1: 50000, year2: 200000, year3: 1500000, color: "warning" },
  ];

  const startupCosts = [
    { category: "Development Advance", amount: 1500, description: "6 months part-time developer" },
    { category: "Technology Setup", amount: 500, description: "Hosting, licenses" },
    { category: "Legal & Business Setup", amount: 1000, description: "LLC, contracts, IP" },
    { category: "Initial Marketing Budget", amount: 3000, description: "First 2 months ad spend" },
    { category: "Business Insurance", amount: 400, description: "2 months prepaid" },
    { category: "Equipment & Software", amount: 1000, description: "Computer, licenses" },
    { category: "Working Capital", amount: 8600, description: "3+ months runway" },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
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

          <TabsContent value="projections" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
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

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
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

              <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30">
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
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">6-Month Revenue & Cash Flow</CardTitle>
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
                        <tr key={data.month} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{data.month}</td>
                          <td className="text-right p-2">{data.customers}</td>
                          <td className="text-right p-2 text-secondary font-medium">
                            ${data.revenue.toLocaleString()}
                          </td>
                          <td className="text-right p-2">${data.costs.toLocaleString()}</td>
                          <td className={`text-right p-2 font-medium ${data.netIncome >= 0 ? 'text-secondary' : 'text-destructive'}`}>
                            ${data.netIncome.toLocaleString()}
                          </td>
                          <td className="text-right p-2 text-accent font-medium">
                            ${data.cash.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="streams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Revenue Stream Evolution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
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
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{stream.stream}</td>
                          <td className="text-right p-3">${stream.year1.toLocaleString()}</td>
                          <td className="text-right p-3">${stream.year2.toLocaleString()}</td>
                          <td className="text-right p-3 font-bold">${stream.year3.toLocaleString()}</td>
                          <td className="text-right p-3">
                            <Badge className={`bg-${stream.color}`}>
                              {Math.round(((stream.year3 - stream.year1) / stream.year1) * 100)}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 font-bold">
                        <td className="p-3">Total ARR</td>
                        <td className="text-right p-3">$735,000</td>
                        <td className="text-right p-3">$4,150,000</td>
                        <td className="text-right p-3">$25,500,000</td>
                        <td className="text-right p-3">
                          <Badge className="bg-primary">3,370%</Badge>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-lg">Phase 1: Foundation (Year 1)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subscription Revenue</span>
                    <Badge variant="secondary">61%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Licensing</span>
                    <Badge variant="secondary">20%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Advertising</span>
                    <Badge variant="secondary">12%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Affiliates</span>
                    <Badge variant="secondary">7%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30">
                <CardHeader>
                  <CardTitle className="text-lg">Phase 3: Platform (Year 3)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Data Licensing</span>
                    <Badge className="bg-warning">47%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Subscription Revenue</span>
                    <Badge className="bg-warning">33%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Advertising</span>
                    <Badge className="bg-warning">14%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Affiliates</span>
                    <Badge className="bg-warning">6%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-primary" />
                  Startup Costs Breakdown ($16K Budget)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {startupCosts.map((cost, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-primary">{cost.category}</h4>
                        <Badge variant="outline">${cost.amount.toLocaleString()}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{cost.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Startup Investment:</span>
                    <span className="text-2xl font-bold text-primary">$16,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/30">
              <CardHeader>
                <CardTitle className="text-xl">Monthly Operating Costs (Owner-Operated)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Technology & Infrastructure</span>
                    <Badge variant="secondary">$347/month</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Marketing & Sales</span>
                    <Badge variant="secondary">$1,647/month</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Operations & Administration</span>
                    <Badge variant="secondary">$650/month</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Support</span>
                    <Badge variant="secondary">$50/month</Badge>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Monthly Operating Costs:</span>
                    <Badge className="bg-primary text-primary-foreground">$2,694/month</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    84% reduction from original plan through owner-operated model
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
                <CardHeader>
                  <CardTitle className="text-xl">Unit Economics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Customer Acquisition Cost (CAC)</span>
                    <Badge variant="secondary">$48</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Lifetime Value (LTV)</span>
                    <Badge variant="secondary">$6,970</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>LTV/CAC Ratio</span>
                    <Badge className="bg-secondary text-secondary-foreground">145.2x</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Payback Period</span>
                    <Badge variant="outline">0.8 months</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gross Margin</span>
                    <Badge variant="outline">96%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-xl">Growth Targets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Monthly Customer Acquisition</span>
                      <span className="text-sm font-medium">15 customers</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Monthly Churn Rate</span>
                      <span className="text-sm font-medium">{'<'}1.5%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Customer Satisfaction</span>
                      <span className="text-sm font-medium">96%+</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Platform Uptime</span>
                      <span className="text-sm font-medium">99.9%</span>
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