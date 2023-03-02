import "./topbar.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const TopBar=({user})=>{
    const navigate=useNavigate()
    const userLogout=()=>{
        axios.get("http://localhost:8000/users/logout",{withCredentials:true}).then((res)=>{
           alert("logged out successfully");
           navigate("/");

        }).catch((e)=>{console.log(e)})
    }
    return(
        <>
        <nav className="topBarContainer">
            <img src="/images/logo.jpeg" alt="logo" />
            <div>
            <h3>{user}</h3>
            <button onClick={userLogout}>User Logout</button>
            </div>
        </nav>
        </>
    )
}
export default TopBar;