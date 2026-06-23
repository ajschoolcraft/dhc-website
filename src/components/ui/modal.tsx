"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        "rounded-xl border border-border bg-white p-0 shadow-xl backdrop:bg-black/50 max-w-lg w-full",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        <button
          onClick={onClose}
          className="text-text-light hover:text-text transition-colors"
          aria-label="Close"
        >
          &#x2715;
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
