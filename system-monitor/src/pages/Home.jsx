import { useEffect, useState } from "react";
import {
LineChart,
Line,
ResponsiveContainer,
XAxis,
Tooltip
} from "recharts";

export default function Home() {

const [stats, setStats] = useState({
cpu: 0,
ram: 0,
temperature: "N/A",
uptime: 0
});

const [cpuHistory, setCpuHistory] = useState([]);

useEffect(() => {


const fetchStats = async () => {
  try {
    const res = await fetch("http://localhost:5000/overview");
    const data = await res.json();

    setStats(data);

    setCpuHistory(prev => {
      const updated = [...prev, {
        time: new Date().toLocaleTimeString(),
        cpu: Number(data.cpu)
      }];

      if (updated.length > 15) updated.shift();
      return updated;
    });

  } catch (err) {
    console.log("Backend not reachable");
  }
};

fetchStats();
const interval = setInterval(fetchStats, 2000);

return () => clearInterval(interval);


}, []);

const Card = ({ title, value }) => (
<div style={{
background: "#1b1f27",
padding: 18,
borderRadius: 10,
minWidth: 170,
boxShadow: "0 0 0 1px #2b3240"
}}>
<div style={{ fontSize: 12, color: "#9aa4b2" }}>{title}</div>
<div style={{ fontSize: 22, marginTop: 6 }}>{value}</div> </div>
);

return (
<div style={{ padding: 30, color: "white" }}>


  <h2 style={{ marginBottom: 20 }}>System Overview</h2>

  {/* Cards */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
    <Card title="CPU Usage" value={stats.cpu + " %"} />
    <Card title="RAM Usage" value={stats.ram + " %"} />
    <Card title="Temperature" value={stats.temperature + ""} />
    <Card title="Uptime" value={stats.uptime + " min"} />
  </div>

  {/* Graph */}
  <div style={{
    background: "#1b1f27",
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    width: 700,
    boxShadow: "0 0 0 1px #2b3240"
  }}>
    <div style={{
      fontSize: 12,
      color: "#9aa4b2",
      marginBottom: 10
    }}>
      CPU Usage (Live)
    </div>

    <div style={{ height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={cpuHistory}>
          <XAxis dataKey="time" hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

</div>


);
}
