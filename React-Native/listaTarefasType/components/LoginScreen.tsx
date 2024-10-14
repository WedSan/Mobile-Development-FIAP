import React from "react";
import {Box, Button, IconButton, Input} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

type RootStackParamList = {
    LoginScreen: undefined;
    TaskScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

export const LoginScreen: React.FC = ()=>{

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigation = useNavigation<NavigationProp>();


    const sendLogIn = async () =>{
        const response: Response = await fetch("http://localhost:5000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        })

        if(!response.ok){
            throw new Error("Failed to login");
        }

        const data: {token: string}  = await response.json()
        const token: string = data.token;

        await AsyncStorage.setItem("token", token);
        navigation.navigate("TaskScreen");
    }

    return(
        <Box>
            <Input value={username} onChangeText={setUsername} placeholder="Username" />
            <Input value={password} type={'password'} onChangeText={setPassword} placeholder="Password"></Input>
            <Box>
                <Button onPress={sendLogIn} > Send </Button>
            </Box>

        </Box>
    )
}