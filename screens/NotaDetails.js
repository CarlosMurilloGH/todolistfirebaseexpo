import React,{useEffect, useState} from "react";
import { ActivityIndicator } from "react-native";
import { View,Button,TextInput,ScrollView, Alert } from 'react-native';
import firebase from "../database/firebase";

const NotaDetails =(props) =>{

    const initialState={
       
        id:"",
        nota:"",
        descripcion:"",
       
    };
    
    const [nota, setNota] = useState(initialState);

    const [cargando, setCargando] = useState(true)
    
    const getNotaById = async(id) =>{
        const dbRef =firebase.db.collection("notas").doc(id);
        const doc = await dbRef.get();
        const nota = doc.data();
        setNota({
            ...nota,
            id:doc.id,
        });
        setCargando(false)
    };
    
    useEffect(()=>{
        getNotaById(props.route.params.notaId)
    },[]);

    const handleChangeText =(name,value) =>{
        setNota({...nota,[name]:value})
    };

    const borrarNota = async () =>{
       const dbRef= firebase.db.collection("notas").doc(props.route.params.notaId);
        await dbRef.delete();
        props.navigation.navigate("NotaList")
    }

    const confirmacionBorrado = ()=>{
        Alert.alert("Delete todo", "¿are you sure?",[
            {text:"Yes", onPress:() => borrarNota()},
            {text:"No", onPress:() => console.log(false)},           
        ])
    }

    const editarNota = async() =>{
        const dbRef=firebase.db.collection("notas").doc(nota.id);
        await dbRef.set({
            nota:nota.nota,
            descripcion:nota.descripcion,
        });
        setNota(initialState)
        props.navigation.navigate("NotaList");
    };

    if(cargando){
        return(
            <View>
                <ActivityIndicator
                    size="large"
                    color="black"
                />
            </View>
        )
    }

    return(
        <ScrollView>
            <View>
                
                <TextInput 
                    placeholder="Add todo"
                    onChangeText={ (value) => handleChangeText("nota",value)}
                    value={nota.nota} 
                    
                />

                <TextInput 
                    placeholder="Add description"
                    onChangeText={ (value) => handleChangeText("descripcion",value)}
                    value={nota.descripcion}  
                    
                />

                <View>
                    <Button 
                        title="Edit"
                        onPress={()=> editarNota()}
                    />
                </View>

                <View>
                    <Button 
                            color="#c82333"
                            title="Delete"
                            onPress={()=>confirmacionBorrado()}                            
                        />
                </View>
            </View>
        </ScrollView>
    )
}

export default NotaDetails;