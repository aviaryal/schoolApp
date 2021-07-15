import React,{useState,useEffect} from 'react';
import {FlatList,SafeAreaView,Platform,View,Text,StyleSheet, TouchableOpacity, Switch} from 'react-native';
import schoolApi from '../api/schoolapi';
import Item from '../Components/Item';
import { useAuth } from '../Context/AuthContext';
import { useIsFocused } from "@react-navigation/native";

const SHomeScreen= ()=>{
    const infotext = 'Hello, I am staff';
    const [nearbyParents, setNearbyParents] = useState(null);
    const {auth,state:useAuthState} = useAuth();
    const isFocused = useIsFocused();
    const getNearbyParents = async ()=>
        {
            try
            {
                const response  = await schoolApi.get('school/getnearbyParents',{
                    
                    params: {
                        grade:'1',
                        value: 'hello',
                    }
                });
                //console.log("SHomeScreen After Making call",response.data)
                setNearbyParents(response.data);

                
            }
            catch(err)
            {
                console.log(err.message);
            }
        }
    useEffect(()=>{
        if(isFocused){
            getNearbyParents();
        }
        getNearbyParents();
        const interval=setInterval(()=>{
            getNearbyParents();
           },10000)
             
             
           return()=>clearInterval(interval)
    },[isFocused])
    //console.log("SHomeScreen NearByParents State",nearbyParents);
    const renderItem = ({item})=>{
        return (
            <Item
              item={item}
            />
          );
    }
    return (
        <SafeAreaView >
            <Text>{infotext}</Text>
            <FlatList
                
                data = {nearbyParents}
                keyExtractor = {item => ''+item.user} 
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
      }
});
export default SHomeScreen;

