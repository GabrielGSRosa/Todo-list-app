import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import TaskList from './src/components/TaskList';
import Historic from './src/components/historic';
import ListComponent from './src/components/list/ListComponent';



const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity)


export default function App() {
  const [task, setTask] = useState([])
  const [taskToday, setTaskToday] = useState([])
  const [taskWeek, setTaskWeek] = useState([])
  const [taskMonth, setTaskMonth] = useState([])
  const [taskYear, setTaskYear] = useState([])
  const [oldTask, setOldTask] = useState([])
  const [openTask, setOpenTask] = useState([])
  const [openToday, setOpenToday] = useState(false)
  const [openWeek, setOpenWeek] = useState(false)
  const [openMonth, setOpenMonth] = useState(false)
  const [openYear, setOpenYear] = useState(false)
  const [openAdc, setOpenAdc] = useState(false)
  const [openHist, setOpenHist] = useState(false)
  const [input, setInput] = useState("")
  const [selectedValue, setSelectedValue] = useState("");




  
    // Buscando todas as tarefas ao abrir o app
    useEffect(() => {
      async function loadTasks() {
        const taskStorage = await AsyncStorage.getItem('@task')
        const taskStorageToday = await AsyncStorage.getItem('@taskToday')
        const taskStorageWeek = await AsyncStorage.getItem('@taskWeek')
        const taskStorageMonth = await AsyncStorage.getItem('@taskMonth')
        const taskStorageYear = await AsyncStorage.getItem('@taskYear')

        if(taskStorage || taskStorageToday || taskStorageWeek || taskStorageMonth || taskStorageYear){
          setTask(JSON.parse(taskStorage))
          setTaskToday(JSON.parse(taskStorageToday))
          setTaskWeek(JSON.parse(taskStorageWeek))
          setTaskMonth(JSON.parse(taskStorageMonth))
          setTaskYear(JSON.parse(taskStorageYear))
        }
      }

      loadTasks()

    }, []);

    // Salvando caso tenha tarefa alterada
    useEffect(() => {
      async function saveTasks(){
        await AsyncStorage.setItem('@task', JSON.stringify(task))
        await AsyncStorage.setItem('@taskToday', JSON.stringify(taskToday))
        await AsyncStorage.setItem('@taskWeek', JSON.stringify(taskWeek))
        await AsyncStorage.setItem('@taskMonth', JSON.stringify(taskMonth))
        await AsyncStorage.setItem('@taskYear', JSON.stringify(taskYear))
      }

      saveTasks()

    }, [task, taskToday, taskWeek, taskMonth, taskYear]);


    {/* Trata a adição de novas tarefas */}
  function handleAdd(){
    if(input === "" || selectedValue === "" ) {
      return;
    } 
    if (taskToday.includes(input) || taskWeek.includes(input) || taskMonth.includes(input)){
      alert(`A tarefa já existe em alguma categoria!`)
      return;
    }

    const data = {
      key: input,
      task: input
    };

    if(selectedValue === "Today"){
      setTaskToday([...taskToday, data])
    } else if(selectedValue === "Week") {
      setTaskWeek([...taskWeek, data])
    } else if (selectedValue === "Month") {
      setTaskMonth([...taskMonth, data])
    } else if (selectedValue === "Year") {
      setTaskYear([...taskYear, data])
    }

    setOpenAdc(false)
    setInput('')
  }

  {/* Trata a exclusão das tarefas e envia para o histórico */}
  {/* Trata a categoria 'free' */}
  const handleDelete = useCallback((data) => {
    setOldTask(prevOldTask => [...prevOldTask, {key: data.key, task: data.task}])

    // Filtra as tarefas e remove a tarefa concluída
    const find = task.filter(r => r.key !== data.key);
    alert(`Tarefa: ${data.key} Concluída!`);
    setTask(find);

  }, [task, oldTask]);

  {/* Trata a categoria 'Today' */}
  const handleDeleteToday = useCallback((data) => {
    setOldTask(prevOldTask => [...prevOldTask, {key: data.key, task: data.task}])

    // Filtra as tarefas e remove a tarefa concluída
    const find = taskToday.filter(r => r.key !== data.key);
    alert(`Tarefa: ${data.key} Concluída!`);
    setTaskToday(find);

  }, [taskToday, oldTask]);

  {/* Trata a categoria 'Week' */}
  const handleDeleteWeek = useCallback((data) => {
    setOldTask(prevOldTask => [...prevOldTask, {key: data.key, task: data.task}])

    // Filtra as tarefas e remove a tarefa concluída
    const find = taskWeek.filter(r => r.key !== data.key);
    alert(`Tarefa: ${data.key} Concluída!`);
    setTaskWeek(find);

  }, [taskWeek, oldTask]);

  {/* Trata a categoria 'Month' */}
  const handleDeleteMonth = useCallback((data) => {
    setOldTask(prevOldTask => [...prevOldTask, {key: data.key, task: data.task}])

    // Filtra as tarefas e remove a tarefa concluída
    const find = taskMonth.filter(r => r.key !== data.key);
    alert(`Tarefa: ${data.key} Concluída!`);
    setTaskMonth(find);

  }, [taskMonth, oldTask]);

  {/* Trata a categoria 'Year' */}
  const handleDeleteYear = useCallback((data) => {
    setOldTask(prevOldTask => [...prevOldTask, {key: data.key, task: data.task}])

    // Filtra as tarefas e remove a tarefa concluída
    const find = taskYear.filter(r => r.key !== data.key);
    alert(`Tarefa: ${data.key} Concluída!`);
    setTaskYear(find);

  }, [taskYear, oldTask]);



  const handleDeleteHist = useCallback((data) => {

    // Filtra as tarefas e remove a tarefa concluída
    alert(`Tarefa: ${data.key} Apagada!`);
    setOldTask((prevOldTask) => prevOldTask.filter((task) => task.key !== data.key));

  }, [task, oldTask]);


  const handleRestoreTask = useCallback((data) => {
    // Remove a tarefa do histórico
    setOldTask((prevOldTask) => prevOldTask.filter((task) => task.key !== data.key));
  
    // Adiciona a tarefa de volta à lista de tarefas ativas
    setTask((prevTask) => [...prevTask, { key: data.key, task: data.task }]);
  }, [oldTask, task]);
  



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#171d31' barStyle="light-content" />
      
      <View style={styles.content}>
        <Text style={styles.title}>My Tasks</Text>
      </View>

      {/* Listas */}

      <ScrollView>
      {/* Free */}
      <TouchableOpacity style={styles.childrens} onPress={() => setOpenTask(true)}>
          <ListComponent title={"Free"} itens={task.length}/>
        </TouchableOpacity>

          <Modal animationType="slide" transparent={false} visible={openTask}>
            <SafeAreaView style={styles.modal}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={{marginLeft: 5, marginRight: 5}} onPress={() => setOpenTask(false)}>
                    <AntDesign name="leftcircleo" size={40} color={"#fff"} />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Free</Text>
                </View>

              <FlatList 
                marginHorizontal={10}
                showsHorizontalScrollIndicator={false} 
                data={task}
                keyExtractor={ (item) => String(item.key)}
                renderItem={ ({ item }) => <TaskList data={item}  handleDelete={handleDelete}/>}
              />

            </SafeAreaView>
          </Modal>

          {/* Today */}
        <TouchableOpacity style={styles.childrens} onPress={() => setOpenToday(true)}>
          <ListComponent title={"Today"} itens={taskToday.length}/>
        </TouchableOpacity>

          <Modal animationType="slide" transparent={false} visible={openToday}>
            <SafeAreaView style={styles.modal}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={{marginLeft: 5, marginRight: 5}} onPress={() => setOpenToday(false)}>
                    <AntDesign name="leftcircleo" size={40} color={"#fff"} />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Today</Text>
                </View>

              <FlatList 
                marginHorizontal={10}
                showsHorizontalScrollIndicator={false} 
                data={taskToday}
                keyExtractor={ (item) => String(item.key)}
                renderItem={ ({ item }) => <TaskList data={item}  handleDelete={handleDeleteToday}/>}
              />

            </SafeAreaView>
          </Modal>

        {/* Week */}
        <TouchableOpacity style={styles.childrens} onPress={() => setOpenWeek(true)}>
          <ListComponent title={"Week"} itens={taskWeek.length}/>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={false} visible={openWeek}>
            <SafeAreaView style={styles.modal}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={{marginLeft: 5, marginRight: 5}} onPress={() => setOpenWeek(false)}>
                    <AntDesign name="leftcircleo" size={40} color={"#fff"} />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Week</Text>
                </View>

              <FlatList 
                marginHorizontal={10}
                showsHorizontalScrollIndicator={false} 
                data={taskWeek}
                keyExtractor={ (item) => String(item.key)}
                renderItem={ ({ item }) => <TaskList data={item}  handleDelete={handleDeleteWeek}/>}
              />

            </SafeAreaView>
          </Modal>


        {/* Month */}
        <TouchableOpacity style={styles.childrens} onPress={() => setOpenMonth(true)}>
          <ListComponent title={"Month"} itens={taskMonth.length}/>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={false} visible={openMonth}>
            <SafeAreaView style={styles.modal}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={{marginLeft: 5, marginRight: 5}} onPress={() => setOpenMonth(false)}>
                    <AntDesign name="leftcircleo" size={40} color={"#fff"} />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Month</Text>
                </View>

              <FlatList 
                marginHorizontal={10}
                showsHorizontalScrollIndicator={false} 
                data={taskMonth}
                keyExtractor={ (item) => String(item.key)}
                renderItem={ ({ item }) => <TaskList data={item}  handleDelete={handleDeleteMonth}/>}
              />

            </SafeAreaView>
          </Modal> 


        {/* Year */}
        <TouchableOpacity style={styles.childrens} onPress={() => setOpenYear(true)}>
          <ListComponent title={"Year"} itens={taskYear.length}/>
        </TouchableOpacity>
        
        <Modal animationType="slide" transparent={false} visible={openYear}>
            <SafeAreaView style={styles.modal}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={{marginLeft: 5, marginRight: 5}} onPress={() => setOpenYear(false)}>
                    <AntDesign name="leftcircleo" size={40} color={"#fff"} />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Year</Text>
                </View>

              <FlatList 
                marginHorizontal={10}
                showsHorizontalScrollIndicator={false} 
                data={taskYear}
                keyExtractor={ (item) => String(item.key)}
                renderItem={ ({ item }) => <TaskList data={item}  handleDelete={handleDeleteYear}/>}
              />

            </SafeAreaView>
          </Modal>

      </ScrollView>

      {/* Adicionar tarefas */}

      {/* Botão para abrir tela de adicionar tarefas */}
      <AnimatedBtn style={styles.fab} useNativeDriver animation='bounceInUp' duration={1500} onPress={ () => setOpenAdc(true)}>
        <AntDesign name="pluscircleo" size={35} color="white" />
      </AnimatedBtn>


      {/* Tela para adicionar tarefas */}
      <Modal animationType="slide" transparent={false} visible={openAdc}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={{marginLeft: 5, marginRight: 5}} onPress={() => setOpenAdc(false)}>
              <AntDesign name="leftcircleo" size={40} color={"#fff"} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Task</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput 
            placeholder="What is your new task?"
            style={styles.input}
            multiline={true}
            placeholderTextColor={'#747474'}
            value={input}
            onChangeText={(texto) => setInput(texto)}
            />
            <View style={pickerSelectStyles.containerPicker}>
              <Text style={styles.label}>Choice an option:</Text>
              <RNPickerSelect
                onValueChange={(value) => setSelectedValue(value)}
                items={[
                  { label: 'Today', value: 'Today' },
                  { label: 'Week', value: 'Week' },
                  { label: 'Month', value: 'Month' },
                  { label: 'Year', value: 'Year' },
                ]}
                placeholder={{ label: "Choice an option...", value: null }}
                style={pickerSelectStyles}
              />
              {selectedValue && <Text style={styles.selected}>Selected: {selectedValue}</Text>}
            </View>
            

            <TouchableOpacity style={styles.hadleAdd} onPress={handleAdd}>
              <Text style={styles.hadleAddText}>Register</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      {/* Botão para abrir o histórico de atividades */}
      <AnimatedBtn useNativeDriver animation='bounceInUp' duration={1500} style={styles.historicBtn}>
        <MaterialIcons name="history" size={45} color="white" onPress={() =>  setOpenHist(!openHist)} />
      </AnimatedBtn>

      {/* Modal de Histórico */}
        <Modal animationType="slide" transparent={false} visible={openHist}>
          <SafeAreaView style={styles.modal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={{marginLeft: 5, marginRight: 5}} onPress={() => setOpenHist(false)}>
                <AntDesign name="leftcircleo" size={40} color={"#fff"} />
              </TouchableOpacity>
              <Text style={styles.modalTitleHistoric}>Historic</Text>
            </View>

            <FlatList 
              marginHorizontal={10}
              showsHorizontalScrollIndicator={false} 
              data={oldTask}
              keyExtractor={(item) => String(item.key)}
              renderItem={({ item }) => <Historic data={item} handleRestoreTask={handleRestoreTask} handleDelete={handleDeleteHist} />}
            />

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
  childrens: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 2,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 30
  },
  label: {
    color: '#fff',
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
    zIndex: 1,
  },
  add: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
  },
  historicBtn: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: 'center',
    left: 25,
    bottom: 25,
    elevation: 2,
    shadowOpacity: 0.2,
    zIndex: 1,
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
    textAlign: 'center',
  },
  modalTitleHistoric: {
    color: "#fff",
    fontSize: 35,
    marginLeft: 50,
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
    marginTop: 55,
    borderRadius: 5,
  },
  hadleAddText: {
    textAlign: 'center',
    fontSize: 25,
  },
});

const pickerSelectStyles = StyleSheet.create({
  containerPicker: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    backgroundColor: '#fff',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#fff',
    paddingRight: 30,
    marginBottom: 10,
  },
});

