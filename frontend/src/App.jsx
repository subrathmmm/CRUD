import { Button, Dialog, VStack } from "@chakra-ui/react";
import React from "react";
import EmployeeTable from "./components/ui/EmployeeTable";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../constants/global-variable";
import InputEmployee from "./components/ui/InputEmployee.jsx";
import { DialogTrigger } from "./components/ui/dialog.jsx";


const App = () => {
  async function fetchEmployeeDetails(params) {
    const res = await fetch(baseUrl);
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.error);
    }
    return data;
  }

  const {isPending, isError, data , error} = useQuery({
    queryKey: ["employee_details"],
    queryFn: fetchEmployeeDetails,
  });

  if(isPending) return "Loading"

  if(isError) return error.message;

  console.log("data from postgres db", data);

  return (
    <VStack gap = "6" align="flex-start">
      <InputEmployee>
        <DialogTrigger asChild>
          <Button variant="outline">Add Employee</Button>
        </DialogTrigger>
      </InputEmployee>
      <EmployeeTable data = {data} />
    </VStack>
  );
}

export default App;
