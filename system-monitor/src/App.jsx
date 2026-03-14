import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";

import Home from "./pages/Home";
import Processes from "./pages/Processes";
import Hardware from "./pages/Hardware";
import Network from "./pages/Network";

export default function App() {
return ( <BrowserRouter>
<div style={{ display: "flex", background: "#0f131a" }}>


    <Sidebar />

    <div style={{ flex: 1 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/processes" element={<Processes />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/network" element={<Network />} />
      </Routes>
    </div>

  </div>
</BrowserRouter>


);
}
