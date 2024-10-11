import React, {useEffect, useState} from "react";
import {FlatList, Box, Text, Spinner, AlertDialog, Button, ScrollView} from "native-base";
import { TaskItem } from "./TaskItem";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Task} from "../types/TaskType";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../types/RootStackParamList";
import {Dimensions} from "react-native";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

export const ListTasks: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [isOpen, setIsOpen] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const cancelRef = React.useRef(null);


    useEffect(() => {
        const fetchTasks = async ()=>{
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    navigation.navigate("LoginScreen"); // Redireciona para a tela de login
                    return;
                }
                console.log(token)

                const response = await fetch('http://localhost:5000/api/task', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro to fetch task');
                }

                const data = await response.json();
                const mappedTasks = data.map((task: any) => ({id: task.id, title: task.name}));
                setTasks(mappedTasks);
            } catch (error) {
                setError("Error when loading task");
            } finally {
                setLoading(false);
            }

        }
        fetchTasks();

    }, []);

    const handleUpdate = async(id: number, taskName: string) =>{
        const token: string | null = await AsyncStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/task/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({task: taskName})
        });

        if(!response.ok){
            throw new Error("Failed to update task");
        }

        setTasks(prevTasks => prevTasks.map(task => task.id === id ? {...task, task: taskName} : task));
    }

    const handleDelete = async(id: number)=>{
        const token: string | null = await AsyncStorage.getItem('token');

        const response = await fetch(`http://localhost:5000/api/task/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if(!response.ok) {
            setAlertMessage("Failed to delete task. Try it later")
        }
        setTasks(tasks => tasks.filter(e => e.id !== id));
        setAlertMessage("Task deleted successfully!");
        setIsOpen(false);
    }

    const openDeleteDialog = (id: number)=>{
        setTaskIdToDelete(id);
        setIsOpen(true);
    }

    if(loading){
        return <Spinner color='blue.500'/>
    }

    if(error){
        return (
            <Box padding={4}>
                <Text style={{color: 'red'}}>{error}</Text>
            </Box>
        )
    }

    const { height } = Dimensions.get('window')



    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#402291' }} style={{ height:  height}}>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TaskItem
                        id={item.id}
                        title={item.title}
                        onUpdate={handleUpdate}
                        onDelete={openDeleteDialog} // Passando a função para abrir o dialogo de exclusão
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
            <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)} leastDestructiveRef={cancelRef}>
                <AlertDialog.Content>
                    <AlertDialog.Header>Delete Task</AlertDialog.Header>
                    <AlertDialog.Body>
                        Do you want delete this task?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group>
                            <Button colorScheme="coolGray" onPress={() => setIsOpen(false)} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={() => { if (taskIdToDelete) handleDelete(taskIdToDelete); }}>
                                Delete
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
            <AlertDialog isOpen={alertMessage !== null} onClose={() => setAlertMessage(null)} leastDestructiveRef={cancelRef}>
                <AlertDialog.Content>
                    <AlertDialog.Header>Notification</AlertDialog.Header>
                    <AlertDialog.Body>
                        {alertMessage}
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button colorScheme="coolGray" onPress={() => setAlertMessage(null)}>
                            Close
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </ScrollView>
    );
};
