import React from "react";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectLabel,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "./select.jsx";

const SelectRole = ({setInfo}) => {
  return (
    <SelectRoot collection={roles} size="sm" width="320px" onChange = {(e) => setInfo((prev) => ({...prev, role: e.target.value}))}>
      <SelectLabel>Select Role</SelectLabel>
      <SelectTrigger clearable>
        <SelectValueText placeholder="Select framework" />
      </SelectTrigger>
      <SelectContent className = "select">
        {roles.items.map((role) => (
          <SelectItem key={role.value} item={role}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

const roles = createListCollection({
  items: [
    { label: "HR", value: "HR" },
    { label: "Developer", value: "Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Sales", value: "Sales" },
    { label: "Intern", value: "Intern" },
  ],
});

export default SelectRole;
