//for creating the anchor tag
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
function SignUp() {
  //states
  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  
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
    setLoading(true);
    const res = await fetch('/api/auth/signup',
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
      setError(data.message);
      setLoading(false);
    }else{
      setError(null);
      navigate('/sign-in');
    }
    setLoading(false);

    console.log(error);
  }
  // username,email,password
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8 ">Sign up</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit} >
        <input type="text" placeholder="username" className="border p-3 rounded-lg" name='username' id="username"  onChange={handelChange}/>
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" name='email' id="email" onChange={handelChange}/>
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" name='password' id="password" onChange={handelChange}/>
        <button className="bg-slate-400 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80 p-2" disabled={loading}>
          {loading ? 'Loading...' : 'Sign up'}
          </button>
          <OAuth/>
      </form>
      <div className='flex gap-2'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}

export default SignUp