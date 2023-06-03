import { useState, useEffect, createContext } from 'react';

export const UserDataContext= createContext()

export default function UserDataContextProvider(props){
    const [user, setUser]=useState('');
    const [token, setToken]=useState('');

    useEffect(() => { 
        const user= localStorage.getItem('userInfo') 
        if(!user){
         localStorage.setItem('userInfo', '')
        }else{
         setUser(JSON.parse(localStorage.getItem('userInfo')))
        }
        setToken(localStorage.getItem('token'))
       }, [])
 
   

    return (
        <UserDataContext.Provider value={{user,setUser,token,setToken}}>
            {props.children}
        </UserDataContext.Provider>
      )
}