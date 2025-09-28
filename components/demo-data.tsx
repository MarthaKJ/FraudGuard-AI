"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Play, AlertTriangle, CheckCircle, Eye } from "lucide-react"

interface DemoDataProps {
  onSelectDemo: (data: any) => void
}

export function DemoData({ onSelectDemo }: DemoDataProps) {
  const demoTransactions = [
    {
      id: 1,
      title: "Legitimate Payment Transaction",
      description: "Regular payment transaction with balanced amounts",
      riskLevel: "LOW",
      expectedResult: "APPROVE",
      data: {
        step: "1",
        type: "PAYMENT",
        amount: "9839.64",
        nameOrig: "C1231006815",
        oldbalanceOrg: "170136.0",
        newbalanceOrig: "160296.36",
        nameDest: "M1979787155",
        oldbalanceDest: "0.0",
        newbalanceDest: "0.0",
      },
    },
    {
      id: 2,
      title: "Suspicious Transfer - Zero Balance",
      description: "Transfer with suspicious zero balance changes",
      riskLevel: "HIGH",
      expectedResult: "BLOCK",
      data: {
        step: "2",
        type: "TRANSFER",
        amount: "181.00",
        nameOrig: "C1305486145",
        oldbalanceOrg: "181.0",
        newbalanceOrig: "0.00",
        nameDest: "C553264065",
        oldbalanceDest: "0.0",
        newbalanceDest: "0.0",
      },
    },
    {
      id: 3,
      title: "Large Cash Out Transaction",
      description: "High-value cash out with balance inconsistencies",
      riskLevel: "HIGH",
      expectedResult: "BLOCK",
      data: {
        step: "3",
        type: "CASH_OUT",
        amount: "181.00",
        nameOrig: "C840083671",
        oldbalanceOrg: "181.0",
        newbalanceOrig: "0.00",
        nameDest: "C38997010",
        oldbalanceDest: "21182.0",
        newbalanceDest: "0.0",
      },
    },
    {
      id: 4,
      title: "Regular Payment - Small Amount",
      description: "Normal payment transaction with proper balance tracking",
      riskLevel: "LOW",
      expectedResult: "APPROVE",
      data: {
        step: "1",
        type: "PAYMENT",
        amount: "1864.28",
        nameOrig: "C1666544295",
        oldbalanceOrg: "21249.0",
        newbalanceOrig: "19384.72",
        nameDest: "M2044282225",
        oldbalanceDest: "0.0",
        newbalanceDest: "0.0",
      },
    },
    {
      id: 5,
      title: "Medium Risk Payment",
      description: "Payment with moderate risk indicators",
      riskLevel: "MEDIUM",
      expectedResult: "REVIEW",
      data: {
        step: "4",
        type: "PAYMENT",
        amount: "11668.14",
        nameOrig: "C2048537720",
        oldbalanceOrg: "41554.0",
        newbalanceOrig: "29885.86",
        nameDest: "M1230701703",
        oldbalanceDest: "0.0",
        newbalanceDest: "0.0",
      },
    },
    {
      id: 6,
      title: "Debit Transaction",
      description: "Account debit with proper balance changes",
      riskLevel: "LOW",
      expectedResult: "APPROVE",
      data: {
        step: "5",
        type: "DEBIT",
        amount: "5000.00",
        nameOrig: "C1234567890",
        oldbalanceOrg: "15000.0",
        newbalanceOrig: "10000.0",
        nameDest: "C9876543210",
        oldbalanceDest: "5000.0",
        newbalanceDest: "10000.0",
      },
    },
  ]

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

  const getResultIcon = (result: string) => {
    switch (result) {
      case "BLOCK":
        return <AlertTriangle className="w-4 h-4" />
      case "REVIEW":
        return <Eye className="w-4 h-4" />
      case "APPROVE":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case "BLOCK":
        return "text-red-400"
      case "REVIEW":
        return "text-yellow-400"
      case "APPROVE":
        return "text-green-400"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Demo Transaction Scenarios</CardTitle>
          <CardDescription className="text-muted-foreground">
            Test your fraud detection model with realistic financial transaction data. Click "Test Transaction" to
            analyze any scenario based on your dataset structure.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {demoTransactions.map((transaction) => (
          <Card key={transaction.id} className="bg-card border-border hover:bg-accent/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base text-foreground">{transaction.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{transaction.description}</CardDescription>
                </div>
                <Badge className={getRiskColor(transaction.riskLevel)}>{transaction.riskLevel}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Transaction Details Preview */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium text-foreground">
                    {Number.parseFloat(transaction.data.amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="text-foreground">{transaction.data.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Step:</span>
                  <span className="text-foreground">{transaction.data.step}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Originator:</span>
                  <span className="text-foreground font-mono text-xs">{transaction.data.nameOrig}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destination:</span>
                  <span className="text-foreground font-mono text-xs">{transaction.data.nameDest}</span>
                </div>
              </div>

              <Separator className="bg-border" />

              {/* Expected Result */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Expected Result:</span>
                  <div className={`flex items-center gap-1 ${getResultColor(transaction.expectedResult)}`}>
                    {getResultIcon(transaction.expectedResult)}
                    <span className="text-sm font-medium">{transaction.expectedResult}</span>
                  </div>
                </div>
                <Button
                  onClick={() => onSelectDemo(transaction.data)}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Test Transaction
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage Instructions */}
      <Card className="bg-muted/50 border-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">How to Use Demo Data</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>1. Browse the transaction scenarios above to understand different risk patterns</p>
            <p>2. Click "Test Transaction" on any scenario to automatically fill the form</p>
            <p>3. The model will analyze the transaction and provide fraud risk assessment</p>
            <p>4. Compare the actual results with the expected outcomes to evaluate model performance</p>
          </div>
          <div className="mt-4 p-3 bg-card rounded border border-border">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Note:</strong> These scenarios are based on your actual dataset
              structure with columns like step, type, amount, nameOrig, oldbalanceOrg, newbalanceOrig, nameDest,
              oldbalanceDest, and newbalanceDest. The examples include various transaction types (PAYMENT, TRANSFER,
              CASH_OUT, DEBIT) with different risk indicators.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
