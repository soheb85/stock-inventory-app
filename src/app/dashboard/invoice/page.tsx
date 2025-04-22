/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Image from "next/image";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,AlertDialogFooter,AlertDialogCancel, } from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [items, setItems] = useState({
    "tape normal": 0,
    "tape fragile": 0,
    "pp box": 0,
    "stretch film": 0,
    "foam blanket nt": 0,
    "foam blanket normal": 0,
    "tv box 43": 0,
    "tv box 53": 0,
    "cc role": 0,
    "bubble role": 0,
  });
//   const allItems = ["Tape Normal", "Tape Fragile", "PP Box", "Stretch Film", "Foam Blanket NT", "Foam Blanket Normal", "TV Box 43", "TV Box 53","CC Role","Bubble Role"]
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    fetch("/api/partners")
      .then(res => res.json())
      .then(data => {
        setPartners(data);
      });
  }, []);

  const handleSubmit = async () => {
    const filteredItems = Object.entries(items)
      .filter(([_, qty]) => qty > 0)
      .map(([item, quantity]) => ({ item, quantity }));
      

    if (!selectedPartner || filteredItems.length === 0) {
      alert("Select partner and add items"); // replace later with better UI
      return;
    }

    setLoading(true);

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partner: selectedPartner,
        items: filteredItems,
        status: "OUT"  // ✅ explicitly add status
      })
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setTransactionId(data.tid);
      setOpenAlert(true);
      setItems({
        "tape normal": 0,
        "tape fragile": 0,
        "pp box": 0,
        "stretch film": 0,
        "foam blanket nt": 0,
        "foam blanket normal": 0,
        "tv box 43": 0,
        "tv box 53": 0,
        "cc role": 0,
        "bubble role": 0,
      });
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-5 font-[family-name:var(--font-outfit)]">
      <div className="text-center text-xl font-semibold mb-4">
        <h1 className="border px-2 py-2 rounded-md bg-green-500 text-black">ADD PARTNER TRANSACTION</h1>
      </div>

      <div className="flex justify-center">
        <Image src="/invoice.avif" width={400} height={400} alt="Stock" className="rounded-lg my-6 h-[220px]" />
      </div>

      <div className="mb-3">
        <label className="font-medium">Select Partner</label>
        <select
          className="block w-full border rounded px-3 py-2 bg-black/90"
          onChange={(e) => {
            const selected = partners.find((p: any) => p.pid === e.target.value);
            setSelectedPartner(selected);
          }}
        >
          <option value="">Select Partner</option>
          {partners.map((partner: any) => (
            <option key={partner.pid} value={partner.pid}>{partner.name}</option>
          ))}
        </select>
      </div>

      {selectedPartner && (
        <div className="mb-4 tracking-wider">
          <p className="font-medium">
            Partner ID:{" "}
            <span className="text-black"><Badge className="bg-green-500 font-semibold text-[14px]">{selectedPartner.pid}</Badge></span>
          </p>
        </div>
      )}


      <div className="grid grid-cols-2 gap-4 mb-6">
      {Object.keys(items).map((item, idx) => (
  <div key={idx}>
    <label className="capitalize block text-[14px] mb-1">{item}</label>
    <input
      type="number"
      min="0"
      value={items[item as keyof typeof items] === 0 ? "" : items[item as keyof typeof items]}
      onChange={(e) =>
        setItems({
          ...items,
          [item]: e.target.value === "" ? 0 : parseInt(e.target.value)
        })
      }
      className="w-full border px-3 py-2 rounded"
    />
  </div>
))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
        disabled={loading}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Submitting..." : "Submit Transaction"}
      </button>

      {/* ✅ ShadCN Alert Dialog */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogTrigger asChild />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transaction Successful</AlertDialogTitle>
            <AlertDialogDescription>
              Transaction ID: <strong>{transactionId}</strong><br />
              Partner: <strong>{selectedPartner?.name}</strong><br />
              Date: <strong>{new Date().toLocaleString()}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>OK</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

