// import { Button, Dialog, VStack } from "@chakra-ui/react";
// import React from "react";
// import EmployeeTable from "./components/ui/EmployeeTable";
// import { useQuery } from "@tanstack/react-query";
// import { baseUrl } from "../constants/global-variable";
// import InputEmployee from "./components/ui/InputEmployee.jsx";
// import { DialogTrigger } from "./components/ui/dialog.jsx";


// const App = () => {
//   async function fetchEmployeeDetails(params) {
//     const res = await fetch(baseUrl);
//     const data = await res.json();
//     if(!res.ok){
//       throw new Error(data.error);
//     }
//     return data;
//   }

//   const {isPending, isError, data , error} = useQuery({
//     queryKey: ["employee_details"],
//     queryFn: fetchEmployeeDetails,
//   });

//   if(isPending) return "Loading"

//   if(isError) return error.message;

//   console.log("data from postgres db", data);

//   return (
//     <VStack gap = "6" align="flex-start">
//       <InputEmployee>
//         <DialogTrigger asChild>
//           <Button variant="outline">Add Employee</Button>
//         </DialogTrigger>
//       </InputEmployee>
//       <EmployeeTable data = {data} />
//     </VStack>
//   );
// }

// export default App;



// import { Button, Dialog, VStack } from "@chakra-ui/react";
// import React, { useState } from "react";
// import EmployeeTable from "./components/ui/EmployeeTable";
// import { useQuery } from "@tanstack/react-query";
// import { baseUrl } from "../constants/global-variable";
// import InputEmployee from "./components/ui/InputEmployee.jsx";
// import { DialogTrigger } from "./components/ui/dialog.jsx";
// import Login from "./components/ui/Login.jsx";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem("token")
//   );

//   async function fetchEmployeeDetails() {
//     const token = localStorage.getItem("token");
//     const res = await fetch(baseUrl, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(data.error);
//     }
//     return data;
//   }

//   const { isPending, isError, data, error } = useQuery({
//     queryKey: ["employee_details"],
//     queryFn: fetchEmployeeDetails,
//     enabled: isLoggedIn, // only fetch when logged in
//   });

//   if (!isLoggedIn) {
//     return <Login onLogin={() => setIsLoggedIn(true)} />;
//   }

//   if (isPending) return "Loading...";
//   if (isError) return error.message;

//   return (
//     <VStack gap="6" align="flex-start">
//       <InputEmployee>
//         <DialogTrigger asChild>
//           <Button variant="outline">Add Employee</Button>
//         </DialogTrigger>
//       </InputEmployee>
//       <EmployeeTable data={data} />
//     </VStack>
//   );
// };

// export default App;




// // App.jsx
// import { Button, Dialog, VStack } from "@chakra-ui/react";
// import React, { useState } from "react";
// import EmployeeTable from "./components/ui/EmployeeTable";
// import { useQuery } from "@tanstack/react-query";
// import { baseUrl } from "../constants/global-variable";
// import InputEmployee from "./components/ui/InputEmployee.jsx";
// import { DialogTrigger } from "./components/ui/dialog.jsx";
// import Login from "./components/ui/Login.jsx";

// const App = () => {
//   // ✅ check for accessToken instead of old token
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem("accessToken")
//   );

//   async function fetchEmployeeDetails() {
//     // ✅ get accessToken
//     const accessToken = localStorage.getItem("accessToken");

//     const res = await fetch(baseUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     // if token expired, backend sends 401
//     if (res.status === 401) {
//       throw new Error("Session expired. Please log in again.");
//     }

//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(data.error);
//     }
//     return data;
//   }

//   const { isPending, isError, data, error } = useQuery({
//     queryKey: ["employee_details"],
//     queryFn: fetchEmployeeDetails,
//     enabled: isLoggedIn, // only fetch when logged in
//   });

//   if (!isLoggedIn) {
//     return <Login onLogin={() => setIsLoggedIn(true)} />;
//   }

//   if (isPending) return "Loading...";
//   if (isError) return error.message;

//   return (
//     <VStack gap="6" align="flex-start">
//       <InputEmployee>
//         <DialogTrigger asChild>
//           <Button variant="outline">Add Employee</Button>
//         </DialogTrigger>
//       </InputEmployee>
//       <EmployeeTable data={data} />
//     </VStack>
//   );
// };

// export default App;



// App.jsx
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
