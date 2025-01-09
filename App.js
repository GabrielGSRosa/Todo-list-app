import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';


const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity)


export default function App() {
  const [task, setTask] = useState([])
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")

// Buscando todas as tarefas ao abrir o app
useEffect(() => {
  async function loadTasks() {
    const taskStorage = await AsyncStorage.getItem('@task')

    if(taskStorage){
      setTask(JSON.parse(taskStorage))
    }
  }

  loadTasks()

}, []);

// Salvando caso tenha tarefa alterada
useEffect(() => {
  async function saveTasks(){
    await AsyncStorage.setItem('@task', JSON.stringify(task))
  }

  saveTasks()

}, [task]);



  function handleAdd(){
    if(input === "")return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data])
    setOpen(false)
    setInput('')
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key)
    alert(`Tarefa: ${data.key} Concluída!`)
    setTask(find)
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#171d31' barStyle="light-content" />
      
    <View style={styles.content}>
      <Text style={styles.title}>Minhas Tarefas</Text>
    </View>

    {/* Lista */}

    <FlatList 
    marginHorizontal={10}
    showsHorizontalScrollIndicator={false} 
    data={task}
    keyExtractor={ (item) => String(item.key)}
    renderItem={ ({ item }) => <TaskList data={item}  handleDelete={handleDelete}/>}
    /> 

    {/* Adicionar tarefas */}

    {/* Botão para abrir tela de adicionar tarefas */}
    <AnimatedBtn style={styles.fab} useNativeDriver animation='bounceInUp' duration={1500} onPress={ () => setOpen(true)}>
      <AntDesign name="pluscircleo" size={35} color="white" />
    </AnimatedBtn>


    {/* Tela para adicionar tarefas */}
    <Modal animationType="slide" transparent={false} visible={open}>
      <SafeAreaView style={styles.modal}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={{marginLeft: 5, marginRight: 5}} onPress={() => setOpen(false)}>
            <AntDesign name="leftcircleo" size={40} color={"#fff"} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Nova Tarefa</Text>
        </View>

        <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
          <TextInput 
          placeholder="Qual a sua nova tarefa?"
          style={styles.input}
          multiline={true}
          placeholderTextColor={'#747474'}
          value={input}
          onChangeText={(texto) => setInput(texto)}
          />
          
          <TouchableOpacity style={styles.hadleAdd} onPress={handleAdd}>
            <Text style={styles.hadleAddText}>Cadastrar</Text>
          </TouchableOpacity>
        </Animatable.View>

      </SafeAreaView>
    </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  content:{
    alignItems: 'center',
    marginTop: 15,
    elevation: 50,
    shadowColor: "#000",
  },
  title: {
    color: '#fff',
    textAling: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 30
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    elevation: 2,
    shadowOpacity: 0.2,
  },
  add: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
  },
  modal :{
    flex: 1,
    backgroundColor: "#171d31",
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    color: "#fff",
    fontSize: 35,
    marginLeft: 30,
  },
  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 9,
    height: 90,
    textAlignVertical: 'top',
    color: "#000",
    borderRadius: 5,
  },
  hadleAdd: {
    backgroundColor: "#fff",
    color: "#000",
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  hadleAddText: {
    textAlign: 'center',
    fontSize: 25,
  },
});
