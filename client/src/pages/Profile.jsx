import { useSelector } from "react-redux"

function Profile() {
  const {currentUser} = useSelector(state=> state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img className="rounded-full w-24 h-24 object-cover curser-pointer self-center mt-3" src={currentUser.avatar} alt="Profile Image"/>
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