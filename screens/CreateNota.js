import React,{useState} from "react";
import { StyleSheet, View,Button,TextInput,ScrollView } from 'react-native';
import firebase from "../database/firebase";

const CreateNota =(props) =>{

    const [state,setState]= useState({
        nota:"",
        descripcion:"",
    });

    const handleChangeText =(name,value) =>{
        setState({...state,[name]:value})
    };

    const AddNewPost= async()=>{
        if(state.name ===""){
            alert("Add a title")
        } else{
            await firebase.db.collection("notas").add({
                nota:state.nota,  
                descripcion:state.descripcion,          
            });
            props.navigation.navigate("NotaList");
        } 
    
    };
    return(
        <ScrollView>
            <View>
                
                <TextInput 
                    style={styles.input}
                    placeholder="Add todo"
                    onChangeText={ (value) => handleChangeText("nota",value) }
                />

                <TextInput
                    style={styles.input} 
                    placeholder="Add description"
                    onChangeText={ (value) => handleChangeText("descripcion",value) }
                    
                />

                <View>
                    <Button 
                        title="Save"
                        onPress={()=> AddNewPost()}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 30,
      margin: 12,
      padding: 10,
    },
  });

export default CreateNota;