import { useState } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectPairProps {
  label: string;
  description: string;
  name: string;
  required?: boolean;
  placeholder: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
}

export default function SelectPair({
  label,
  description,
  name,
  required = false,
  placeholder,
  options,
  defaultValue,
}: SelectPairProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2 flex flex-col">
      <Label
        className="flex flex-col"
        onClick={() => {
          setOpen(true);
        }}
      >
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Select
        required={required}
        name={name}
        open={open}
        onOpenChange={setOpen}
        defaultValue={defaultValue}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
