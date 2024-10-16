import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "../types/RootStackParamList";
import {LoginScreen} from "./LoginScreen";
import {TaskScreen} from "./TaskScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = ()=>{
    return (
            <Stack.Navigator initialRouteName={"LoginScreen"}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="TaskScreen"  component={TaskScreen} options={{title: "Task"}}/>
            </Stack.Navigator>
    )
}