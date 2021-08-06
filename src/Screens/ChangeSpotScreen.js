import React,{useState,useEffect} from 'react';
import {FlatList,SafeAreaView,Platform,View,Text,StyleSheet, TouchableOpacity, Switch, ScrollView, Alert} from 'react-native';
import schoolApi from '../api/schoolapi';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
const submitChangeLocation = async (item,spot,navigation)=>{
   
    try{
        const response = await schoolApi.post('school/getupdatepickupspot',{
            id: spot,
            newSpotId: item.item.id,
        });
        // Alert.alert(
        //     "Spot Changed",
        //     "New Spot" + item.item.pickup_spot,
        //     [
        //         {text:"OK", onPress:()=>{navigation.goBack()}}
        //     ]
        // );
    
        navigation.goBack();
        
    }
    catch(err){
        console.log(err);
    }
}
const ChangeSpotScreen = ({route})=>{
    console.log(route);
    const [state,setState] = useState({spots:[], selectedValue:-1})
    const navigation = useNavigation();
    useEffect(()=>{
        (async()=>{
            try {
                const response = await schoolApi.get('school/getallspot');

                 setState({spots:response.data});
            }
            catch(err){
                console.log(err);
            }
            
        })
        ();
       
    }
    ,[]);

    
    const renderSpot = (item) =>{
       try{
       return (<View>
           {/* <Text>{item.item.pickup_spot}</Text> */}
           {/* <Picker.Item  key={item.item.id} label= {item.item.pickup_spot} value={item.item.id}/> */}
           <TouchableOpacity style={styles.container} onPress={()=> {submitChangeLocation(item,route.params.spotID,navigation);}}>
               <Text style={styles.SpotStyle}>{item.item.pickup_spot}</Text>
           </TouchableOpacity>
       </View>)
       }
       catch(err){
           console.log(err);
       }
   }

    return(

        <SafeAreaView>
{/*             
            <Picker 
                selectedValue={state.selectedValue}
                onValueChange={(itemValue, itemIndex) => setState({selectedValue:itemValue})}
            >
                <Picker.Item label= "Select Value" value={state.selectedValue}/>
                {state.spots.map((item)=>{
                    return <Picker.Item  key={item.item.id} label= {item.item.pickup_spot} value={item.item.id}/>
                })}
                { <FlatList
                    data = {state.spots}
                    renderItem = {renderSpot}
                    keyExtractor = {item => {  
                        return ''+item.id}}
                /> }

                
                

            </Picker> */}
             { <FlatList
                    data = {state.spots}
                    renderItem = {renderSpot}
                    keyExtractor = {item => {  
                        return ''+item.id}}
                /> }


            
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor:"#000",
        alignItems: "center",
        justifyContent: "center"
      },
      SpotStyle:{
          borderColor:"#000",
        margin:5,
        padding:10,
        fontSize:16,
        fontWeight:"bold",
        color:"#f90",

      
      }
});
export default ChangeSpotScreen;