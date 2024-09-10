import * as React from "react";
import {
  Select as RadixSelect,
  SelectTrigger as RadixSelectTrigger,
  SelectItem as RadixSelectItem,
  SelectValue as RadixSelectValue,
  SelectContent as RadixSelectContent,
  SelectItemText as RadixSelectItemText
} from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

interface SelectProps {
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

const Select = ({ onValueChange, children }: SelectProps) => (
  <RadixSelect onValueChange={onValueChange}>
    <RadixSelectTrigger className="border border-gray-300 rounded px-3 py-2">
      <RadixSelectValue />
    </RadixSelectTrigger>
    <RadixSelectContent className="bg-white shadow-md rounded">
      {children}
    </RadixSelectContent>
  </RadixSelect>
);

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

const SelectItem = ({ value, children }: SelectItemProps) => (
  <RadixSelectItem value={value} className="px-4 py-2 hover:bg-gray-200">
    <RadixSelectItemText>{children}</RadixSelectItemText>
  </RadixSelectItem>
);

export { Select, SelectItem };