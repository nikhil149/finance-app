import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useNewTransaction } from "../hooks/use-new-transaction";
import { TransactionForm, ApiFormValues } from "./transaction-form";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Loader2 } from "lucide-react";
const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const mutation = useCreateTransaction();

  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();

  const accountQuery = useGetAccounts();
  const accountMutaion = useCreateAccount();

  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({ name });
  };
  const categoryOptions = (categoryQuery.data || []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const onCreateAccount = (name: string) => {
    accountMutaion.mutate({ name });
  };
  const accountOptions = (accountQuery.data || []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    mutation.isPending ||
    categoryMutation.isPending ||
    accountMutaion.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (values: ApiFormValues) => {
    mutation.mutate(values, { onSuccess: () => onClose() });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="space-y-4">
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction</SheetDescription>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;
