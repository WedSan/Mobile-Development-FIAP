import {Context, createContext, useContext, useState} from "react";

interface Task{
    id: number,
    title: string
}

interface GlobalContextState{
    tasks: Task[],
    addTask: (titulo: string) => void;
}

const globalContextState: Context<GlobalContextState> = createContext<GlobalContextState>({
    tasks: [],
    addTask: () => {}
})

export const useGlobalState = () => useContext(globalContextState)

export const GlobalStateProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [tasks, setTask] = useState<Task[]>([])
    
    const addTask = (title: string) => {
        const newTask: Task = {
            id: Date.now(),
            title
        }
        setTask([...tasks, newTask])
    }
    return (
        <globalContextState.Provider value={{tasks, addTask}}>
            {children}
        </globalContextState.Provider>
    )
}
