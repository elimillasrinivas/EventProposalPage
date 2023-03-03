import "./topbar.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
const TopBar=({user})=>{
    const navigate=useNavigate()
    const userLogout=()=>{
        axios.get("https://eventproposalserver.onrender.com/users/logout",{withCredentials:true}).then((res)=>{
            Swal.fire({
                title: 'Are you sure you want to logoff?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'logout',
                denyButtonText: `No`,
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/");
                } 
              })
           

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