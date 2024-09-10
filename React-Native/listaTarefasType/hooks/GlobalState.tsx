import {Context, createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/TaskType";

interface GlobalContextState{
    tasks: Task[],
    addTask: (titulo: string) => void;
    editTask: (titleId: number, taskTitle: string) => void;
    deleteTask: (taskId: number)=> void;
}

const globalContextState: Context<GlobalContextState> = createContext<GlobalContextState>({
    tasks: [],
    addTask: () => {},
    editTask: ()=> {},
    deleteTask: ()=> {}
})

export const useGlobalState = () => useContext(globalContextState)

export const GlobalStateProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [tasks, setTask] = useState<Task[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const addTask = (title: string) => {
        const newTask: Task = {
            id: Date.now(),
            title
        }

        const updatedTasks = [...tasks, newTask]
        setTask(updatedTasks)
        saveTasks(updatedTasks);   
    }

    const editTask = (taskId: number, newTitle: string)=>{
        const updatedTasks: Task[] = tasks.map(e=>
             e.id === taskId ? {...e, title: newTitle} : e)
        setTask(updatedTasks)

        saveTasks(updatedTasks);
    }

    const deleteTask = (taskId: number)=>{
        const newTasks = tasks.filter(e => e.id !== taskId)
        
        setTask(newTasks)

        saveTasks(newTasks)
    }

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const storagedTasks = await AsyncStorage.getItem("tasks");
                if (storagedTasks) {
                    setTask(JSON.parse(storagedTasks));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
    
        loadTasks();
    }, []);

    const saveTasks = async (tasks: Task[])=>{
        try{
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <globalContextState.Provider value={{tasks, addTask, editTask, deleteTask}}>
            {children}
        </globalContextState.Provider>
    )
}
