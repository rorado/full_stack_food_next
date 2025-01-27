"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

interface Iprop {
  mainButton: ReactNode;
  title: ReactNode;
  children: ReactNode;
  confirmButton: ReactNode;
  description: string;
  helperFuncion?: () => void;
}

export function DialogDemo({
  mainButton,
  title,
  children,
  description,
  confirmButton,
  helperFuncion,
}: Iprop) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    setIsOpen(false);
  };

  if (helperFuncion && !isOpen) {
    helperFuncion();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{mainButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-center my-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto scroll-m-[1px]">
          {children}
        </div>
        <DialogFooter>
          <div onClick={handleSave}>{confirmButton}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
