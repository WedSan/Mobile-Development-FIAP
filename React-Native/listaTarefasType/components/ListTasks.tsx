import React from "react";
import { FlatList, Box, Text } from "native-base";

interface ListTasksProps {
    taskList: string[];
}

export const ListTasks: React.FC<ListTasksProps> = ({ taskList }) => {

    return (
        <FlatList
            data={taskList}
            renderItem={({ item }) => (
                <Box
                    bg="gray.200"
                    p={4}
                    alignItems="flex-start"
                    my={2}
                    mx={2}
                >
                    <Text>{item}</Text>
                </Box>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
        />
    );
};
