import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { useRoute } from '@react-navigation/native';
import schoolApi from '../api/schoolapi';

const renderChildren = ({item}) =>{
    return <View>
        {console.log(item)}
        <Text>Student: {item.first_name} {item.last_name}</Text>
        <Text>Grade:{item.grade}</Text>

    </View>
}
const StudentPickupScreen= ({item})=>{
    const route = useRoute();
    const [child, setChild] = useState(route.params.item)
    return (
        <View>
            <Text> Parents/Gurdain:  {child.first_name} {child.last_name} </Text>
            <FlatList 
                data = {child.children}
                keyExtractor = {item => ''+item.id} 
                renderItem = {renderChildren}/>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default StudentPickupScreen;

