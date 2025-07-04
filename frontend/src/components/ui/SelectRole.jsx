// import React from "react";
// import { createListCollection } from "@chakra-ui/react";
// import {
//     SelectContent,
//     SelectItem,
//     SelectLabel, 
//     SelectRoot, 
//     SelectTrigger,
//     SelectValueText
// } from "./select.jsx";

// const SelectRole = () =>{
//     return (
//     <Select.Root collection={frameworks} size="sm" width="320px">
//       <Select.HiddenSelect />
//       <Select.Label>Select framework</Select.Label>
//       <Select.Control>
//         <Select.Trigger>
//           <Select.ValueText placeholder="Select framework" />
//         </Select.Trigger>
//         <Select.IndicatorGroup>
//           <Select.Indicator />
//         </Select.IndicatorGroup>
//       </Select.Control>
//       <Portal>
//         <Select.Positioner>
//           <Select.Content>
//             {frameworks.items.map((framework) => (
//               <Select.Item item={framework} key={framework.value}>
//                 {framework.label}
//                 <Select.ItemIndicator />
//               </Select.Item>
//             ))}
//           </Select.Content>
//         </Select.Positioner>
//       </Portal>
//     </Select.Root>
//     );
// }

// const frameworks = createListCollection({
//   items: [
//     { label: "React.js", value: "react" },
//     { label: "Vue.js", value: "vue" },
//     { label: "Angular", value: "angular" },
//     { label: "Svelte", value: "svelte" },
//   ],
// })

// export default SelectRole;



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
