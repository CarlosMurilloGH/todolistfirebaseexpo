import React,{useEffect,useState} from "react";
import { Button} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";
import { ListItem } from "react-native-elements";

const NotaList = (props) =>{

    const [notas, setNotas] = useState([]);

    useEffect( ()=>{
        firebase.db.collection("notas").onSnapshot((querySnapshot) =>{

            const notas=[];

            querySnapshot.docs.forEach((doc)=>{
                const {nota,descripcion} = doc.data();
                notas.push({
                    id:doc.id,
                    nota,
                    descripcion
                });
            });
            console.log(notas)
            setNotas(notas)
        });
    },[]);

    return(
        <ScrollView>
            <Button 
                title="Add note"
                onPress={()=>props.navigation.navigate("CreateNota")}
            />
            {
                notas.map(nota=>{
                    return(
                        <ListItem 
                        key={nota.id}
                        bottomDivider
                        onPress={()=>props.navigation.navigate("NotaDetails",{
                            notaId:nota.id
                        })}
                        >
                            <ListItem.Chevron/>
                                <ListItem.Content>
                                    <ListItem.Title>{nota.nota}</ListItem.Title>
                                    <ListItem.Subtitle>{nota.descripcion}</ListItem.Subtitle>
                                </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    );
};

export default NotaList;