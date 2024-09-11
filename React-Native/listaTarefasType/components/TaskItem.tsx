import { useState } from "react"
import { Task } from "../types/TaskType"
import { Box, Text, Button, View, Input, IconButton } from "native-base"
import {Ionicons} from "@expo/vector-icons"
import { useGlobalState } from "../hooks/GlobalState"

export const TaskItem: React.FC<Task> = ({id, title}) =>{

    const [isEditing, setEditing] = useState<boolean>(false)    
    const [newTitle, setNewTitle] = useState<string>(title)

    const {editTask, deleteTask} = useGlobalState()


    const handleEditPress = ()=>{
        
        editTask(id, newTitle)
        setEditing(false)
    }

    return(
        <View>
            {
                isEditing ? (
                    <Box  
                    flexDirection="row" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    bg="#F2CC00" 
                    p={4} 
                    my={2} 
                    mx={2} 
                    borderRadius={8}>  
                        <Input
                        borderColor={'purple'}
                        placeholder="New task name"
                        placeholderTextColor="black"
                        style={{color: 'black', borderColor: 'purple'}}
                        onChangeText={(text)=> setNewTitle(text)}
                        fontSize={14}
                        width={'70%'}
                        color="white"
                        >
                        </Input>
                        <IconButton icon={<Ionicons name="checkbox" size={32} color={"purple"}/>} onPress={()=>handleEditPress()}
                        ></IconButton> 
                        
                    </Box>
                ) : (<Box
                    flexDirection="row"     
                    justifyContent="space-between" 
                    alignItems="center" 
                    bg="gray.200" 
                    p={4} 
                    my={2} 
                    mx={2} 
                    borderRadius={8} 
                    >
                        <Text flex={3} fontSize={18} overflow={'hidden'}> {title}  </Text>
                        
                        <Button size={'md'} variant={'solid'} onPress={()=> setEditing(true)} mr={'25px'}>
                            edit
                        </Button>
                        <Button size={'md'} backgroundColor={'red.600'} variant={'solid'} onPress={()=> deleteTask(id)}>
                            delete
                        </Button>
                        

                    </Box>)
            }
            
        </View>
    )
}