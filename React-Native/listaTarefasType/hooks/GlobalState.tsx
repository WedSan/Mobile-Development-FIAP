import {Context, createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task{
    id: number,
    title: string
}

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
        setTask([...tasks, newTask])

        saveTasks(tasks);   
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

    useEffect(()=>{
        const loadTasks = ()=>{
        
            const storagedTasksPromise: Promise<string | null> = AsyncStorage.getItem("tasks");
            storagedTasksPromise.then(
                (storagedTasks)=> storagedTasks != null ? setTask(JSON.parse(storagedTasks)) : null)
            
            setIsLoading(false)
        }

        loadTasks()
    })

    useEffect(()=>{
        saveTasks(tasks)
    }, [tasks])

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
