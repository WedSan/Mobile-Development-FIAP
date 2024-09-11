import React, {useState} from "react";
import { FlatList, Box, Text } from "native-base";
import { useGlobalState } from "../hooks/GlobalState";
import { TaskItem } from "./TaskItem";

export const ListTasks: React.FC = () => {

    const {tasks} = useGlobalState();

    return (
        <FlatList
            data={tasks}
            renderItem={({ item }) => (
                <TaskItem id={item.id} title={item.title}></TaskItem>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{width: '100%', backgroundColor: '#402291'}}
        />
    );
};
