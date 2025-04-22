'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const allItems = ["Tape Normal", "Tape Fragile", "PP Box", "Stretch Film", "Foam Blanket NT", "Foam Blanket Normal", "TV Box 43", "TV Box 53","CC Role","Bubble Role"]

const Page = () => {
  const [stockData, setStockData] = useState(
    Array.from({ length: allItems.length }, () => ({ item: "", quantity: 0 }))
  )

  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleItemChange = (index: number, value: string) => {
    const updatedStock = [...stockData]
    updatedStock[index].item = value
    updatedStock[index].quantity = 0 // Reset to 0 when item changes
    setStockData(updatedStock)

    const updatedSelected = stockData.map((entry, i) =>
      i === index ? value : selectedItems[i] || ""
    )
    setSelectedItems(updatedSelected.filter(Boolean))
  }

  const handleQuantityChange = (index: number, value: number) => {
    const updatedStock = [...stockData]
    const item = updatedStock[index].item

    // Clamp to minimum 1 if an item is selected
    const newValue = item ? Math.max(1, value) : value
    updatedStock[index].quantity = newValue

    setStockData(updatedStock)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSuccessMessage("")

    const filtered = stockData.filter(item => item.item && item.quantity > 0)

    const formattedData = {
      items: Object.fromEntries(
        filtered.map(item => [item.item.toLowerCase(), item.quantity])
      ),
      status: "IN"
    };

    try {
      const response = await fetch("/api/add-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })

      const data = await response.json()
      if (response.ok) {
        setSuccessMessage(data.message)
        setStockData(Array.from({ length: allItems.length }, () => ({ item: "", quantity: 0 })))
        setSelectedItems([])
      } else {
        setSuccessMessage("Failed to add stock")
      }
    } catch (error) {
      console.error("Error submitting stock:", error)
      setSuccessMessage("An error occurred while adding the stock.")
    }
    setIsSubmitting(false)
  }

  // Check all selected items have quantity > 0 and at least one exists
  const isFormValid = 
    stockData.every(entry => !entry.item || entry.quantity > 0) && 
    stockData.some(entry => entry.item && entry.quantity > 0)

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 2500)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  return (
    <div className="font-[family-name:var(--font-outfit)] p-4 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-center text-xl font-semibold">
        <h1 className="border px-6 py-2 rounded-md bg-green-500 text-black">ADD STOCK</h1>
      </div>

      <div className="flex justify-center">
        <Image
          src={"/stocks.jpg"}
          width={400}
          height={400}
          alt="Stock Image"
          className="rounded-lg my-6"
          priority
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {stockData.map((entry, index) => (
          <div key={index} className="flex items-center gap-4">
            <select
              value={entry.item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 w-full"
            >
              <option value="">Select Item</option>
              {allItems
                .filter(item => !selectedItems.includes(item) || item === entry.item)
                .map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
            </select>

            <input
              type="number"
              placeholder="Qty"
              value={entry.quantity || ""}
              onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
              className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 w-[100px]"
              min={1}
              disabled={!entry.item}
              required={!!entry.item}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {isSubmitting && (
        <div className="flex justify-center mt-4">
          <span className="animate-pulse text-gray-400">Please wait...</span>
        </div>
      )}

      {successMessage && (
        <div className="flex justify-center mt-4">
          <div className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md">
            {successMessage}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page



