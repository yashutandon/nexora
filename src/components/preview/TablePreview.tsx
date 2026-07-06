"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
]

export const TablePreview = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-3xl">
      {/* 1. Invoices Table */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">1. Basic Invoices Table</h3>
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] overflow-hidden">
          <Table>
            <TableCaption className="pb-4">A list of your recent invoices.</TableCaption>
            <TableHeader className="bg-zinc-50 dark:bg-white/[0.02]">
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>
                    <Badge variant={
                      invoice.paymentStatus === "Paid" ? "default" :
                      invoice.paymentStatus === "Pending" ? "secondary" : "destructive"
                    }>
                      {invoice.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
