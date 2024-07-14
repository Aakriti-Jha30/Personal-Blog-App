import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{
 client=new Client();
 account;

 constructor(){
    this.client
     .setEndpoint(conf.appwriteUrl)
     .setProject(conf.appwriteProjectId);
    this.account=new Account(this.client);
 }
//We created a seperate createAccount method in our class because suppose the app service you are using hcnages even in that case
//the inpout fyou are taking from user remainse the same this is just how we work at production level 
 async createAccount({email,password,name}){
    try{
        const userAccount=await this.account.create(ID.unique(),email,password,name);
        if(userAccount){
            //call another method
            return this.login({email,password});
            //user ka account bangaya hai to sidha login call karlo
            
        }else{
            return  userAccount;
        }

    }catch(error){
        throw error;
    }
 }

 async login({email,password}){
    try {
        //see
        return await this.account.createEmailPasswordSession(email,password);
    } catch (error) {
       throw error;
        
    }
 }
//service to check if user is currently llogged in or not
 async getCurrentUser(){
    //no need to pass any arguments we can directly ask the account
    try {
        return await this.account.get();
        
    } catch (error) {
        //throw error;
        console.log("Appwrite service::getCurrentUser::error",error);
    }
  return NULL;
 }


 async  logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite service::logout::error",error);
    }
 }
};

//services is tarah se di jarhi hai ki underthehood kya horha hai wo bas is file ko pata hai
//sp if application or backend services changes we can make it here
const authService=new AuthService();
export default authService;