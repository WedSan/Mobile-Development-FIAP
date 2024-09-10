import { View, Input, Text } from "native-base";
import { IconButton } from "native-base";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface AddTaskProps {
    onAddTask: (task: string) => void;
}

export const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {

    const [taskName, setTaskName] = useState<string>("");


    const handleAddTaskButton = ()=>{
        if(taskName.trim() === ""){
            return 
        }
        
        onAddTask(taskName)
        
        setTaskName("")
    }

    return (
        <View style={{ backgroundColor: '#402291', paddingVertical: 20, paddingHorizontal: 20, paddingTop: 50 }}>
            <Text fontSize="xl" color="white" mb={4}>To-Do List</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Input
                        placeholder="Digite uma tarefa"
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
