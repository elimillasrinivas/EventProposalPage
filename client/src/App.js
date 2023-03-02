import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Register from './components/register/register';
import CreateProposal from './components/createProposal/createProposal';
import Signin from './components/signin/signin';
import ViewProposal from "./components/viewProposal/ViewProposal";
import UpdateProposal from "./components/updateProposal/updatePropsal";
// import TopBar from './components/topBar/topbar';

// import EventInfo from "./components/eventInfo/eventInfo";


import LandingPage from "./components/landingPage/landinPage";
// import TopBar from "./components/topBar/topbar";

function App() {
  const [update, setUpdate] = useState("");
  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/view" element={<ViewProposal setUpdate={setUpdate}/>} />
            <Route path="/add" element={<CreateProposal />} />
            <Route path="/update" element={<UpdateProposal update={update} setUpdate={setUpdate} />} />
            <Route path="/userLanding" element={<LandingPage />} />
          </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
