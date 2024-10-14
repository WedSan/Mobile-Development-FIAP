import { View, Input, Text } from "native-base";
import { IconButton } from "native-base";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalState } from "../hooks/GlobalState";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AddTaskProps{
    onAddTask: ()=> void;
}

export const AddTask: React.FC<AddTaskProps> = ({onAddTask}) => {

    const [taskName, setTaskName] = useState<string>("");
    
    const {addTask} = useGlobalState()

    const handleAddTaskButton = async()=>{
        if(taskName.trim() === ""){
            return 
        }
        try{
            const token = await AsyncStorage.getItem("token");
            if(!token){
                console.log("Token não encontrado");
                return;
            }

            const response: Response = await fetch('http://localhost:5000/api/task', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({task: taskName})
            });

            if(!response.ok){
                throw new Error("Failed to create task");
            }

            onAddTask();
        }
        catch(error){
            console.log("erro ao adicionar tarefa" + error)
        }

        addTask(taskName)
        
        setTaskName("")
    }

    return (
        <View style={{ backgroundColor: '#402291', paddingVertical: 20, paddingHorizontal: 20, paddingTop: 50 }}>
            <Text fontSize="xl" color="white" mb={4}>To-Do List</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Input
                        placeholder="Enter a task"
                        placeholderTextColor="white"
                        value={taskName}
                        onChangeText={(taskText) => setTaskName(taskText)}
                        fontSize={14}
                        color="white"
                    />
                </View>
                <IconButton
                    icon={<Ionicons name="add" size={24} color="#402291" />}
                    colorScheme="light"
                    onPress={() => handleAddTaskButton()}
                    style={{ borderRadius: 50, backgroundColor: 'gold' }}
                />
            </View>
        </View>
    );
};
