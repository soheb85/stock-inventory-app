"use client"
import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "IN",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "OUT",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TotalStockChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChart = async () => {
      const res = await fetch("/api/monthly-stock-chart");
      const data = await res.json();
      setChartData(data);
    };
    fetchChart();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total IN And OUT - Month</CardTitle>
        <CardDescription>January - December 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="IN" fill="var(--color-chart-1)" radius={4} />
            <Bar dataKey="OUT" fill="var(--color-chart-5)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Blue - IN   And  Red - Out <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing monthly stock data
        </div>
      </CardFooter>
    </Card>
  );
}
