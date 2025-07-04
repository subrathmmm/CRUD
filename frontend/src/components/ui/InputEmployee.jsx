import React from "react";
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
  Input, 
  VStack
} from "@chakra-ui/react"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "./dialog.jsx";
import { Field } from "./field.jsx";
import SelectRole from "./SelectRole.jsx";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../../constants/global-variable.js";
import { queryClient } from "../../../utils/queryClient.js";
import { Children } from "react";





const InputEmployee = ({children, type= "add", data}) => {
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState(
        type === "add"
        ? {name:"", email:"", age:"",salary:"",role:""}
        : data
    );

    function handleChange(e) {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    }
    console.log(info);

    const addEmployeeMutation = useMutation({
    mutationFn: async (info) => {
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
    },
    onError:(error) =>{
        toast.error(error.message);
    },
    onSuccess: (data) =>{
        setInfo({name:"", email:"", age:"",salary:"",role:""});
        setOpen(false);
        toast.success("Employee details added!");
        queryClient.invalidateQueries({queryKey: ["employee_details"]});
    },
    });



    const updateMutation = useMutation({
    mutationFn: async (info) => {
    const response = await fetch(baseUrl + '/' + info.id, {
      method: "PUT",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
    },
    onError:(error) =>{
        toast.error(error.message);
    },
    onSuccess: (data) =>{
        setInfo({name:"", email:"", age:"",salary:"",role:""});
        setOpen(false);
        toast.success("Employee details updated!");
        queryClient.invalidateQueries({queryKey: ["employee_details"]});
    },
    });


    const requiredFields = ["name", "age", "salary", "email"];
    function handleSubmit(){
        for(const key of requiredFields){
            if(!info[key].toString().trim()){
                toast.error("Missing fields")
            }
        }
        const infoUpdated = {...info, role: info.role || null};
        if(type === "add"){
            addEmployeeMutation.mutate(infoUpdated);
        }else{
            updateMutation.mutate(infoUpdated);
        }

        
    }

    return(
        <Dialog.Root
            placement= "centre"
            motionPreset="slide-in-bottom"
            open = {open}
            onOpenChange={(e) => setOpen(e.open)}
        >
            {children}
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{type === "add"?"Add Employee": "Update Employee"}</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack gap = "4" alignItems="flex-start">
                    <Field label = "Username" required>
                        <Input name = "name" placeholder= "Enter username" value = {info.name} onChange={handleChange}/>
                    </Field>
                    <Field label = "Email" required>
                        <Input name = "email" placeholder= "Enter email" value = {info.email} onChange={handleChange}/>
                    </Field>
                    <Field label = "Age" required>
                        <Input name = "age" placeholder= "Enter age" type="number" value = {info.age} onChange={handleChange}/>
                    </Field>
                    <Field label = "Salary" required>
                        <Input name = "salary" placeholder= "Enter salary" value = {info.salary} onChange={handleChange}/>
                    </Field>
                    <SelectRole setInfo= {setInfo}/>
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleSubmit}>{type === "add"?"Add Employee": "Update"}</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

export default InputEmployee;