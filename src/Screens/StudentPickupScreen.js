import React,{useState,useEffect} from 'react';
import {CheckBox,View,Text,StyleSheet, TouchableOpacity, FlatList, Button, SafeAreaView, Switch, Alert} from 'react-native';
import { useRoute } from '@react-navigation/native';
import schoolApi from '../api/schoolapi';
import { useNavigation } from '@react-navigation/native';
const submitSeletedStudents = async  (parents, children,navigation)=>{

      const datas = children.filter((item) => item.isSelected).map((item)=>item.id);
      try
      {
        const response = await schoolApi.post('school/updatePickUpDropOff',{
          parent: parents.id,
          spot: parents.spot.id,
          ids: datas,
        })
        //navigation.navigate("Home");
        navigation.goBack();
      }
      catch(err)
      {
        console.log(err);
        Alert.alert("Error", err.message);
      } 
 
};
const StudentPickupScreen= ({item})=>{
    const navigation = useNavigation();
    const route = useRoute();
    const [parents, setParents] = useState(route.params.item);
    const [children, setChildren] = useState(()=>{
        let newArray = [...parents.children];
        newArray.forEach((element)=>{
            element.isSelected = false
        })
        return newArray;
    });
    const onUpdateValue = (index, value) => { children[index].isSelected = value; return setChildren([...children]);}
    const renderItem = ({ item, index }) => {return (<ItemRenderer key={index} index={index} item={item} onUpdateValue={onUpdateValue} />)};
    return (
      <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
              
                  <FlatList
                    data={children}
                    renderItem={renderItem}
                    keyExtractor={(item)=>{return ''+item.id}}
                  />
                <TouchableOpacity style={styles.button}
                    onPress={()=>{submitSeletedStudents(parents, children,navigation);}}
                >
                    <Text style = {styles.textColor}> Submit</Text>
                </TouchableOpacity>
            </View>
         
      </SafeAreaView>
    );
  }
  
  const ItemRenderer = ({ index, item, onUpdateValue }) => {
  return (<View style={styles.item}>
    
    <Text style = {styles.textStudent}>Student: {item.first_name} {item.last_name}</Text>
    <Text style = {styles.textStudent}>Grade:{item.grade}</Text>
    <Switch value={item.isSelected} onValueChange={(value) => onUpdateValue(index, value)} />
    
  </View>)};
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    item: {
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC55',
        backgroundColor: "#fa5b3d",
        borderWidth:2,
        borderColor: 'rgba(255,255,255,5)'
    },
    tabHeading: {
        padding: 20,
        flexDirection: 'row',
    },
    title: {
        textTransform: 'capitalize',
        color: '#000'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#fa5b3d",
        padding: 10
    },
    textColor:{
      fontSize:20,
      color:'white'
    },
    textStudent:{
      fontSize:15,
      color:'white'
    }
  });
export default StudentPickupScreen;
