import React from 'react';
import schoolApi from '../api/schoolapi';
import createContext from './CreateContext'; 
const schoolDetailsReducer = (state, action) => {
    switch (action.type) {
      case 'get_details':
        return action.payload;
      default:
        return state;
    }
  };

  const getSchoolDetails = dispatch => async ()=>{
    try{
      const response = await schoolApi.get('school/school_details/');
      //console.log('From schoolDeaitl.js ', response.data);
      dispatch({type:'get_details', payload:response.data});
    }
    catch(err)
    {
      console.log(err);
    }
  }
  export const { Provider, Context } = createContext(
    schoolDetailsReducer,
    {getSchoolDetails},
    []
  );