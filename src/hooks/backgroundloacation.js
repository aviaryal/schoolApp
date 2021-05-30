import React,{useEffect,useState} from 'react';
import {Platform} from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import schoolApi from '../api/schoolapi';

const GEO_FENCING= 'school';
const BACKGROUND_TRACKER='tracker';
TaskManager.defineTask(BACKGROUND_TRACKER, async ({ data: { locations }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
 // console.log('Received new locations', locations[0]);
  
});

TaskManager.defineTask(GEO_FENCING, async ({ data: { eventType, region  }, error }) => {
  if (error) {
    // check `error.message` for more details.
    console.log(error);
    return;
  }
  if (eventType === Location.LocationGeofencingEventType.Enter) {
    console.log("You've entered region:", region);
    
  } else if (eventType === Location.LocationGeofencingEventType.Exit) {
    console.log("You've left region:", region);
    
  }
});
export const askPermission= ()=>{
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let {bgstatus} = await Location.requestBackgroundPermissionsAsync();
        if (bgstatus !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      })();
    }, []);
};

export const startBGTracking= async ()=>{
    const loac= await Location.startLocationUpdatesAsync(BACKGROUND_TRACKER,{
      accuracy: Location.Accuracy.BestForNavigation,
    })
    console.log('Hello', loac);
};

export const startGeoFencing= async () =>{
  await Location.startGeofencingAsync(GEO_FENCING,[{
    identifier:'schoolArea',
    latitude:32.7259,
    longitude:-97.1125,
    radius:200,
    
    
  }]) 
};

const stopGeoFencing = async ()=>{
  await Location.stopGeofencingAsync(GEO_FENCING);
};

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