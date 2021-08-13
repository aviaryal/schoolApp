import React,{useState,useEffect,useContext} from 'react';
import {Platform,View,Text,StyleSheet,Button, TouchableOpacity, Switch} from 'react-native';
import { useAuth } from '../Context/AuthContext';
import {checkPostion,askPermission, startTracking,stopTracking} from '../hooks/useLocation';
import {Context as schoolDetailsContext} from '../Context/schoolDetailContext';
import {Context as userInfoContext} from '../Context/CurrentUserContext';
import schoolApi from '../api/schoolapi';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

const defaultSpot = {id:"none", pickup_spot:{pickup_spot:"N/A"}};
function isEmpty(obj){
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}
const RenderSpot = (spot) =>{
    const navigation = useNavigation();
    let spotID = spot.spot.id;
    if(spot.spot.id !== "none"){
        return (<View>
            <Text style={styles.spotText}>PickUpDrop at: {spot.spot.pickup_spot.pickup_spot}</Text>
            <Button title="Change_Spot"
                onPress={()=>{
                    navigation.navigate('ChangeSpot',{spotID});
                }}
            />
        </View>)
    }
    else{
        return (<View/>)
    }
   
}
const PHomeScreen= ({navigation})=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const [watcher,setWatcher] = useState(null);
    const {state: schoolDetails} = useContext(schoolDetailsContext);
    const {state: userInfo} = useContext(userInfoContext)
    const [err,setErr] = useState('');
    const [spot,setSpot] = useState(defaultSpot);
    const [isNear, setIsNear] = useState(false);
    const isFocused = useIsFocused();

    const getSpotNO = async ()=>
    {
        try {
            const response = await schoolApi.get('school/getupdatepickupspot');
            if (!isEmpty(response.data.spot))
            {
                setSpot(response.data.spot);
            }
            else{
                setIsNear(false);
                setSpot(defaultSpot);
            }
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        if(isEnabled === false){
            try{
                stopTracking(watcher);
            }
            catch(err){
                console.log(err);
            }
        }
    }, [isEnabled])

    // Make Api Call every 5 seconds to get Spot when compoment is focused or is Near is true
    useEffect(()=>{
        if(isFocused){
            getSpotNO();
        }
        getSpotNO();
        const interval=setInterval(()=>{
            if(isNear){
                getSpotNO();
            }
           },5000);
        return()=>clearInterval(interval)
    }
    ,[isNear,isFocused]);
    askPermission();

    const props = {
        setWatcher,
        setErr,
        setIsEnabled,
        setIsNear,
    }
    //console.log(props);

    const toggleSwitch =  async ()=>{
        if(isEnabled)
        {
            setIsEnabled(false);
            setIsNear(false);
            setSpot(defaultSpot);
        }
        else{
            setIsEnabled(true);
            startTracking(props);
        }

        /* Bug with only getting postion so Comment. The above else statement will track objects*/ 
        // let distance = await checkPostion(props.schoolLocation);
        // console.log("PHomeScreen  Distance ",distance);
        // if(distance!=null  /*&& distance<=1000*/){
        //     setIsEnabled(previousState => !previousState)
        //     startTracking(props);
        // }
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

            {isNear ? <RenderSpot spot ={spot}/>: <View/>} 
            <Text>{err}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
    spotText:{
        alignContent:"center",
        padding:10,
        fontWeight:"bold",
        fontSize:18,
        color:"#f00",
    },
    errText:{
        alignContent:"center",
        padding:10,
        fontWeight:"bold",
        fontSize:16,
        color:"#f00",
    }
});

export default PHomeScreen;


