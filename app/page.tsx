"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Activity, Users } from "lucide-react"
import { TransactionForm } from "@/components/transaction-form"
import { PredictionResults } from "@/components/prediction-results"
import { ModelAnalytics } from "@/components/model-analytics"
import { DemoData } from "@/components/demo-data"

export default function FraudDetectionDashboard() {
  const [prediction, setPrediction] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePrediction = async (transactionData: any) => {
    setIsLoading(true)
    // Simulate API call to your ML model
    setTimeout(() => {
      const fraudScore = Math.random()
      const result = {
        fraudScore: fraudScore,
        riskLevel: fraudScore > 0.7 ? "HIGH" : fraudScore > 0.4 ? "MEDIUM" : "LOW",
        confidence: 0.85 + Math.random() * 0.1,
        factors: [
          { name: "Transaction Amount", impact: 0.3, description: "Unusually high amount for this user" },
          { name: "Time Pattern", impact: 0.2, description: "Transaction outside normal hours" },
          { name: "Location", impact: 0.15, description: "New location detected" },
          { name: "Frequency", impact: 0.1, description: "Multiple transactions in short period" },
        ],
        recommendation: fraudScore > 0.7 ? "BLOCK" : fraudScore > 0.4 ? "REVIEW" : "APPROVE",
      }
      setPrediction(result)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">FraudGuard AI</h1>
                <p className="text-sm text-muted-foreground">Mobile Money Fraud Detection for Uganda</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                <Activity className="w-3 h-3 mr-1" />
                Model Active
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Model v2.1</p>
                <p className="text-xs text-muted-foreground">Accuracy: 94.2%</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Transactions Today</p>
                  <p className="text-2xl font-bold text-foreground">12,847</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fraud Detected</p>
                  <p className="text-2xl font-bold text-red-400">23</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-400">12,824</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">8,432</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="predict" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="predict">Fraud Detection</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="demo">Demo Data</TabsTrigger>
            <TabsTrigger value="model">Model Info</TabsTrigger>
          </TabsList>

          <TabsContent value="predict" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Transaction Analysis</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Enter transaction details to analyze fraud risk
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionForm onSubmit={handlePrediction} isLoading={isLoading} />
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Prediction Results</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    AI-powered fraud detection analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PredictionResults prediction={prediction} isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <ModelAnalytics />
          </TabsContent>

          <TabsContent value="demo">
            <DemoData onSelectDemo={handlePrediction} />
          </TabsContent>

          <TabsContent value="model">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Model Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Details about the fraud detection model
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Model Version</p>
                    <p className="font-semibold text-foreground">v2.1.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Training Data</p>
                    <p className="font-semibold text-foreground">2.3M transactions</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="font-semibold text-green-400">94.2%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precision</p>
                    <p className="font-semibold text-blue-400">91.8%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recall</p>
                    <p className="font-semibold text-purple-400">89.5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">F1 Score</p>
                    <p className="font-semibold text-orange-400">90.6%</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Features Used</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Transaction Amount",
                      "Time of Day",
                      "Location",
                      "User History",
                      "Device Info",
                      "Network Provider",
                    ].map((feature) => (
                      <Badge key={feature} variant="secondary" className="bg-muted text-muted-foreground">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
