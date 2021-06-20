import React,{useState,useEffect,useContext} from 'react';
import {Platform,View,Text,StyleSheet, TouchableOpacity, Switch} from 'react-native';
import { useAuth } from '../Context/AuthContext';
import {checkPostion,askPermission, startTracking,stopTracking} from '../hooks/useLocation';
import {Context as schoolDetailsContext} from '../Context/schoolDetailContext';
import {Context as userInfoContext} from '../Context/CurrentUserContext';

const PHomeScreen= ()=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const [watcher,setWatcher] = useState(null);
    const {state: schoolDetails} = useContext(schoolDetailsContext);
    const {state: userInfo} = useContext(userInfoContext)
    const [err,setErr] = useState(null);
    console.log('PHomeScreen',schoolDetails);
    
    // useEffect(()=>{
    //     (async()=>{
    //         askPermission();
    //     })
    //     ();
    // }
    // ,[]);
    askPermission();
    const props = {
        setWatcher,
        setErr,
        setIsEnabled,
        schoolLocation:schoolDetails[0],
    }
    console.log(props);

    const toggleSwitch =  async ()=>{
          
       
        if(isEnabled)
        {
            setIsEnabled(previousState => !previousState)
            stopTracking();
            return;
        }
        let distance = await checkPostion(props.schoolLocation);
        if(distance!=null && distance<=1000){
            setIsEnabled(previousState => !previousState)
            console.log(distance);
            //startTracking(isEnabled,setIsEnabled,schoolDetails[0],user_id);
            startTracking(props);
            
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

