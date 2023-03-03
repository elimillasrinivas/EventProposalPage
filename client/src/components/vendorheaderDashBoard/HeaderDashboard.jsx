import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./headerDashboard.css";
import Swal from "sweetalert2";


const HeaderDashboard = () => {
    const navigate = useNavigate();
    const [vendorName, setVendorName] = useState("");
    useEffect(() => {
        setTimeout(() => {
            axios.get("https://eventproposalserver.onrender.com/vendors/info", { withCredentials: true }).then(data => {
                setVendorName(data.data.vendorName);
            }).catch(err=>{
                console.log(err);
            })
        }, 500)
    }, [])
    return <header id="headerDashboard">
        <img id="headerDashboardLogo" src="/images/logo.jpeg" alt="logo" />
        <div>
            <span>{vendorName}</span>
            <button id="logout" onClick={() => {
                axios.get("https://eventproposalserver.onrender.com/vendors/logout", { withCredentials: true }).then(() => {
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
                })
            }}>Log out</button>
        </div>
    </header>
}

export default HeaderDashboard;