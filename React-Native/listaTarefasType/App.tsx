import {NativeBaseProvider} from 'native-base';
import {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {AppNavigator} from "./components/AppNavigator";

export default function App() {
  const [tasks, setTasks] = useState<string[]>([])

  const addTask = (newTask: string) =>{
    setTasks([...tasks, newTask])
  }
  return (
        <NativeBaseProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </NativeBaseProvider>
    
  );  
}
