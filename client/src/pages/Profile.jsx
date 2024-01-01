import { useSelector } from "react-redux"
import { useRef, useState , useEffect } from "react";
import { app } from "../firebase";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
function Profile() {
  const {currentUser} = useSelector(state=> state.user);
  const fileref = useRef(null)
  const [file,setFile] = useState(undefined)
  const [filePercentage,setFilePercentage] = useState(0);
  const [fileError,setFileError]  = useState(false);
  const [ formData,setFormData] = useState({});
  const uploadInProgress = useRef(false);

  useEffect(() => {
    if (file && !uploadInProgress.current) {
      uploadInProgress.current = true;
      handelUploadFile(file);
    }
  }, [file]);
  const handelUploadFile = (file) =>{
    const storage = getStorage(app)
    const fileName = String(new Date().getTime()) + '_' + file.name; // Using String instead of toString and adding '_' separator
    const storageRef = ref(storage, `avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef,file)


    uploadTask.on('state_changed',(snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes) *100;
      setFilePercentage(Math.round(progress))
    },(error)=>{
      setFileError(true)
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadUrl)=>{
          setFormData({...formData,avatar:downloadUrl});
      })
    })
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <input type="file" ref={fileref} hidden accept='image/*' onChange={(e)=> setFile(e.target.files[0])} />
        <img className="rounded-full w-24 h-24 object-cover curser-pointer self-center mt-3" src={formData.avatar ||currentUser.avatar} alt="Profile Image" onClick={()=>fileref.current.click()} />
        <p className="text-sm self-center">
        {fileError ? 
        (<span className="text-red-700 ">Error while uploading file(Image must be under 2 mb.)</span>) :
        filePercentage >0 && filePercentage< 100 ? (<span className="text-blue-700"> {`Uploading ${filePercentage}`} </span>) :
          filePercentage ==100 ? (<span className="text-green-700">Uploaded Sucessfully</span>) :'' }
        </p>
        <input type="text" placeholder="User Name" id="username" className="rounded-lg p-3 border"/>
        <input type="text" placeholder="Email" id="email" className="rounded-lg p-3 border"/>
        <input type="text" placeholder="password" id="password" className="rounded-lg p-3 border"/>
        <button className="bg-slate-800 text-white rounded-lg disabled:opacity-80 uppercase p-3">Update</button>
      </form>
      
      <div className="flex justify-between mt-3">
        <span className="text-red-700 curser-pointer">Delete Account</span>
        <span className="text-blue-700 curser-pointer">Sign Out</span>

      </div>

    </div>
  )
}

export default Profile