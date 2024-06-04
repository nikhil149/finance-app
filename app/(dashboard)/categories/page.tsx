"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponseType, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkCategory } from "@/features/categories/api/use-bulk-delete-category";

const CategoryPage = () => {
  const newCategory = useNewCategory();
  const categoriesQuery = useGetCategories();
  const deleteCategory = useBulkCategory();
  const categories = categoriesQuery.data || [];
  const isDisabled = deleteCategory.isPending || categoriesQuery.isLoading;
  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto pb-10 w-full -mt-24">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto pb-10 w-full -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
          <Button onClick={newCategory.onOpen}>
            <Plus className="mr-2 size-4" /> Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            filterKey="email"
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);
              deleteCategory.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPage;
