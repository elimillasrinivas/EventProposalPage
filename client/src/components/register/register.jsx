import {ArrowBack} from "@mui/icons-material";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Register=()=>{
    const navigate=useNavigate();
    const [form,setForm]=useState({userName:"",email:"",phone:"",password:""});
    const [vendor,setVendor]=useState(false);
    const [error,errorHandler]=useState({userName:{isValid:true,message:""},email:{isValid:true,message:""},phone:{isValid:true,message:""},
    password:{isValid:true,message:""}});
    const [confirmPassword,setConfirmPassword]=useState({isValid:false,message:""});
    const functionConfirm=(e)=>{
        if(e.target.value===form.password && form.password!=="")
        {
            setConfirmPassword({isValid:true,message:""})
        }
        else{
            setConfirmPassword({isValid:false,message:"password & confirm password are not same"})
        }
    }
    const errorMessageHandler=(type)=>{
        switch(type){
          case "userName":{
              if(form.userName.length>=5 && form.userName.length<=10)
              {
                  
                    errorHandler({...error,userName:{isValid:true,message:""}});                   
               }
              else{
                  setForm({...form,userName:""});
                  errorHandler({...error,userName:{isValid:false,message:"The number of charecters should be between 5 and 10 "}})
              }
              break;
          }
          case "email":{
              let regexEmail=/^\w+([\.-]?\w+)*@gmail\.com$/g;
              if(regexEmail.test(form.email))
              {
                  errorHandler({...error,email:{isValid:true,message:""}});    
              }
              else{
                  setForm({...form,email:""});
                  errorHandler({...error,email:{isValid:false,message:"please give a valid Email befor @ only . and - are allowed"}})
              }
              break;
          }
          case "phone":{
              let regexPhone=/^[6,7,8,9]/g;
              if(regexPhone.test(form.phone) && form.phone.toString().length===10)
              {
                  errorHandler({...error,phone:{isValid:true,message:""}});
              }
              else{
                  setForm({...form,phone:""});
                  errorHandler({...error,phone:{isValid:false,message:"please give a valid 10 digit mobile number"}})
              }
              break
          }
          case "password":{
              if(form.password.length>=5 && form.password.length<=12)
              {
                  errorHandler({...error,password:{isValid:true,message:""}});
              }
              else{
                  setForm({...form,password:""});
                  errorHandler({...error,password:{isValid:false,message:"The number of charecters should be between 5 and 12 "}})
              }
              return;
          }

          default:{
              setForm({...form});
              break;
          }
        }
}
const registerHandler=(e)=>{
    e.preventDefault();
    if(form.userName.length>0&&form.phone>0&&form.email.length>0&&form.password.length>0&&confirmPassword.isValid)
    {
        if(vendor){
            const data={
                vendorName:form.userName,
                phone:form.phone,
                email:form.email,
                password:form.password
            }

             axios.post("https://eventproposalserver.onrender.com/vendors/register",data).then((response)=>{
                if(response.data.message==="registered successfully")
               {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Vendor registration successful',
                    showConfirmButton: true,
                    confirmButtonText: 'ok',
                  }).then((willNavigate)=>{
                    if(willNavigate){
                        navigate("/");
                    }
                  })
               }
               else if(response.data.message==="Vendor already exist")
               {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'vendorMail already registered',
                    showConfirmButton: true,
                    confirmButtonText: 'ok',
                  })
               }
               else if(response.data.message==="Mobile number already registered")
               {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'phoneNumber already registered',
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
             });  

        }
        else{
            const data={
                userName:form.userName,
                phone:form.phone,
                email:form.email,
                password:form.password
            }

             axios.post("https://eventproposalserver.onrender.com/users/register",data).then((response)=>{
               if(response.data.message==="registered successfully")
               {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User registration successful',
                    showConfirmButton: true,
                    confirmButtonText: 'ok',
                  }).then((willNavigate)=>{
                    if(willNavigate){
                        navigate("/");
                    }
                  })
               }
               else if(response.data.message==="user already exist")
               {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'userMail already registered',
                    showConfirmButton: true,
                    confirmButtonText: 'ok',
                  })
               }
               else if(response.data.message==="mobile number already registered")
               {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'phoneNumber already registered',
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
             });  

        }
    }
    else{
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'All Fields are manidatory',
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
       <article className="registrationPageContainer">
       <h1>LOGO</h1>
        <section>
            <section>
                <p>TEXT WILL <br/> BE DISPLAYED  HERE</p>
                <button>End User</button>
            </section>
            <section>
                <form className="registrationPageForm">
                    <section>
                        <button className={vendor?"registrationPageContainerButtonColor":null} onClick={dataBaseToggleHandler}>vendor</button>
                        <button className={vendor?null:"registrationPageContainerButtonColor"} onClick={dataBaseToggleHandler}>User</button>
                    </section>
                    <h3>Register in your account</h3>
                    <input type="text" placeholder="Name" onChange={(e)=>{setForm({...form,userName:e.target.value})}} onBlur={()=>{errorMessageHandler("userName")}} value={form.userName}/>
                    {error.userName.isValid?null:<p style={{color:"red",marginLeft:"20px"}}>{error.userName.message}</p>}
                    <input type="email" placeholder="Email"  onChange={(e)=>{setForm({...form,email:e.target.value})}} onBlur={()=>{errorMessageHandler("email")}} value={form.email}/>
                    {error.email.isValid?null:<div style={{color:"red",marginLeft:"20px"}}>{error.email.message}</div>}
                    <input type="number" placeholder="Contact" onChange={(e)=>{setForm({...form,phone:e.target.value})}} onBlur={()=>{errorMessageHandler("phone")}} value={form.phone}/>
                    {error.phone.isValid?null:<div style={{color:"red",marginLeft:"20px"}}>{error.phone.message}</div>}
                    <input type="password" placeholder="Password" onChange={(e)=>{setForm({...form,password:e.target.value})}} onBlur={()=>{errorMessageHandler("password")}}  value={form.password} />
                    {error.password.isValid?null:<div style={{color:"red",marginLeft:"20px"}}>{error.password.message}</div>}
                    <input type="password" placeholder="ConfirmPassword" onChange={functionConfirm}/>
                    {confirmPassword.isValid?null:<div style={{color:"red",marginLeft:"20px"}}>{confirmPassword.message}</div>}
                    <section className="registrationPageFormButtonSection">
                        <button onClick={()=>{navigate("/")}}>Signin</button>
                        <section className="registrationButton">
                            <ArrowBack htmlColor="#A5A1A1"/>
                            <button onClick={registerHandler}>REGISTER</button>
                        </section>

                    </section>

                </form>
            </section>
        </section>
       </article>
        </>
    )
}
export default Register;