"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Target, Zap, Clock, AlertTriangle, CheckCircle, Eye } from "lucide-react"

export function ModelAnalytics() {
  // Sample data for charts
  const performanceData = [
    { month: "Jan", accuracy: 92.1, precision: 89.5, recall: 87.2, f1Score: 88.3 },
    { month: "Feb", accuracy: 93.2, precision: 90.1, recall: 88.7, f1Score: 89.4 },
    { month: "Mar", accuracy: 94.2, precision: 91.8, recall: 89.5, f1Score: 90.6 },
    { month: "Apr", accuracy: 93.8, precision: 91.2, recall: 88.9, f1Score: 90.0 },
    { month: "May", accuracy: 94.5, precision: 92.1, recall: 90.2, f1Score: 91.1 },
    { month: "Jun", accuracy: 94.2, precision: 91.8, recall: 89.5, f1Score: 90.6 },
  ]

  const transactionVolumeData = [
    { day: "Mon", total: 15420, fraud: 23, legitimate: 15397 },
    { day: "Tue", total: 18230, fraud: 31, legitimate: 18199 },
    { day: "Wed", total: 16890, fraud: 28, legitimate: 16862 },
    { day: "Thu", total: 19450, fraud: 35, legitimate: 19415 },
    { day: "Fri", total: 21200, fraud: 42, legitimate: 21158 },
    { day: "Sat", total: 12800, fraud: 18, legitimate: 12782 },
    { day: "Sun", total: 10900, fraud: 15, legitimate: 10885 },
  ]

  const riskDistributionData = [
    { name: "Low Risk", value: 78.5, color: "#22c55e" },
    { name: "Medium Risk", value: 18.2, color: "#eab308" },
    { name: "High Risk", value: 3.3, color: "#ef4444" },
  ]

  const networkProviderData = [
    { provider: "MTN Uganda", transactions: 45200, fraudRate: 0.18 },
    { provider: "Airtel Uganda", transactions: 32100, fraudRate: 0.22 },
    { provider: "Africell Uganda", transactions: 18900, fraudRate: 0.15 },
    { provider: "Telecom Uganda", transactions: 8400, fraudRate: 0.12 },
  ]

  const hourlyPatternData = [
    { hour: "00", transactions: 120, fraudRate: 0.8 },
    { hour: "02", transactions: 80, fraudRate: 1.2 },
    { hour: "04", transactions: 45, fraudRate: 2.1 },
    { hour: "06", transactions: 890, fraudRate: 0.3 },
    { hour: "08", transactions: 1450, fraudRate: 0.2 },
    { hour: "10", transactions: 1820, fraudRate: 0.15 },
    { hour: "12", transactions: 2100, fraudRate: 0.18 },
    { hour: "14", transactions: 1950, fraudRate: 0.22 },
    { hour: "16", transactions: 1780, fraudRate: 0.19 },
    { hour: "18", transactions: 1650, fraudRate: 0.25 },
    { hour: "20", transactions: 1200, fraudRate: 0.35 },
    { hour: "22", transactions: 650, fraudRate: 0.45 },
  ]

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Model Accuracy</p>
                <p className="text-2xl font-bold text-green-400">94.2%</p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
            <Progress value={94.2} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Precision</p>
                <p className="text-2xl font-bold text-blue-400">91.8%</p>
              </div>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <Progress value={91.8} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recall</p>
                <p className="text-2xl font-bold text-purple-400">89.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
            <Progress value={89.5} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-orange-400">1.2s</p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Sub-second analysis</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="volume">Transaction Volume</TabsTrigger>
          <TabsTrigger value="patterns">Fraud Patterns</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Model Performance Over Time</CardTitle>
              <CardDescription className="text-muted-foreground">
                Key metrics tracking model accuracy and reliability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="precision" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="recall" stroke="#a855f7" strokeWidth={2} />
                  <Line type="monotone" dataKey="f1Score" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volume" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Daily Transaction Volume</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Transaction volume and fraud detection rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={transactionVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="legitimate" fill="#22c55e" />
                    <Bar dataKey="fraud" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Risk Distribution</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Distribution of transactions by risk level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Hourly Fraud Patterns</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fraud rate patterns throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hourlyPatternData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="fraudRate" stroke="#ef4444" fill="#ef444420" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Network Provider Analysis</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Fraud rates by mobile network provider
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {networkProviderData.map((provider) => (
                  <div key={provider.provider} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{provider.provider}</span>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        {provider.fraudRate}% fraud rate
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{provider.transactions.toLocaleString()} transactions</span>
                      <span>{Math.round(provider.transactions * (provider.fraudRate / 100))} fraud cases</span>
                    </div>
                    <Progress value={provider.fraudRate * 20} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Key Insights</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Important patterns and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-400">High Risk Hours</p>
                    <p className="text-xs text-muted-foreground">
                      Fraud rates spike between 10 PM - 6 AM. Consider additional verification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <Eye className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-400">Review Needed</p>
                    <p className="text-xs text-muted-foreground">
                      Airtel Uganda shows higher fraud rates. Enhanced monitoring recommended.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-400">Model Performance</p>
                    <p className="text-xs text-muted-foreground">
                      Accuracy improved 2.1% this quarter. Model is performing excellently.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
