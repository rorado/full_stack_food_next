import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RevalidatePath } from "@/lib/revalidePath";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";

interface Iprop {
  title: string;
  descreption?: string;
  buttonAction?: React.ReactNode;
  children?: ReactNode;
  handeSave: () => Promise<void> | void;
  pathRev?: string;
}

export function AlertDialogDemo({
  title,
  descreption,
  buttonAction,
  children,
  handeSave,
  pathRev,
}: Iprop) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const revalidatePath = async () => {
    try {
      if (pathRev) {
        await RevalidatePath(pathRev);
      }
    } catch {
      alert("Unexpected Error");
    }
  };

  const handleAction = async () => {
    setLoading(true);
    try {
      await handeSave();
      await revalidatePath();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div onClick={() => setOpen(true)}>{buttonAction}</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {children ? (
            children
          ) : (
            <AlertDialogDescription>{descreption}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="hover:bg-slate-100"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </AlertDialogCancel>
          <Button onClick={handleAction} disabled={loading}>
            {loading ? "Processing..." : "Ok"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
