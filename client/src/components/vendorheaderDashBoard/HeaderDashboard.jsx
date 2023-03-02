import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./headerDashboard.css";


const HeaderDashboard = () => {
    const navigate = useNavigate();
    const [vendorName, setVendorName] = useState("");
    useEffect(() => {
        setTimeout(() => {
            axios.get("https://eventproposalserver.onrender.com/vendors/info", { withCredentials: true }).then(data => {
                console.log(data);
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
                    alert("Logged Out Successfully");
                    navigate("/");
                })
            }}>Log out</button>
        </div>
    </header>
}

export default HeaderDashboard;