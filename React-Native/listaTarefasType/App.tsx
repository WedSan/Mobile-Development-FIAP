import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Center, Text, Box } from 'native-base';
import { AddTask } from './components/AddTask';
import { useState } from 'react';
import { ListTasks } from './components/ListTasks';
import { GlobalStateProvider } from './hooks/GlobalState';
export default function App() {
  const [tasks, setTasks] = useState<string[]>([])

  const addTask = (newTask: string) =>{
    setTasks([...tasks, newTask])
  }
  return (
    <NativeBaseProvider>
        <GlobalStateProvider>
        <Center background="white" >
            <Box background="white">
              <Text fontSize="2xl" color="primary.500" fontWeight="bold" fontFamily="Roboto">
                To-Do List App
              </Text>
            </Box>
          </Center>
          <AddTask></AddTask>
          <ListTasks></ListTasks>
        </GlobalStateProvider>
    </NativeBaseProvider>
    
  );  
}
