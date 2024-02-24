import React,{useEffect, useRef} from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';

const Profile = () => {
  const {currentUser} = useSelector(state=>state.user);
  const fileRef = useRef(null)
  const[file,setFile] = useState(undefined)
  const[uploadPercent , setUploadPercent] = useState(0);
  const[uploadError,setUploadError] = useState(false)
  const [formData,setFormData] = useState({});
  const handelFileUpload = async ()=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() +file.name;
    const storageRef = ref(storage,`avatars/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef,file);
    
    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred /snapshot.totalBytes) *100;
        setUploadPercent((oldprogress)=>progress)
      },
      (error)=>{
        setUploadError((prevError)=>true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl)=>{
            if(downloadUrl){
              setFormData((prevData)=>{
                return {...prevData,avatar:downloadUrl}
              })
            }
          })
      }
      );
      
  }



  useEffect(()=>{
    //if there is a file need to upload
    if(file){
      handelFileUpload();
    }
  },[file])

  return (
  <div className='p-3 max-w-lg mx-auto '>
    <h1 className='text-3xl font semibold text-center my-7'>Profile</h1>
    <form className='flex flex-col gap-2'>
      <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
      
      <img
       className='rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-2'
       src={formData.avatar||currentUser.avatar}
       onClick={()=>fileRef.current.click()}
       />
      
    <p className='text-small self-center'> {
    uploadError ? 
      (<span className='text-red-700'>Error image upload. (Image must be less than 2mb)</span>):

        uploadPercent >0 && uploadPercent<100 ?
        (<span className='text-green-700'>{`uploading percentage ${uploadPercent}`}</span>
        ):
        uploadPercent == 100 ?
        (<span className='text-green-700'>Image upload Successfull.</span>
        ):""
      }
    </p>

      <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
      <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' />
      <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg' />
      <button className='bg-green-600 text-white rounded-lg p-3 uppercase hover:opacity-80 disabled:opacity-80 '>Update User Information</button>
    </form>
    <div className='flex justify-between m-2'>
      <span className='bg-red-500 p-2 rounded-lg'>Delete Account</span>
      <span className='text-red-700  p-2 rounded-lg border hover:bg-red-500 hover:text-white'>Log Out</span>
    </div>
    </div>
  )
}

export default Profile