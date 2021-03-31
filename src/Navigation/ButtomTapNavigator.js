import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeStackScreen,NotificationStackScreen,ProfileStackScreen} from './StackNavigator';
import {Ionicons,FontAwesome5,MaterialCommunityIcons} from '@expo/vector-icons'; 
const ButtomTab = createBottomTabNavigator();

const ButtomTapNavigator= ()=>{
    return (
    <ButtomTab.Navigator 
        //screenOptions
    >
        <ButtomTab.Screen
            name = "Home"
            component={HomeStackScreen} 
            options={{
                tabBarLabel:'Home',
                tabBarIcon:({color,size})=>{
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                }
            }}
            
        />
        <ButtomTab.Screen
            name = "Notification" 
            component={NotificationStackScreen}
            options={{
                tabBarLabel:'Notification',
                tabBarIcon:({color,size})=>{
                    <MaterialCommunityIcons name="bell" color={color} size={size} />
                }
            }}
        />
        <ButtomTab.Screen 
            name = "Profile" 
            component= {ProfileStackScreen}
            options={{
                tabBarLabel:'Profile',
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }}
        />
    </ButtomTab.Navigator>
    );
}

export default ButtomTapNavigator;