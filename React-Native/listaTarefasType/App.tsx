import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider, Center, Text, Box } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <Center background="white" >
        <Box background="white">
          <Text fontSize="2xl" color="primary.500" fontWeight="bold" fontFamily="Roboto">
            Olá, mundo!
          </Text>
        </Box>
      
      </Center>
    </NativeBaseProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
