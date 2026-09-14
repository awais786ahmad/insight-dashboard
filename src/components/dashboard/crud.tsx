import * as React from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useRightDrawerRegistration } from "@/components/dashboard/shell-context";

/** Confirmation step required before every create or delete operation. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  destructive,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              destructive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""
            }
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/**
 * Create / edit records. Always a modal, always confirmed, and always offers
 * a draft option on create.
 */
export function RecordFormModal({
  open,
  onOpenChange,
  title,
  description,
  mode = "create",
  submitLabel,
  children,
  onSubmit,
  onSaveDraft,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  mode?: "create" | "edit";
  submitLabel?: string;
  children: ReactNode;
  onSubmit: () => void;
  onSaveDraft?: () => void;
}) {
  const [confirming, setConfirming] = React.useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>
          <div className="space-y-4 py-2">{children}</div>
          <DialogFooter className="gap-2 sm:justify-between">
            {mode === "create" && onSaveDraft ? (
              <Button
                variant="outline"
                onClick={() => {
                  onSaveDraft();
                  onOpenChange(false);
                }}
              >
                Save as draft
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={() => setConfirming(true)}>
                {submitLabel ?? (mode === "create" ? "Create" : "Save changes")}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title={mode === "create" ? "Create this record?" : "Save these changes?"}
        description={
          mode === "create"
            ? "The record will be created and visible to your workspace."
            : "The existing record will be updated with your changes."
        }
        confirmLabel={mode === "create" ? "Create" : "Save"}
        onConfirm={() => {
          setConfirming(false);
          onSubmit();
          onOpenChange(false);
        }}
      />
    </>
  );
}

/** All record details are shown in a right drawer. */
export function DetailDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useRightDrawerRegistration(open);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-6">{children}</div>
        {footer ? <div className="border-t border-border p-4">{footer}</div> : null}
      </SheetContent>
    </Sheet>
  );
}
