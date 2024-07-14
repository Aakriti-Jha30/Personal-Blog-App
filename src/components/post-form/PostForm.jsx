import React,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select} from '../index';
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({post}) {
  const{register,control,handleSubmit,watch,setValue,getValues}=useForm(
    {
        //Might not be the first time user is editing the post and some values are already there
        defaultValues:{
            title:post?.title||'',
            content:post?.content||'',
            status:post?.status||'active',
        }
    }
  )

  const navigate=useNavigate();
  const userData=useSelector(state=>state.userData);

  const submit=async (data)=>{
    if(post){
        const file=data.image[0]?service.uploadFile(data.image[0]):null
        //Purani image delete karo
        if(file){
            //agar file upload hogyi hai(kari hai) to delete karlo purani wali
            service.deleteFile(post.featuredImage); //database mei naam hai featuredImage
        }
        //yaad rakho update ke liye slug bhi chhaiye(unique id)
        const dbPost=await service.updatePost(post.$id,{...data,featuredImage:file?file.$id:undefined,
        }) //image upload ki to data same rahgea aur featuredImage ko humne overwrite karliya 
        if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
            
        } 
    }else{
        const file=await service.uploadFile(data.image[0])
        if(file){
            const fileId= file.$id
            data.featuredImage=fileId
            const dbPost=await service.createPost({
                ...data,
                userId:userData.$id,
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }
  }
  return (
    <div>PostForm</div>
  )
}

export default PostForm