
import { Button, Dialog, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import EmployeeTable from "./components/ui/EmployeeTable";
import { useQuery } from "@tanstack/react-query";
import InputEmployee from "./components/ui/InputEmployee.jsx";
import { DialogTrigger } from "./components/ui/dialog.jsx";
import Login from "./components/ui/Login.jsx";
import { apiFetch } from "../utils/api.js"; // ✅ use our wrapper
import { baseUrl } from "../constants/global-variable";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  async function fetchEmployeeDetails() {
    // ✅ apiFetch automatically adds token & refreshes if expired
    return await apiFetch(baseUrl, {
      method: "GET",
    });
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["employee_details"],
    queryFn: fetchEmployeeDetails,
    enabled: isLoggedIn,
  });

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  if (isPending) return "Loading...";
  if (isError) return error.message;

  return (
    <VStack gap="6" align="flex-start">
      <InputEmployee>
        <DialogTrigger asChild>
          <Button variant="outline">Add Employee</Button>
        </DialogTrigger>
      </InputEmployee>
      <EmployeeTable data={data} />
    </VStack>
  );
};

export default App;
