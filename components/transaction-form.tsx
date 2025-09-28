"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Send } from "lucide-react"

interface TransactionFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function TransactionForm({ onSubmit, isLoading }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    step: "",
    type: "",
    amount: "",
    nameOrig: "",
    oldbalanceOrg: "",
    newbalanceOrig: "",
    nameDest: "",
    oldbalanceDest: "",
    newbalanceDest: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const transactionTypes = ["PAYMENT", "TRANSFER", "CASH_OUT", "CASH_IN", "DEBIT"]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Step and Transaction Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="step" className="text-sm font-medium text-foreground">
            Step (Time Unit)
          </Label>
          <Input
            id="step"
            type="number"
            placeholder="e.g., 1"
            value={formData.step}
            onChange={(e) => handleInputChange("step", e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium text-foreground">
            Transaction Type
          </Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue placeholder="Select transaction type" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {transactionTypes.map((type) => (
                <SelectItem key={type} value={type} className="text-popover-foreground hover:bg-accent">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transaction Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-sm font-medium text-foreground">
          Transaction Amount
        </Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="e.g., 9839.64"
          value={formData.amount}
          onChange={(e) => handleInputChange("amount", e.target.value)}
          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          required
        />
      </div>

      {/* Originator Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
          Originator (Sender) Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nameOrig" className="text-sm font-medium text-foreground">
              Originator ID
            </Label>
            <Input
              id="nameOrig"
              placeholder="e.g., C1231006815"
              value={formData.nameOrig}
              onChange={(e) => handleInputChange("nameOrig", e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="oldbalanceOrg" className="text-sm font-medium text-foreground">
              Old Balance
            </Label>
            <Input
              id="oldbalanceOrg"
              type="number"
              step="0.01"
              placeholder="e.g., 170136.0"
              value={formData.oldbalanceOrg}
              onChange={(e) => handleInputChange("oldbalanceOrg", e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newbalanceOrig" className="text-sm font-medium text-foreground">
              New Balance
            </Label>
            <Input
              id="newbalanceOrig"
              type="number"
              step="0.01"
              placeholder="e.g., 160296.36"
              value={formData.newbalanceOrig}
              onChange={(e) => handleInputChange("newbalanceOrig", e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
        </div>
      </div>

      {/* Destination Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
          Destination (Receiver) Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nameDest" className="text-sm font-medium text-foreground">
              Destination ID
            </Label>
            <Input
              id="nameDest"
              placeholder="e.g., M1979787155"
              value={formData.nameDest}
              onChange={(e) => handleInputChange("nameDest", e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="oldbalanceDest" className="text-sm font-medium text-foreground">
              Old Balance
            </Label>
            <Input
              id="oldbalanceDest"
              type="number"
              step="0.01"
              placeholder="e.g., 0.0"
              value={formData.oldbalanceDest}
              onChange={(e) => handleInputChange("oldbalanceDest", e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newbalanceDest" className="text-sm font-medium text-foreground">
              New Balance
            </Label>
            <Input
              id="newbalanceDest"
              type="number"
              step="0.01"
              placeholder="e.g., 0.0"
              value={formData.newbalanceDest}
              onChange={(e) => handleInputChange("newbalanceDest", e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Card className="bg-muted/50 border-border">
        <CardContent className="p-4">
          <Button
            type="submit"
            disabled={isLoading || !formData.amount || !formData.nameOrig || !formData.nameDest}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Transaction...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Analyze for Fraud
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">Analysis typically takes 1-3 seconds</p>
        </CardContent>
      </Card>
    </form>
  )
}
