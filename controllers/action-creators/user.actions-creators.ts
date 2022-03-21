import { UserTypes } from '../types'   
import { Dispatch } from 'redux';
import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendEmailVerification ,updateProfile   } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCPB_ibh5yK49GwSHCAHGlCEhGlVBuq2i0",
    authDomain: "company-life-admin.firebaseapp.com",
    projectId: "company-life-admin",
    storageBucket: "company-life-admin.appspot.com",
    messagingSenderId: "1051805480691",
    appId: "1:1051805480691:web:4dca6e5fe4b5e10558e986",
    measurementId: "G-KTGFRZ262D"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth()

  let analytics 
  if(typeof window !== 'undefined'){
      analytics = getAnalytics(app);  
  }


 export const loginUser = (email:string,password:string) => (dispatch:Dispatch<any>) => {
    signInWithEmailAndPassword(auth,email,password)
        .then((res:any) =>{
            dispatch({
                type:UserTypes.LOGIN_USER,
                user:res.user,
                accessToken:res.user.accessToken,
                error:null
            })
        }).catch((err:any) => {
            dispatch({
                type:UserTypes.LOGIN_USER,
                user:null,
                error:err.message
            })
        })
 }
 export const loginUserGoogle = () => (dispatch:Dispatch<any>) => {
    signInWithPopup(auth,new GoogleAuthProvider())
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken
          // The signed-in user info.
          const user = result.user;
          dispatch({
              type:UserTypes.LOGIN_USER_WITH_GOOGLE,
              user:user,
              accessToken:token,
              error:null,
          })
          // ...
        }).catch((err) => {
          // Handle Errors here.
          // The email of the user's account used.
          dispatch({
            type:UserTypes.LOGIN_USER_WITH_GOOGLE,
            user:null,
            accessToken:null,
            error:err.message,
        })
    });
 }

 export const singUpUser = (email:string,password:string) => (dispatch:Dispatch<any>) => {
    createUserWithEmailAndPassword(auth,email,password)
        .then((res:any) =>{
            dispatch({
                type:UserTypes.LOGIN_USER,
                user:res.user,
                accessToken:res.user.accessToken,
                error:null
            })
        }).catch((err:any) => {
            dispatch({
                type:UserTypes.LOGIN_USER,
                user:null,
                error:err.message
            })
        })
 }

export const logoutUser = () => (dispatch:Dispatch<any>) => {
    signOut(auth)
        .then((user:any) => {
            dispatch({
                type:UserTypes.LOGOUT_USER,
                user:null,
                accessToken:null,
                error:null,
            })
        })
        .catch((err:any) => {
            dispatch({
                type:UserTypes.LOGOUT_USER,
                error:err.message,
            })
        })
}

export const traceChanges = () => (dispatch:Dispatch<any>) => {
    onAuthStateChanged(auth,(user:any)=>{
        dispatch({
            type:UserTypes.TRACE_CHANGES,
            user:user
        })
    })
}

export const sendVerification = () => (dispatch:Dispatch<any>) => {
    if(auth.currentUser !== null){
        sendEmailVerification(auth.currentUser)
        .then(() => {
            dispatch({
                type:UserTypes.VERIFY_EMAIL,
                msg:"Verification Sended"
            })
        })
        .catch((err) => console.log(err))
    }
}

export const connect = (id:string) => (dispatch:Dispatch<any>) => {
    const isOnline = {
        userId:id,
        state:true
    }
    dispatch({
        type:UserTypes.CONNECT,
        isConnect:true,
        msg:'Connected',
        error:null,
    })
}
export const disconnect = (id:string) => (dispatch:Dispatch<any>) => {
    const isOnline = {
        userId:id,
        state:false
    }
    dispatch({
        type:UserTypes.CONNECT,
        isConnect:true,
        msg:'Connected',
        error:null,
    })
}

