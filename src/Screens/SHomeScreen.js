import React,{useState,useEffect} from 'react';
import {FlatList,SafeAreaView,Platform,View,Text,StyleSheet, TouchableOpacity, Switch} from 'react-native';
import schoolApi from '../api/schoolapi';
import Item from '../Components/Item';
import { useAuth } from '../Context/AuthContext';


const SHomeScreen= ()=>{
    const infotext = 'Hello, I am staff';
    const [nearbyParents, setNearbyParents] = useState(null);
    const {auth,state:useAuthState} = useAuth();
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
        getNearbyParents();
        const interval=setInterval(()=>{
            getNearbyParents();
           },100000)
             
             
           return()=>clearInterval(interval)
    },[])
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

