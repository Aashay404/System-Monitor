import { useEffect, useState } from "react";

export default function Hardware() {

const [hw, setHw] = useState({});

useEffect(() => {

const fetchHardware = async () => {
  try {
    const res = await fetch("http://localhost:5000/hardware");
    const data = await res.json();
    setHw(data);
  } catch (err) {
    console.log("Hardware fetch error");
  }
};

fetchHardware();


}, []);

const Card = ({ title, value }) => (
<div style={{
background: "#1b1f27",
padding: 18,
borderRadius: 10,
minWidth: 220,
boxShadow: "0 0 0 1px #2b3240"
}}>
<div style={{ fontSize: 12, color: "#9aa4b2" }}>{title}</div>
<div style={{ fontSize: 16, marginTop: 6 }}>{value}</div> </div>
);

return (
<div style={{ padding: 30, color: "white" }}>


  <h2 style={{ marginBottom: 20 }}>Hardware Information</h2>

  <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 18
  }}>
    <Card title="CPU Model" value={hw.cpu} />
    <Card title="CPU Cores" value={hw.cores} />
    <Card title="Total RAM" value={hw.ram} />
    <Card title="Operating System" value={hw.os} />
    <Card title="Disk Size" value={hw.disk} />
    <Card title="GPU" value={hw.gpu} />
  </div>

</div>

);
}
