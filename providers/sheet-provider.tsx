"use client";

import EditAccount from "@/features/accounts/components/edit-account-sheet";
import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import EditCategory from "@/features/categories/components/edit-category-sheet";
import NewCategorySheet from "@/features/categories/components/new-category-sheet";

export const SheetProvider = () => {
  return (
    <>
      <NewAccountSheet />
      <EditAccount />

      <NewCategorySheet />
      <EditCategory />
    </>
  );
};
