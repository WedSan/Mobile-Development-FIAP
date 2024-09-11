import { useState } from "react"
import { Task } from "../types/TaskType"
import { Box, Text, Button } from "native-base"


export const TaskItem: React.FC<Task> = ({id, title}) =>{
    const [isEditing, setEditing] = useState<boolean>(false)

    const [newTitle, setNewTitle] = useState<string>(title)

    return(
        <Box
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
            <Button size={'md'} variant={'solid'}>
                edit
            </Button>
        </Box>
    )
}