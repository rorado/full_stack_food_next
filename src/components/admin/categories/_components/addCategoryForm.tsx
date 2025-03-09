"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pages, Routes } from "@/constants/enum";
import { toast } from "@/hooks/use-toast";
import { RevalidatePath } from "@/lib/revalidePath";
import { useState } from "react";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: categoryName }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Category created successfully",
          className: "text-green-400",
        });
        setCategoryName("");
        await RevalidatePath(`${Routes.ADMIN}/${Pages.CATEGORIES}`);
      } else {
        toast({
          title: data.message || "Something went wrong",
          className: "text-red-400",
        });
      }
    } catch {
      toast({
        title: "Network error",
        className: "text-red-400",
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Add category name..."
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button className="mt-2" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
