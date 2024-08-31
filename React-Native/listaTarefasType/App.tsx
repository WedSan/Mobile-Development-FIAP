import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Center, Text, Box } from 'native-base';
import { AddTask } from './components/AddTask';
import { useState } from 'react';
import { ListTasks } from './components/ListTasks';

export default function App() {
  const [tasks, setTasks] = useState<string[]>([])

  const addTask = (newTask: string) =>{
    setTasks([...tasks, newTask])
  }
  return (
    <NativeBaseProvider>
      <Center background="white" >
        <Box background="white">
          <Text fontSize="2xl" color="primary.500" fontWeight="bold" fontFamily="Roboto">
            Olá, mundo!
          </Text>
        </Box>
      </Center>
      <AddTask onAddTask={addTask}></AddTask>
      <ListTasks taskList={tasks}></ListTasks>
    </NativeBaseProvider>
    
  );  
}
