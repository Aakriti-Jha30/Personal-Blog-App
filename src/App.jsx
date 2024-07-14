import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import {Footer,Header} from './components';


function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
   authService.getCurrentUser()
   .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }else{
      dispatch(logout());
    }
   })
   .finally(()=>setLoading(false));
  },[]) //.catch laga skte ho
  
  //CONDITIONAL RENDERING (loading false hai to kuch display karo nhi to rehn do)
 return !loading?
 (<div className='min-h-screen flex flex-wrap content-between bg-orange-200'>
    <div className='w-full block'>
      <Header/>
      <main>
       {/* <Outlet/>*/}
      </main>
      <Footer/>
    </div>
 </div>

 ):null;
}

export default App;