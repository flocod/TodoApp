import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { FIREBASE_DB } from '../../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

import Ionicons  from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import {Entypo} from '@expo/vector-icons';

export interface Todo {
    title: string;
    done: boolean;
    id: string;
}


const List = ({ navigation }: any) => {

    const [todos, setTodos] = useState<any>([]);

    const [todo, setTodo] = useState('')

    useEffect(() => {
        const todoRef = collection(FIREBASE_DB, 'todos')
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                console.log('UPDATED');
                const todos: any[] = [];
                snapshot.docs.forEach(doc => {
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    } as Todo)
                });

                setTodos(todos);

            }
        });

        return () => {
            subscriber();
        };
    }, []);


    const addTodo = async () => {
        const doc = await addDoc(collection(FIREBASE_DB, 'todos'), { title: todo, done: false });
        console.log("add Todo : ", doc);
        setTodo('')
    }


    const renderTodo = ({ item }: any) => {

        const ref = doc(FIREBASE_DB, `todos/${item.id}`)

        const toggleDone = async ()=>{
            updateDoc(ref, {done: !item.done })
        }
        const deleteItem = async ()=>{
            deleteDoc(ref);
        }

        return (
            <View style= {styles.todoContainer}>
                <TouchableOpacity style={styles.todo} onPress={toggleDone}>
                    {item.done && <AntDesign name="checkcircleo" size={32} color="green" />}
                    { ! item.done && <Entypo name='circle' size={32} color="black"/>}
                    <Text style={styles.todoText}>{item.title}</Text>

                </TouchableOpacity>

                <Ionicons name="trash-bin-outline" size={24} color={"red"} onPress={deleteItem}/>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Add new todo' onChangeText={(text: string) => setTodo(text)} value={todo}></TextInput>
                <Button onPress={addTodo} title='Add Todo' disabled={todo === ''}></Button>
            </View>

            {
                todos.length > 0 && (
                    <View>
                        <FlatList data={todos}
                            renderItem={renderTodo}
                            keyExtractor={(todo: Todo) => todo.id}
                        />
                    </View>
                )
            }


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    form: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',

    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 4,
    }, 
    todoText:{
        flex: 1 , 
        paddingHorizontal : 7, 
    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default List;
