'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

type Partner = {
  pid: string
  name: string
}

const Page = () => {
  const [partner, setPartner] = useState<Partner>({
    pid: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
const [dialogTitle, setDialogTitle] = useState('')
const [dialogMessage, setDialogMessage] = useState('')

  // Generate next PID on load
  const generatePid = async () => {
    const res = await fetch('/api/partners')
    const data: Partner[] = await res.json()
    const newId = `PTN${String(data.length + 1).padStart(2, '0')}`
    setPartner((prev) => ({ ...prev, pid: newId }))
  }

  useEffect(() => {
    generatePid()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
  
    const res = await fetch('/api/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: partner.name }),
    })
  
    if (res.ok) {
      setDialogTitle("Success")
      setDialogMessage("Partner added successfully!")
      setPartner({ pid: '', name: '' })
      generatePid()
    } else {
      setDialogTitle("Error")
      setDialogMessage("Error adding partner")
    }
  
    setShowDialog(true)
    setLoading(false)
  }

  return (
    <div className='font-[family-name:var(--font-outfit)]'>
      <div className='flex justify-center text-xl font-semibold'>
        <h1 className='border px-6 py-2 rounded-md bg-green-500 text-black'>ADD PARTNER</h1>
      </div>
      <Image
                  src={"/partners.avif"}
                  width={400}
                  height={400}
                  alt='Stock Image'
                  className='rounded-lg my-6'/>
      
      <div className='w-full mt-15'>
        <div className='mx-auto border w-[90%] rounded-md p-6'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='pid'>Partner ID</label>
              <input
                type='text'
                name='pid'
                id='pid'
                value={partner.pid}
                disabled
                className='block rounded-md px-4 mt-2 h-[35px] border border-gray-400 text-red-500 font-semibold bg-gray-300 tracking-wider'
              />
            </div>

            <div>
              <label htmlFor='name'>Enter Partner Name</label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Partner Name'
                value={partner.name}
                onChange={(e) => setPartner({ ...partner, name: e.target.value })}
                className='block rounded-md px-4 mt-2 h-[35px] border border-gray-400 focus:outline-green-500'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            >
              {loading ? 'Submitting...' : 'Add Partner'}
            </button>
          </form>
        </div>
      </div>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
      <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction onClick={() => setShowDialog(false)}>
        OK
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  )
}

export default Page
