import { Button } from "@/components/ui/button";
import React from "react";

export default function ToggleLanguage({
  searchMode,
  setSearchMode,
}: {
  searchMode: "english" | "urdu";
  setSearchMode: React.Dispatch<React.SetStateAction<"english" | "urdu">>;
}) {
  const toggleLanguage = () => {
    setSearchMode((prev) => (prev === "english" ? "urdu" : "english"));
  };
  return (
    <Button
      variant="outline"
      type="button"
      onClick={toggleLanguage}
      className={`${searchMode === "english" && "text-2xl"}`}
    >
      {searchMode === "english" ? "اردو" : "English"}
    </Button>
  );
}
