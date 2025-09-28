"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, CheckCircle, Eye, Shield, TrendingUp, Zap } from "lucide-react"

interface PredictionResultsProps {
  prediction: any
  isLoading: boolean
}

export function PredictionResults({ prediction, isLoading }: PredictionResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Analyzing transaction patterns...</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </div>
    )
  }

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Shield className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Ready for Analysis</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Enter transaction details in the form to get AI-powered fraud detection results
        </p>
      </div>
    )
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "HIGH":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "LOW":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      default:
        return "text-muted-foreground bg-muted border-border"
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "BLOCK":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      case "REVIEW":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      case "APPROVE":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      default:
        return "text-muted-foreground bg-muted border-border"
    }
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "BLOCK":
        return <AlertTriangle className="w-4 h-4" />
      case "REVIEW":
        return <Eye className="w-4 h-4" />
      case "APPROVE":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Risk Score */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Fraud Risk Score</h3>
            <Badge className={getRiskColor(prediction.riskLevel)}>{prediction.riskLevel} RISK</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-foreground">{Math.round(prediction.fraudScore * 100)}%</span>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Confidence</p>
                <p className="text-lg font-semibold text-foreground">{Math.round(prediction.confidence * 100)}%</p>
              </div>
            </div>

            <Progress value={prediction.fraudScore * 100} className="h-3" />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Safe</span>
              <span>Suspicious</span>
              <span>Fraudulent</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${getRecommendationColor(prediction.recommendation)}`}>
              {getRecommendationIcon(prediction.recommendation)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Recommendation</h3>
              <Badge className={getRecommendationColor(prediction.recommendation)}>{prediction.recommendation}</Badge>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {prediction.recommendation === "BLOCK" &&
              "This transaction shows high fraud indicators and should be blocked immediately."}
            {prediction.recommendation === "REVIEW" &&
              "This transaction requires manual review due to moderate risk factors."}
            {prediction.recommendation === "APPROVE" &&
              "This transaction appears legitimate and can be processed normally."}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Risk Factors Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {prediction.factors.map((factor: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{factor.name}</span>
                <span className="text-sm text-muted-foreground">{Math.round(factor.impact * 100)}% impact</span>
              </div>
              <Progress value={factor.impact * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">{factor.description}</p>
              {index < prediction.factors.length - 1 && <Separator className="bg-border" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-muted/50 border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Quick Actions</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-card rounded border border-border">
              <p className="font-medium text-foreground">Transaction ID</p>
              <p className="text-muted-foreground">TXN-{Date.now().toString().slice(-8)}</p>
            </div>
            <div className="p-2 bg-card rounded border border-border">
              <p className="font-medium text-foreground">Analysis Time</p>
              <p className="text-muted-foreground">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
