import React,{useEffect,useState} from 'react';
import {Platform} from 'react-native';
import * as Location from 'expo-location';
//import * as TaskManager from 'expo-task-manager';
import schoolApi from '../api/schoolapi';
import * as geolib from 'geolib';

const Location49 ={
  latitude: 32.72591122923342,
  longitude: -97.11232723757111
}
export const askPermission= ()=>{
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      // let {bgstatus} = await Location.requestBackgroundPermissionsAsync();
      // if (bgstatus !== 'granted') {
      //   setErrorMsg('Permission to access location was denied');
      //   return;
      // }
    })();
  }, []);
};

export const checkPostion= async ()=>{
  let location = null;
  try{
    location = await Location.getCurrentPositionAsync({
      accuracy:Location.Accuracy.BestForNavigation
    });
    console.log(location);
    return getDistance(location);
  }
  catch(err)
  {
    console.log(err)
  }
};
const getDistance = (location)=>{
  return geolib.getDistance({latitude:location.coords.latitude,longitude:location.coords.longitude},
    {latitude:Location49.latitude,longitude:Location49.longitude});
}

export const startTracking= async (isEnabled,setIsEnabled)=>{
  
  try{
    const value = await Location.watchPositionAsync({
      accuracy:Location.Accuracy.Balanced
    },async (location)=>{
      if(getDistance(location)>1000){
        setIsEnabled(false);
      }
      else
      {
        console.log(location.coords.latitude);
        let response= null;
        try{
          response = await schoolApi.post('locations/current',{
            timestamp : location.timestamp,
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
          })
        }
        catch(e)
        {
          console.log(e);
        }
        
      }
    })
  }
  catch(err)
  {

  }
}

// const GEO_FENCING= 'school';
// const BACKGROUND_TRACKER='tracker';
// TaskManager.defineTask(BACKGROUND_TRACKER, async ({ data: { locations }, error }) => {
//   if (error) {
//     // check `error.message` for more details.
//     return;
//   }
//  // console.log('Received new locations', locations[0]);
  
// });

// TaskManager.defineTask(GEO_FENCING, async ({ data: { eventType, region  }, error }) => {
//   if (error) {
//     // check `error.message` for more details.
//     console.log(error);
//     return;
//   }
//   if (eventType === Location.LocationGeofencingEventType.Enter) {
//     console.log("You've entered region:", region);
    
//   } else if (eventType === Location.LocationGeofencingEventType.Exit) {
//     console.log("You've left region:", region);
    
//   }
// });

// export const startBGTracking= async ()=>{
//     const loac= await Location.startLocationUpdatesAsync(BACKGROUND_TRACKER,{
//       accuracy: Location.Accuracy.BestForNavigation,
//     })
//     console.log('Hello', loac);
// };

// export const startGeoFencing= async () =>{
//   await Location.startGeofencingAsync(GEO_FENCING,[{
//     identifier:'schoolArea',
//     latitude:32.7259,
//     longitude:-97.1125,
//     radius:200,
    
    
//   }]) 
// };

// const stopGeoFencing = async ()=>{
//   await Location.stopGeofencingAsync(GEO_FENCING);
// };

// export const useBGTracking= async()=>{
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//       let {bgstatus} = await Location.requestBackgroundPermissionsAsync();
//       if (bgstatus !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//     })();
//   }, []);
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//     })();
//   }, []);

//   useEffect(()=>{
//     (async ()=>{
//       await Location.startGeofencingAsync(GEO_FENCING,[{
//             identifier:'schoolArea',
//             latitude:32.7259,
//             longitude:-97.1125,
//             radius:50,
//             }])
//     })
//   });
//   useEffect(()=>{
//     (async ()=>{
//       await Location.startLocationUpdatesAsync(BACKGROUND_TRACKER,{
//         accuracy:Location.Accuracy.High,
//       })
//     })
//   });

// };