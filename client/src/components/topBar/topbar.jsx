import "./topbar.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { useEffect } from "react";
const TopBar = ({ user }) => {
  const navigate = useNavigate()
  const checkSession = () => {
    axios.get("https://eventproposalserver.onrender.com/check", { withCredentials: true }).then((res) => {
      if (res.data.msg !== "user") {
        navigate("/");
      }
    }).catch((err) => {
      console.log("Failed Checking", err);
    })
  }
  useEffect(() => { checkSession() }, [])
  const userLogout = () => {
    axios.get("https://eventproposalserver.onrender.com/users/logout", { withCredentials: true }).then((res) => {
      Swal.fire({
        title: 'Do you want to proceed with logout?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Logout',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      })


    }).catch((e) => { console.log(e) })
  }
  return (
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