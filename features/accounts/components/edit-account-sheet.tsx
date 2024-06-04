import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { AccountForm, FormValues } from "./account-form";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

const EditAccount = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account"
  );

  const editMutation = useEditAccount(id);
  const deleteMutaion = useDeleteAccount(id);

  const isPending = editMutation.isPending || deleteMutaion.isPending;

  const accountQuery = useGetAccount(id);

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, { onSuccess: () => onClose() });
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutaion.mutate(undefined, { onSuccess: () => onClose() });
    }
  };

  const isLoading = accountQuery.isLoading;

  const defaultValues = accountQuery.data
    ? { name: accountQuery.data.name }
    : { name: "" };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader className="space-y-4">
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <AccountForm
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

export default EditAccount;
