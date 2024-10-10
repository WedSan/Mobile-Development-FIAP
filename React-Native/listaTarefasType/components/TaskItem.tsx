import React, {useState} from "react"
import {Box, Button, HStack, IconButton, Input, Modal, Text, View} from "native-base"
import {AntDesign, MaterialIcons} from "@expo/vector-icons"

interface TaskItemProps{
    id: number;
    title: string;
    onUpdate: (id: number, newTitle: string) => Promise<void>;
    onDelete: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({id, title, onUpdate, onDelete}) =>{

    const [isEditing, setEditing] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);
    const [userWantsModalOpen, setUserWantsModalOpen] = useState<boolean>(false);


    const handleEditPress = async ()=>{
        await onUpdate(id, newTitle);
        setEditing(false);
    }

    const handleDeletePress = async ()=>{
        onDelete(id);
        setUserWantsModalOpen(false);
    }

    return(
        <View>
            {(
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
                    {isEditing ? (
                        <HStack flex={3} alignItems="center">
                            <Input
                                value={newTitle}
                                onChangeText={setNewTitle}
                                onBlur={() => setEditing(false)}
                                autoFocus
                            />
                            <IconButton icon={<AntDesign name="check" size={24} />} onPress={handleEditPress} />
                        </HStack>
                    ) : (
                        <Text flex={3} fontSize={18}>{title}</Text>
                    )}
                    <HStack space={2}>
                        <IconButton
                            icon={<AntDesign name="edit" size={24} />}
                            onPress={() => setEditing(!isEditing)}
                        />
                        <IconButton
                            icon={<MaterialIcons name="delete" size={24} />}
                            onPress={() => setUserWantsModalOpen(true)} // Abre o modal de confirmação
                        />
                    </HStack>

                    <Modal isOpen={userWantsModalOpen} onClose={() => setUserWantsModalOpen(false)}>
                        <Modal.Content>
                            <Modal.Header>Delete Task</Modal.Header>
                            <Modal.Body>
                                Do you really want to delete this task?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group>
                                    <Button colorScheme="coolGray" onPress={() => setUserWantsModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="danger" onPress={handleDeletePress}>
                                        Delete
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Box>
            )
            }
            
        </View>
    )
}