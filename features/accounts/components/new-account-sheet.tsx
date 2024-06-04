import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm, FormValues } from "./account-form";
import { useCreateAccount } from "../api/use-create-account";
const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, { onSuccess: () => onClose() });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="space-y-4">
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create new account to track your transactions
          </SheetDescription>
          <AccountForm
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

export default NewAccountSheet;
