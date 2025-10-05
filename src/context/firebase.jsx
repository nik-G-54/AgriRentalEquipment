import { createContext , useContext ,useState,useEffect} from "react";
import {initializeApp} from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import {getDatabase,ref,push,set,get} from 'firebase/database'

const FirebaseContext =createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAvTLh9L26xW4P_lWnuvaAr_fq42eQUWNQ",
  authDomain: "agrirent-454d0.firebaseapp.com",
  projectId: "agrirent-454d0",
  storageBucket: "agrirent-454d0.firebasestorage.app",
  messagingSenderId: "578668879801",
  appId: "1:578668879801:web:e956ede4e651d4b6192068",
  databaseURL :"https://agrirent-454d0-default-rtdb.firebaseio.com",
};
export const  useFirebase = ()=>useContext(FirebaseContext);

   const firebaseApp=initializeApp(firebaseConfig);
  const firebaseAuth=getAuth(firebaseApp);
const database= getDatabase(firebaseApp);

export const FirebaseProvider =(props)=>{
    const[user,setUser]=useState(null);
      
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
           if(user)setUser(user);
           else setUser(null);
        });
    },[])

   const signupUserWithEmailAndPassword =( Username,email,password)=>createUserWithEmailAndPassword(firebaseAuth,Username, email,password);
   const signInUserWithEmailAndPassword =(Username ,email,password)=>signInWithEmailAndPassword(firebaseAuth, Username, email,password);
   
     const addMachineData = async (machineData) => {
     try {
      console.log(' Firebase: Adding machine data :',machineData)
       const machinesRef = ref(database, 'machines');
       const newMachineRef = push(machinesRef);
       await set(newMachineRef, {
         ...machineData,
         createdAt: new Date().toISOString(),
         userId: user?.uid || 'anonymous'
       });
      //  console.log(' Firebase: Machine added successfully with ID:', newMachineRef.key);
       return { success: true, id: newMachineRef.key };
     } catch (error) {
       console.error(' Firebase:Error adding machine data:', error);
       return { success: false, error: error.message };
     }
   };

   const getAllMachines = async () => {
    try {
      const machinesRef = ref(database, 'machines');
      const snapshot = await get(machinesRef);
      if (snapshot.exists()) {
        return Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...value
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching machines:', error);
      return [];
    }
  };


   const isLoggedIn= user ? true: false;


    return <FirebaseContext.Provider value={{
      signupUserWithEmailAndPassword,
      signInUserWithEmailAndPassword ,
      isLoggedIn,
    addMachineData,
    getAllMachines,
    user,
  }}>{props.children}   </FirebaseContext.Provider>
};