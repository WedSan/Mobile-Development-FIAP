import {GlobalStateProvider} from "../hooks/GlobalState";
import {Box, Center, NativeBaseProvider, Text} from "native-base";
import {AddTask} from "./AddTask";
import {ListTasks} from "./ListTasks";
import React from "react";

export const TaskScreen: React.FC = ()=>{
    return(
        <GlobalStateProvider>
            <Center background="white" >
                <Box background="white">
                    <Text fontSize="2xl" color="primary.500" fontWeight="bold" fontFamily="Roboto">
                        To-Do List App
                    </Text>
                </Box>
            </Center>
            <ListTasks></ListTasks>
        </GlobalStateProvider>
    )
}