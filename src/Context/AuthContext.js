import React from 'react';


export const AuthContext = React.createContext();

export function useAuth(){
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
            case 'SIGN_IN':
            return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
            };
            case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
            };
        }
        },
        {
        isLoading: true,
        isSignout: false,
        userToken: null,
        }
    );

 
    const auth = React.useMemo(
        () => ({
          signIn: async (email,password) => {
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
            // In the example, we'll use a dummy token
            console.log(email);
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
          signOut: () =>{
              console.log("SignOut");
              dispatch({ type: 'SIGN_OUT' })
            },

        }),
        []
    );

    return {auth, state};
}