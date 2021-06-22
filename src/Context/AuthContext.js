import React from 'react';
import schoolApi from '../api/schoolapi';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = React.createContext();
export function useAuth(){
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.data.token,
                is_staff: action.data.is_staff,
                isLoading: false,
            };
            case 'SIGN_IN':
            return {
                ...prevState,
                isSignout: false,
                //userToken: action.token,
                userToken: action.data.token,
                is_staff: action.data.is_staff
                
            };
            case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
                is_staff: false,
            };
        }
        },
        {
        isLoading: true,
        isSignout: false,
        userToken: null,
        is_staff: false,
        }
    );

 
    const auth = React.useMemo(
        () => ({
          signIn: async data => {
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
            // In the example, we'll use a dummy token
            try{
                const response = await schoolApi.post('accounts/login',{
                    username: data.email,
                    password: data.password
                })
                await SecureStore.setItemAsync("token",response.data.token);
                await SecureStore.setItemAsync("is_staff", response.data.is_staff?
                  "true": "false" 
                );
                dispatch({ type: 'SIGN_IN', data:response.data});
            }
            catch(err)
            {
                console.log(err);
            }
            
          },
          signOut: async () =>{
              await SecureStore.deleteItemAsync("token");
              dispatch({ type: 'SIGN_OUT' })
            },

        }),
        []
    );
    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const localtoken = async () => {
            let userToken=null;
            let isStaff = null;
          try {
            userToken = await SecureStore.getItemAsync("token");
            isStaff = await SecureStore.getItemAsync("is_staff");
          } catch (e) {
              // Restoring token failed
              await SecureStore.deleteItemAsync("token");
              dispatch({ type: 'SIGN_OUT' })
          }
    
          // After restoring token, we may need to validate it in production apps
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          if(userToken && isStaff){
            const data= {
              token : userToken,
              is_staff: isStaff=="true"? true:false,
            }
            // console.log(data)
            dispatch({ type: 'RESTORE_TOKEN', data});
          }
        };
    
        localtoken();
      }, []);

    return {auth, state};
}