import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useNewCategory } from "../hooks/use-new-category";
import { CategoryForm, FormValues } from "./category-form";
import { useCreateCategory } from "../api/use-create-category";
const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, { onSuccess: () => onClose() });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="space-y-4">
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create new category to track your transactions
          </SheetDescription>
          <CategoryForm
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={{
              name: "",
            }}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
