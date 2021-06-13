import React,{useState,useEffect} from 'react';
import {Platform,View,Text,StyleSheet, TouchableOpacity, Switch} from 'react-native';
import { useAuth } from '../Context/AuthContext';
import {checkPostion,askPermission, startTracking} from '../hooks/useLocation';



const PHomeScreen= ()=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const [lol,setLol]= useState(null);
    useEffect(()=>{
        (async()=>{
            askPermission();
        })
    }
    ,[]);
    //askPermission();
    //const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    const toggleSwitch =  async ()=>{
        let distance = await checkPostion();
        if(distance!=null && distance<=1000 || isEnabled){
            setIsEnabled(previousState => !previousState)
            console.log(distance);
            startTracking(isEnabled,setIsEnabled);
            
        }
    }
    const text1 = "I'm here";
    return (
        <View >
            
            <Text>{text1}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#90ee90" }}
                //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
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
export default PHomeScreen;

