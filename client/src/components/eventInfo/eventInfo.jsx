import TopBar from "../topBar/topbar";
import {ChevronLeft,ArrowBack} from "@mui/icons-material";
import axios from "axios";
import "./eventInfo.css";
import Swal from "sweetalert2";
const EventInfo=(props)=>{
    const closeEventInfoHandler=()=>{
        props.close[props.ind]=false;
        props.setClose([...props.close]);
      }
    const selectEventHandler=()=>{
        if(props.select.isValid===false)
        {
            
           
            axios.put(`https://eventproposalserver.onrender.com/users/${props.user}`,{select:props.show._id})
            .then((response)=>{
                Swal.fire({
                    title: 'Add this proposal?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`,
                  }).then((result) => {
                  
                    if (result.isConfirmed) {
                        axios.get(`https://eventproposalserver.onrender.com/events/${props.show._id}`,{withCredentials:true})
                        .then((res)=>{
                            props.setSelect({isValid:true,data:res.data.result});
                            closeEventInfoHandler();
                        }).catch((e)=>{console.log(e)})
                        
                    } 
                  })
               
            })
                                 
            .catch((e)=>{console.log(e)})
            

        }
        else{
           
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User can select only one Proposal',
              })
        }
    }
    return(
        <>
        <article className="eventInfoContainer">
            <TopBar/>
            <header>
                <section>
                    <h4>Proposals<ChevronLeft/></h4>
                    <h4>Contract type</h4>
                </section>
                <section>
                    <ArrowBack onClick={closeEventInfoHandler} className="eventInfopageexit"/>
                    <button onClick={selectEventHandler}>Select</button>
                </section>
            </header>
            <section className="eventInfoBodyContainer">
               <section className="eventInfoBodyLeftPart">
                  <section>
                    <img src={props.show.eventImage} alt="pic"/>
                    <h4>ID:<span>0001</span></h4>
                    <ul>
                        <li><h4>Name</h4><span>{props.show.name}</span></li>
                        <li><h4>email</h4><span>{props.show.vendorEmail}</span></li>
                        <li>
                            <section>
                                <h4>Start Date:</h4><span>{props.show.from}</span>
                                <h4>End Date:</h4><span>{props.show.to}</span>
                            </section>
                        </li>
                        <li>
                            <section>
                                <h4>Event Type:</h4>
                                <p>{props.show.eventType}</p>
                            </section>
                            <section>
                                <h4>Event Class:</h4>
                                <p>{props.show.budget<50000?"Class B":"Class A"}</p>
                            </section>
                        </li>
                    </ul>
                  </section>
                  <section>
                  <h4>My Albums</h4>
                  <section>
                    {
                        props.show.venueImage.map((value,index)=>{
                             return(
                                <img src={value} key={index} alt="pic"/>
                             )
                        })
                    }
                  </section>

               </section>
               </section>
               
               <section className="eventInfoBodyRightPart">
                  <section>
                    <h4>Venue and Arrangements</h4>
                    <p>
                        {props.show.description}
                    </p>
                  </section>
                  <section>
                    <h4>Food Preferences</h4>
                    <p>
                        {props.show.foodPreferences}
                    </p>
                  </section>
                  <section>
                    <h4>Contacts | 12</h4>
                    <ul>
                        <li><h5>Contact 1</h5><span>+91 xxxxxxxxxx</span></li>
                        <li><h5>Contact 2</h5><span>+91 xxxxxxxxxx</span></li>
                        <li><h5>Contact 3</h5><span>+91 xxxxxxxxxx</span></li>
                    </ul>
                  </section>
                  <section>
                    <h4>Events</h4>
                    <p>
                        {props.show.events}
                    </p>
                  </section>
               </section>
            </section>
        </article>

        </>
    )
}
export default EventInfo;