import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function ErrorAlert() {
  return (
    <Alert variant="destructive" className="font-[family-name:var(--font-outfit)]">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Invalid User Try Again!!!!
      </AlertDescription>
    </Alert>
  )
}
