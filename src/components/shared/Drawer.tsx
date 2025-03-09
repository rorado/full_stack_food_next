import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Iprop {
  title?: string;
  descreption?: string;
  buttonAction: React.ReactNode;
  children: React.ReactNode;
}

export function DrawerDialogDemo({
  title = "Edit profile",
  descreption = "",
  buttonAction,
  children,
}: Iprop) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{buttonAction}</DialogTrigger>
        <DialogContent className="w-[98vw] max-w-[55rem]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{descreption}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{buttonAction}</DrawerTrigger>
      <DrawerContent className="w-[98vw] mx-2 px-2">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
