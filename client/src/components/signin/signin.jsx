import "./signin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signin=()=>{
    const navigate=useNavigate();
    const checkSession = () => {
        axios.get("https://eventproposalserver.onrender.com/check", { withCredentials:true }).then((res)=>{
            if(res.data.msg==="vendor"){
                navigate("/view");
            }else if(res.data.msg==="user"){
                navigate("/userLanding")
            }
        }).catch((err)=>{
            console.log("Failed Checking",err);
        })
    }
    useEffect(()=>{checkSession()},[])
    const [form,setForm]=useState({phone:"",password:""});
    const [vendor,setVendor]=useState(false);
    const loginHandler=(e)=>{
       e.preventDefault();
       if(form.phone.toString().length===10&&form.password.length>0)
       {
        if(vendor){

            axios.post("https://eventproposalserver.onrender.com/vendors/login",form,{withCredentials:true}).then((response)=>{
                if(response.data.msg==="Success")
                {
                 Swal.fire({
                     position: 'center',
                     icon: 'success',
                     title: 'LoggedIn successfully',
                     timer: 1000,
                     timerProgressBar: true,
                     showConfirmButton: false,
                   }).then((willNavigate)=>{
                     if(willNavigate){
                        navigate("/view")
                     }
                   })
                }
                else if(response.data.msg==="Unauthorized, Incorrect password")
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Invalid vendor credentials',
                        showConfirmButton: true,
                        confirmButtonText: 'ok',
                      }) 
                }
                else if(response.data.message==="vendor not registered")
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Vendor not registered',
                        showConfirmButton: true,
                        confirmButtonText: 'ok',
                      })
                }
               
            
         }).catch((error)=>{
            if(error)
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                }
         });        }
        else{
            axios.post("https://eventproposalserver.onrender.com/users/login",form,{withCredentials:true}).then((response)=>{
                if(response.data.message==="user logged in")
                {
                 Swal.fire({
                     position: 'center',
                     icon: 'success',
                     title: 'LoggedIn successfully',
                     timer: 1000,
                     timerProgressBar: true,
                     showConfirmButton: false,
                   }).then((willNavigate)=>{
                     if(willNavigate){
                        navigate("/userLanding")
                     }
                   })
                }
                else if(response.data.message==="invalid credentials")
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Invalid Credentials',
                        showConfirmButton: true,
                        confirmButtonText: 'ok',
                      })
    
                }
                else if(response.data.message==="user not registered")
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'User not registered',
                        showConfirmButton: true,
                        confirmButtonText: 'ok',
                      })
                }
            
         }).catch((error)=>{
            console.log(error);
           
             if(error)
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                }
         });

        }
       }
       else{
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Fill valid details',
            showConfirmButton: true,
            confirmButtonText: 'Ok',
          })
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