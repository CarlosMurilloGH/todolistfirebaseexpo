import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateNota from './screens/CreateNota';
import NotaDetails from './screens/NotaDetails';
import NotaList from './screens/NotaList';


const Stack= createStackNavigator();


function MyStack(){
  return(
    <Stack.Navigator>
      

      <Stack.Screen 
        name="NotaList" component={NotaList} options={{title:"Todo List"}}/>
        
      <Stack.Screen 
        name="CreateNota" component={CreateNota} options={{title:"Add todo"}}/>

      
      


      <Stack.Screen 
        name="NotaDetails" component={NotaDetails} options={{title:"Details"}}/>

    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

