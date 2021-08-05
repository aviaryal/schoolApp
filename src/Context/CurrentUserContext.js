import React from 'react';
import schoolApi from '../api/schoolapi';
import createContext from './CreateContext'; 
const infoReducer = (state, action) => {
    switch (action.type) {
      case 'fetch_info':
        return action.payload;
      default:
        return state;
    }
  };
  
  const fetch_info = dispatch => async () => {
    const response = await schoolApi.get('accounts/current_user');
    // console.log("FetchInfo ", response.data);
    dispatch({ type: 'fetch_info', payload: response.data });
  };
  
  
  export const { Provider, Context } = createContext(
    infoReducer,
    {fetch_info},
    []
  );







// import { useMemo } from 'react';
// import { useReducer } from 'react';

// import createContext from './CreateContext';


// export const InfoContext = React.createContext();
// export function useInfo(){
//     const [infostate,dispatch] = useReducer(
//         (prevState, actions)=>{
//             switch(actions.type){
//                 case 'fetch_info':
//                     return action.payload;
//                 default:
//                     return state;
//             }
//         }
//     );
//     const infofun = useMemo(
//         ()=>({
//             fetch_info: async data => {
//                     const response = await schoolApi.get('accounts/current_user');
//                     console.log(response.data);
//                     dispatch({ type: 'fetch_info', payload: response.data });    
//             }
//         }),
//         []
//     );
//     const fetch_data = async ()=>{
//         const response = await schoolApi.get('accounts/current_user');
//         console.log(response.data);
//         dispatch({ type: 'fetch_info', payload: response.data });   
//     }

//     return [fetch_data, infostate];

// }