import "./signin.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin=()=>{
    const navigate=useNavigate();
    const [form,setForm]=useState({phone:"",password:""});
    const [vendor,setVendor]=useState(false);
    const loginHandler=(e)=>{
       e.preventDefault();
       if(form.phone.toString().length===10&&form.password.length>0)
       {
        if(vendor){
            axios.post("http://localhost:8000/vendors/login",form,{withCredentials:true}).then((response)=>{
            console.log(response);
            navigate("/view")
         }).catch((error)=>{console.log(error)});
        }
        else{
            axios.post("http://localhost:8000/users/login",form,{withCredentials:true}).then((response)=>{
            console.log(response);
            navigate("/userLanding")
         }).catch((error)=>{console.log(error)});
        }
       }
       else{
        alert("fill valid details");
       }
    }
    const dataBaseToggleHandler=(e)=>{
        e.preventDefault();
        if(vendor===true)
        {
            setVendor(false)
        }
        else{
            setVendor(true);
        }
    }
    return(
        <>
         <article className="signinPageContainer">
       <h1>LOGO</h1>
        <section>
            <section>
                <p>TEXT WILL <br/> BE DISPLAYED  HERE</p>
                <button>End User</button>
            </section>
            <section>
                <form className="signinPageForm">
                <section>
                        <button className={vendor?"signinPageContainerButtonColor":null} onClick={dataBaseToggleHandler}>vendor</button>
                        <button className={vendor?null:"signinPageContainerButtonColor"} onClick={dataBaseToggleHandler}>User</button>
                    </section>
                    <h3>Signin in your account</h3>
                    <input type="number" placeholder="Phone" onChange={(e)=>{setForm({...form,phone:e.target.value})}} value={form.phone}/>
                    <input type="password" placeholder="Password" onChange={(e)=>{setForm({...form,password:e.target.value})}} value={form.password}/>
                    <p>Forget Password?</p>
                    <section className="signinPageFormButtonSection">
                        <button onClick={()=>{navigate("/register")}}>Create Account</button>
                        <button onClick={loginHandler}>SIGNIN</button>
                    </section>

                </form>
            </section>
        </section>
       </article>
        </>
    )
}
export default Signin;