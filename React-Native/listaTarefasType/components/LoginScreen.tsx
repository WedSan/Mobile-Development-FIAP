import React from "react";
import {Box, Button, Center, FormControl, Heading, IconButton, Input, VStack} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {flexbox} from "native-base/lib/typescript/theme/styled-system";

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
      <Center w="100%" h="90%" alignItems="center" justifyContent="center">
          <Box safeArea p="2" py="8" w="90%" maxWidth="290">
              <Heading size="lg" fontWeight="600" color="purple.500">
                  Task List
              </Heading>
              <Heading mt="1" fontSize="medium" size="xs">
                  Sign in
              </Heading>
              <VStack space="3" mt="5">
                  <FormControl>
                      <FormControl.Label> Username </FormControl.Label>
                      <Input value={username} onChangeText={setUsername} placeholder="Username" />
                  </FormControl>

                  <FormControl>
                      <FormControl.Label> Password </FormControl.Label>
                      <Input value={password} type={'password'} onChangeText={setPassword} placeholder="Password"></Input>
                  </FormControl>

              </VStack>
              <Box mt="5">
                  <Button onPress={sendLogIn} colorScheme="purple"> Send </Button>
              </Box>
          </Box>
        </Center>
    )
}