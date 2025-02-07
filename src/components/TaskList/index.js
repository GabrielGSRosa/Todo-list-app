import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

export default function TaskList( {data, handleDelete} ){
    return(
        <Animatable.View style={styles.container} animation='bounceIn' useNativeDriver>
            <TouchableOpacity>
                <AntDesign name='checkcircleo' size={30} color="#000" onPress={() => handleDelete(data)}/>
            </TouchableOpacity>
            <View>
                <Text style={styles.tasks}>{data.task}</Text>
            </View>
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
    },
    tasks: {
        color: '#121212',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 20,
    }
})