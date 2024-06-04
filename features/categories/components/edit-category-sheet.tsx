import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CategoryForm, FormValues } from "./category-form";
import { useOpenCategory } from "../hooks/use-open-category";
import { useGetCategory } from "../api/use-get-category";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

const EditCategory = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category"
  );

  const editMutation = useEditCategory(id);
  const deleteMutaion = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutaion.isPending;

  const categoryQuery = useGetCategory(id);

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, { onSuccess: () => onClose() });
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutaion.mutate(undefined, { onSuccess: () => onClose() });
    }
  };

  const isLoading = categoryQuery.isLoading;

  const defaultValues = categoryQuery.data
    ? { name: categoryQuery.data.name }
    : { name: "" };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader className="space-y-4">
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <CategoryForm
                id={id}
                onSubmit={onSubmit}
                disabled={isPending}
                defaultValues={defaultValues}
                onDelete={onDelete}
              />
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditCategory;
