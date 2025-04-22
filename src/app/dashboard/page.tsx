
'use client'

import { Separator } from "@/components/ui/separator";
import { TrendingUpIcon,TrendingDownIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TotalStockChart } from "@/components/dashboard/TotalStockChart";
import { InOutTable } from "@/components/dashboard/InOutTable";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";




type Stock = {
  _id: string;
  item: string;
  totalQuantity: number;
};



{/*font-[family-name:var(--font-outfit)]*/}

export default function Home() {

  const [stock,setStock] = useState<Stock[]>([])
  const [inOutTotal, setInOutTotal] = useState({ totalIn: 0, totalOut: 0 });
  const [partnerCount, setPartnerCount] = useState<number>(0);

const fetchPartnerCount = async () => {
  const res = await fetch("/api/partners");
  const data = await res.json();
  setPartnerCount(data.length); // Count the number of partners
};

const fetchInOutTotal = async () => {
  const res = await fetch("/api/total-in-out");
  const data = await res.json();
  setInOutTotal(data);
};

  const handleStock = async ()=>{
    const res  = await fetch("/api/total-stock")
    const data = await res.json();
    setStock(data.totals)
  }

  useEffect(()=>{
    handleStock();
    fetchInOutTotal();
    fetchPartnerCount();
  },[])

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    
    <div className="font-[family-name:var(--font-outfit)]">
      <div className="w-full flex justify-center items-center">
        <h1 className="text-[20px] text-center font-semibold">
          ABS STOCK MANAGEMENT
        </h1>
        <div className="pl-5">
      <button onClick={()=> signOut({callbackUrl:"/login"})} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
        Logout
      </button>
    </div>
      </div>

      <Separator className="my-2" />

      <div className="">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Partners</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {partnerCount}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3 text-green-500" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4 text-green-500" />
          </div>
          
        </CardFooter>
      </Card>
      </div>
      

      <div className="mt-3">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="text-xl mb-2">Total Stock Available</CardDescription>
            
            {stock.map((items,index)=>(
              <CardTitle className="@[250px]/card:text-xl text-2xl font-semibold tabular-nums" key={index}>
              <div className="grid grid-cols-2">
              <span>{capitalizeFirstLetter(items.item)}</span>
  <span className="mt-1">{items.totalQuantity}</span>
              </div>
              
            </CardTitle>
            ))}
            
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total In Items <TrendingDownIcon className="size-4 text-green-500" />
          </div>
          
        </CardFooter>
        </Card>
      </div>
      <div className="mt-3 grid md:grid-cols-2 gap-4">
  <Card>
    <CardHeader>
      <CardDescription>Total Items Restocked (IN)</CardDescription>
      <CardTitle className="text-2xl">{inOutTotal.totalIn}</CardTitle>
    </CardHeader>
  </Card>
  <Card>
    <CardHeader>
      <CardDescription>Total Items Out (Partners)</CardDescription>
      <CardTitle className="text-2xl">{inOutTotal.totalOut}</CardTitle>
    </CardHeader>
  </Card>
</div>
      <div className="mt-3">
        <TotalStockChart/>
      </div>

      <div className="mt-8 w-full flex justify-center ">
        <h1 className="border-1 w-[250px]  h-[40px] flex justify-center items-center rounded-2xl bg-green-500 text-slate-900 font-semibold">Recent In And Out Stock</h1>
      </div>

      <div className="mt-5">
        <InOutTable/>
      </div>
            
      
      
    </div>
  );
}
