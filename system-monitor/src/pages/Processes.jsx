import { useEffect, useState } from "react";

export default function Processes() {

const [processes, setProcesses] = useState([]);

useEffect(() => {


const fetchProcesses = async () => {
  try {
    const res = await fetch("http://localhost:5000/processes");
    const data = await res.json();
    setProcesses(data);
  } catch (err) {
    console.log("Backend error");
  }
};

fetchProcesses();
const interval = setInterval(fetchProcesses, 3000);

return () => clearInterval(interval);


}, []);

return (
<div style={{ padding: 30, color: "white" }}>


  <h2 style={{ marginBottom: 20 }}>Running Processes</h2>

  <div style={{
    background: "#1b1f27",
    borderRadius: 10,
    padding: 15,
    width: 800,
    boxShadow: "0 0 0 1px #2b3240"
  }}>

    <div style={{
      display: "flex",
      fontSize: 13,
      color: "#9aa4b2",
      marginBottom: 10
    }}>
      <div style={{ width: 250 }}>Name</div>
      <div style={{ width: 120 }}>PID</div>
      <div style={{ width: 120 }}>CPU %</div>
      <div style={{ width: 120 }}>Memory %</div>
    </div>

    <div style={{
      maxHeight: 400,
      overflowY: "auto"
    }}>
      {processes.map((p, i) => (

  <div key={i} style={{
    display: "flex",
    padding: "8px 0",
    borderBottom: "1px solid #2b3240",
    fontSize: 14,
    alignItems: "center"
  }}>
    <div style={{ width: 250 }}>{p.name}</div>
    <div style={{ width: 120 }}>{p.pid}</div>
    <div style={{ width: 120 }}>{p.cpu}</div>
    <div style={{ width: 120 }}>{p.mem}</div>


<button
  onClick={async () => {
    await fetch(`http://localhost:5000/kill/${p.pid}`, {
      method: "POST"
    });
  }}
  style={{
    background: "#ef4444",
    border: "none",
    padding: "5px 10px",
    borderRadius: 6,
    color: "white",
    cursor: "pointer"
  }}
>
  Kill
</button>


  </div>
))}

    </div>

  </div>

</div>


);
}
