import React,{useEffect,useState,useContext} from 'react';
import {Platform} from 'react-native';
import * as Location from 'expo-location';
//import * as TaskManager from 'expo-task-manager';
import schoolApi from '../api/schoolapi';
import * as geolib from 'geolib';

export const askPermission= ()=>{
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);
};

// export const checkPostion= async (schoolLocation)=>{
//   let location = null;
//   try{
//     location = await Location.getCurrentPositionAsync({
//       accuracy:Location.Accuracy.BestForNavigation
//     });
//     // console.log(location);
//     return getDistance(location,schoolLocation);
//   }
//   catch(err)
//   {
//     console.log(err)
//   }
// };
// const getDistance = (location,schoolLocation)=>{
//   //console.log('From getDistance',schoolLocation);
//   try{
//     return geolib.getDistance({latitude:location.coords.latitude,longitude:location.coords.longitude},
//       {latitude:schoolLocation.latitude,longitude:schoolLocation.longitude});
//   }
//   catch(err)
//   {
//     console.log(err);
//   }
  
// }

export const startTracking= async (props)=>{
  try{
    let picked= 'false';
    let distance = 10000;
    const value = await Location.watchPositionAsync({
          accuracy:Location.Accuracy.BestForNavigation
        },async (location)=>{
            try{
                response = await schoolApi.post('school/updateguardainLocation',{
                latitude : location.coords.latitude,
                longitude : location.coords.longitude,
              })
             
              distance = response.data.distance;
              picked = response.data.picked;
              console.log('useLocation.js Distance',distance);
              if(response.data.picked == "true"){
                props.setIsEnabled(false);
                props.setIsNear(false);
              }
              if(distance>3000){
                props.setIsEnabled(false);
                props.setErr('You need to be within 3km radius to used location tracking services');
              }
              else{
                props.setErr('');
              }
              if(distance < 500){
                props.setIsNear(true);

              }
              else{
                props.setIsNear(false);
              }
          }
          catch(e)
          {
            props.setIsEnabled(false);
            props.setIsNear(false);
            props.setErr('Error');
            console.log(e);
          } 
    })
    props.setWatcher(value);
    
  }
  catch(err)
  {

  }
}

export const stopTracking =  (watcher)=>{
  try{
    watcher.remove();
  }
  catch(e){

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