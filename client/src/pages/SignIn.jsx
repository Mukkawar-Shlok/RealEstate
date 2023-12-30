import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

function SignIn() {
  //states
  const [formData, setFormData] = useState({});
  // const [error,setError] = useState(null);
  // const [loading,setLoading] = useState(false);
  const {loading,error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()  
  function handelChange(e){
    setFormData(
      {
        //destructure the old data 
        ...formData,
        //and set the new data 
        [e.target.id] : e.target.value
      }
    )
    // console.log(formData);
  }

 async function handleSubmit(e){
    e.preventDefault();
    // setLoading(true);
    dispatch(signInStart);
    const res = await fetch('/api/auth/signin',
      {
        method:'POST',
        headers:{
          'Content-Type' :'application/json'
        },
        body:JSON.stringify(formData)
      }
    );
    const data = await res.json();
    console.log(data);
    if(data.sucess == false){
      // setError(data.message);
      // setLoading(false);
      dispatch(signInFailure(data.message));
    }else{
      dispatch(signInSuccess(data))
      // setError(null);
      navigate('/');
    }
    // setLoading(false);
    // console.log(error);
    dispatch(signInFailure(error.message))
  }
  // username,email,password
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8 ">Sign IN</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit} >
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" name='email' id="email" onChange={handelChange}/>
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" name='password' id="password" onChange={handelChange}/>
        <button className="bg-slate-400 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80 p-2" disabled={loading}>
          {loading ? 'Loading...' : 'Sign up'}
          </button>
          <OAuth/>
      </form>
      <div className='flex gap-2'>
        <p>Don't Have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}

export default SignIn