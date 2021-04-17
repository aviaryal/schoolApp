import React from 'react';
import schoolapi from '../api/schoolapi';
import CreateContext from './CreateContext';

const authReducer = (state,action) =>{
    switch(action.type){
        default:
            return state;
    }
};

const signIn = (dispatch) => async ({email,password}) =>{
    try
    {
        const response = await schoolapi.post('/signin',{email,password});
        
    }
    catch(err){
        dispatch({
 
        });

    }
};

const signout = (dispatch) => async()=>{

}

export const {Provider, Context} = CreateContext(
    authReducer,
    {signIn, signout},
    {}
);