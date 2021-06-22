import React,{useState,useEffect} from 'react';
import {Platform,View,Text,StyleSheet, TouchableOpacity, Switch} from 'react-native';
import schoolApi from '../api/schoolapi';



const SHomeScreen= ()=>{
    const infotext = 'Hello, I am staff';
    const [nearbyParents, setNearbyParents] = useState(null);

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
                setNearbyParents(response.data);
            }
            catch(err)
            {
                console.log(err.message);
            }
        }
    
    useEffect(()=>{
        getNearbyParents();
        const interval=setInterval(()=>{
            getNearbyParents();
           },1000000)
             
             
           return()=>clearInterval(interval)
    },[])
    console.log(nearbyParents);
    return (
        <View >
            <Text>{infotext}</Text>
        </View>
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

