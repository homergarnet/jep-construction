"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmOptions {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
}

let externalResolve: ((value: boolean) => void) | null = null

export function useConfirmDialog() {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "Are you sure?",
    description: "This action cannot be undone.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  })

  const confirm = (opts?: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      externalResolve = resolve
      setOptions((prev) => ({ ...prev, ...opts }))
      setOpen(true)
    })
  }

  const ConfirmDialog = (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title}</AlertDialogTitle>
          <AlertDialogDescription>{options.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer"
            onClick={() => {
              externalResolve?.(false)
              setOpen(false)
            }}
          >
            {options.cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => {
              externalResolve?.(true)
              setOpen(false)
            }}
          >
            {options.confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { confirm, ConfirmDialog }
}
