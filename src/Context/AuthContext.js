import React from 'react';
import schoolapi from '../api/schoolapi';
import CreateContext from './CreateContext';

const authReducer = (state,action) =>{

}

const signin = (dispatch) => async ({email,password}) =>{
    try
    {
        const response = await schoolapi.post('/signin',{email,password});
        
    }
    catch(err){

    }
};

const signout = (dispatch) => async()=>{

}

export const {Provider, Context} = CreateContext(
    authReducer,
    {signin, signout,signup},
    {}
);