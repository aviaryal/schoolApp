import React,{useState,useEffect} from 'react';
import {FlatList,SafeAreaView,Platform,View,Text,StyleSheet, TouchableOpacity, Switch, ScrollView} from 'react-native';
import schoolApi from '../api/schoolapi';
import Item from '../Components/Item';
import { useAuth } from '../Context/AuthContext';
import { useIsFocused } from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';

const SHomeScreen= ()=>{
    const infotext = "Pick Grade";
    const [nearbyParents, setNearbyParents] = useState(null);
    const {auth,state:useAuthState} = useAuth();
    const isFocused = useIsFocused();
    const [selectedValue, setSelectedValue] = useState("ALL");
    
    const getNearbyParents = async ()=>
        {
            try
            {
                const response  = await schoolApi.get('school/getnearbyParents',{
                    
                    params: {
                        grade:selectedValue,
                        
                    }
                });
                //console.log("SHomeScreen After Making call",response.data)
                setNearbyParents(response.data);     
            }
            catch(err)
            {
                console.log(err.message);
            }
        };
    useEffect(()=>{
        if(isFocused){
            getNearbyParents();
        }
        getNearbyParents();
        const interval=setInterval(()=>{
            getNearbyParents();
           },5000)
             
             
           return()=>clearInterval(interval)
        
    },[isFocused,selectedValue])
    //console.log("SHomeScreen NearByParents State",nearbyParents);
    const renderItem = ({item})=>{
        return (
            <Item
              item={item}
            />
          );
    }
    return (
        <SafeAreaView  >
            <Text>{infotext} </Text>
            <Picker 
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="All" value="ALL" />
                <Picker.Item label="KinderGarden" value="0"/>
                <Picker.Item label="One" value="1"/>
                <Picker.Item label="Two" value="2"/>
                <Picker.Item label="Three" value="3"/>
                <Picker.Item label="Four" value="4"/>
                <Picker.Item label="Five" value="5"/>

            </Picker>
            
           
                <FlatList
                    
                    data = {nearbyParents}
                    showsVerticalScrollIndicator
                    keyExtractor = {item => ''+item.id} 
                    renderItem = {renderItem}  
                    
                />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        alignItems: "center",
        justifyContent: "center"
      },
      pickerstyle:{
        height: 50, width: 150
      
      }
});
export default SHomeScreen;

