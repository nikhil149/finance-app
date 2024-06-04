"use client";

import EditAccount from "@/features/accounts/components/edit-account-sheet";
import NewAccountSheet from "@/features/accounts/components/new-account-sheet";

export const SheetProvider = () => {
  return (
    <>
      <NewAccountSheet />
      <EditAccount />
    </>
  );
};
