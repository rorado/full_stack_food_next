import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Iprop {
  title: string;
  descreption: string;
  buttonAction: React.ReactNode;
  handleSave: () => void;
}

export function AlertDialogDemo({
  title,
  descreption,
  buttonAction,
  handleSave,
}: Iprop) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleAction = () => {
    setOpen(!open);
    handleSave();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div onClick={handleToggle}> {buttonAction}</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{descreption}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-slate-100">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Delet</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
