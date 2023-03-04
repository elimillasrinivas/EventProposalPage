import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderDashboard from "../vendorheaderDashBoard/HeaderDashboard"
import "./viewProposal.css";
import Swal from "sweetalert2"


const ViewProposal = ({ setUpdate }) => {
    const navigate = useNavigate();
    const [proposals, setProposals] = useState([]);
    const [search, setSearch] = useState("");
    const reloadData = (word) => {
        setTimeout(async () => {
            const data = await axios.get(`https://eventproposalserver.onrender.com/events/info`, { withCredentials: true })
                if(word===""){
                    setProposals(data.data.result);
                    return;
                }
                let filteredData = [];
                data.data.result.map(propo=>{
                    if(propo.eventType.toLowerCase().includes(word.toLowerCase())){
                        filteredData.push(propo);
                    }
                    
                })
                setProposals(filteredData);
        }, 500)
    }
    useEffect(() => {
        reloadData("")
    }, [])
    return <div id="viewProposals">
        <HeaderDashboard />
        <section id="searchProposals">
            <span id="proposalsText">Proposals</span>
            <img src="/images/search.jpeg" alt="searchIcon" id="searchIcon" />
            <input id="searchText" type="text" placeholder="Search Projects" value={search} onChange={async(e)=>{
                setSearch(e.target.value)
                reloadData(e.target.value);
            }} />
            <button id="searchButton"
            onClick={() => {
                navigate("/add");
            }}>Create</button>
        </section>
        <section id="proposalList">
            {proposals.map((data, index) => {
                return <div key={index} className="proposal">
                    <h5 className="name">{data.name}</h5>
                    <p className="description">{data.description}</p>
                    <div className="proposalFooter">
                        <div className="details">
                            <div className="singleDetail">
                                <p>Event Type</p>
                                <h5>{data.eventType}</h5>
                            </div>
                            <div className="singleDetail">
                                <p>Proposal Type</p>
                                <h5>{data.proposalType}</h5>
                            </div>
                            <div className="singleDetail">
                                <p>From Date</p>
                                <h5>{data.from}</h5>
                            </div>
                            <div className="singleDetail">
                                <p>To Date</p>
                                <h5>{data.to}</h5>
                            </div>
                            <div className="singleDetail">
                                <p>Budget</p>
                                <h5>{data.budget}</h5>
                            </div>
                        </div>
                        <div className="icons">
                            <img className="editIcon" src="/images/edit.jpeg" alt="editIcon" onClick={()=>{
                                setUpdate(data._id);
                                navigate("/update");
                            }} />
                            <img className="deleteIcon" src="/images/bin.jpeg" alt="deleteIcon" onClick={()=>{
                                Swal.fire({
                                    title: 'Delete this Proposal?',
                                    showDenyButton: true,
                                    showCancelButton: false,
                                    confirmButtonText: 'Delete',
                                    denyButtonText: `Cancel`,
                                    }).then((result) => {
                                    if (result.isConfirmed) {
                                        axios.delete(`https://eventproposalserver.onrender.com/events/${data._id}`).then((response)=>{
                                            reloadData("");
                                         }).catch(err=>{
                                             console.log(err);
                                         })
                                    }
                                    })

                            }} />
                        </div>
                    </div>
                </div>
            })}
        </section>
    </div>
}

export default ViewProposal;