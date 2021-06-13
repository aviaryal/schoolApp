import React from 'react';
import schoolApi from '../api/schoolapi';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = React.createContext();

export function useAuth(){
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
              console.log('From Restore isStaff useReduce',action.response.is_staff);
            return {
                ...prevState,
                userToken: action.response.token,
                isLoading: false,
                isStaff:action.response.is_staff,
                
            };
            case 'SIGN_IN':
            return {
                ...prevState,
                isSignout: false,
                //userToken: action.token,
                userToken: action.response.token,
                isStaff: action.response.is_staff,
            };
            case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
                isStaff:null,
            };
        }
        },
        {
        isLoading: true,
        isSignout: false,
        userToken: null,
        isStaff:null,
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
                await SecureStore.setItemAsync("is_staff", response.data.is_staff?"true":"false");
                console.log("Authcontext SignIn", response.data.token);
                //dispatch({ type: 'SIGN_IN', token:response.data.token });
                dispatch({ type: 'SIGN_IN', response:response.data});

            }
            catch(err)
            {
                console.log(err);
            }
            
          },
          signOut: async () =>{
              await SecureStore.deleteItemAsync("token");
              await SecureStore.deleteItemAsync('is_staff');
              dispatch({ type: 'SIGN_OUT' })
            },

        }),
        []
    );
    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const localtoken = async () => {
            let userToken=null;
            let is_staff = null;
          try {
            userToken = await SecureStore.getItemAsync("token");
            is_staff = await SecureStore.getItemAsync("is_staff");
            console.log('AuthContext Restore token ',userToken );
            console.log("AuthContext Restore isStaff", is_staff);
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          if(userToken!=null && is_staff!=null){
            
            dispatch({ type: 'RESTORE_TOKEN', response:{
              token:userToken,
              is_staff: is_staff=="true"? true:false,
            } });
          }
        };
    
        localtoken();
      }, []);

    return {auth, state};
}