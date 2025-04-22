"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Transaction = {
  invoice: string;
  partner: string;
  date: string;
  items: { [key: string]: number };
  status: "IN" | "OUT";
};

// ✅ Updated item list
const itemList = [
  "Tape Normal",
  "Tape Fragile",
  "PP Box",
  "Stretch Film",
  "Foam Blanket NT",
  "Foam Blanket Normal",
  "TV Box 43",
  "TV Box 53",
  "CC Role",
  "Bubble Role"
];

export function InOutTable() {
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transactions");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchData();
  }, []);

  const formatCSVData = (data: Transaction[]) => {
    const headers = [
      "Invoice",
      "Partner",
      "Date",
      ...itemList,
      "Status",
    ];

    const rows = data.map((txn) => [
      txn.invoice,
      txn.partner,
      new Date(txn.date).toISOString(),
      ...itemList.map((item) => txn.items[item.toLowerCase()]?.toString() || "0"),
      txn.status,
    ]);

    return [headers, ...rows];
  };

  const downloadCSV = () => {
    const csvData = formatCSVData(data);

    const csvContent = csvData
      .map(row =>
        row
          .map(field => {
            const stringField = String(field).replace(/"/g, '""');
            return /[,"\n]/.test(stringField) ? `"${stringField}"` : stringField;
          })
          .join(",")
      )
      .join("\r\n");

    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8"
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button onClick={downloadCSV} variant="outline">
          Export to Excel
        </Button>
      </div>

      <Table className="border">
        <TableCaption className="my-4">
          List of all stock IN & OUT transactions
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Invoice</TableHead>
            <TableHead>Partner</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
            {itemList.map((item) => (
              <TableHead key={item} className="text-center">
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((txn) => (
            <TableRow key={txn.invoice}>
              <TableCell className="font-medium">{txn.invoice}</TableCell>
              <TableCell>{txn.partner}</TableCell>
              <TableCell>
                {new Date(txn.date).toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`font-semibold text-white tracking-wider ${
                    txn.status === "OUT" ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {txn.status}
                </Badge>
              </TableCell>
              {itemList.map((item) => (
                <TableCell key={item} className="text-center">
                  {txn.items[item.toLowerCase()] || 0}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
