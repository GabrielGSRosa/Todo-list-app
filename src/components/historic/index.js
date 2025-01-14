import React from 'react';
import { StyleSheet, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

export default function Historic({ data, handleRestoreTask, handleDelete }) {
    // console.log(`Data: ${data.key}`)

    const handleRecovery = () => {
        handleRestoreTask(data); // Chama a função passada pelo componente pai
      };
    
      const handleDeleteHist = () => {
        handleDelete(data);
    }

    return (
        <Animatable.View style={styles.container}>
            <AntDesign name='retweet' size={30} color="#000" onPress={handleRecovery} />
            <Text style={styles.tasks}>{data.key}</Text>
            <FontAwesome name="trash-o" size={30} color="black" onPress={handleDeleteHist}/>
      </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        justifyContent: 'space-between',
    },
      tasks: {
        color: '#121212',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 20,
    },
})
