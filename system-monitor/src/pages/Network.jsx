import { useEffect, useState } from "react";
import {
LineChart,
Line,
ResponsiveContainer,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
AreaChart,
Area,
Legend
} from "recharts";

export default function Network() {

const [net, setNet] = useState({});
const [history, setHistory] = useState([]);

useEffect(() => {


const fetchNet = async () => {
  try {
    const res = await fetch("http://localhost:5000/network");
    const data = await res.json();

    setNet(data);

    setHistory(prev => {
      const updated = [
        ...prev,
        {
          
          download: Number(data.download),
          upload: Number(data.upload)
        }
      ];

      if (updated.length > 25) updated.shift();
      return updated;
    });

  } catch (err) {
    console.log("Network error");
  }
};

fetchNet();
const interval = setInterval(fetchNet, 2000);

return () => clearInterval(interval);


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
<div style={{ fontSize: 18, marginTop: 6 }}>{value}</div> </div>
);

return (
<div style={{ padding: 30, color: "white" }}>


  <h2 style={{ marginBottom: 20 }}>Network Usage</h2>

  {/* Cards */}
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 18
  }}>
    <Card title="Download Speed" value={net.download + " MB/s"} />
    <Card title="Upload Speed" value={net.upload + " MB/s"} />
    <Card title="Total Downloaded" value={net.totalDownload + " GB"} />
    <Card title="Total Uploaded" value={net.totalUpload + " GB"} />
  </div>

  {/* Detailed Graph */}
  <div style={{
    background: "#1b1f27",
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    width: 900,
    boxShadow: "0 0 0 1px #2b3240"
  }}>
    <div style={{
      fontSize: 12,
      color: "#9aa4b2",
      marginBottom: 15
    }}>
      Real-time Network Throughput
    </div>

    <div style={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={history}>

          <defs>
            <linearGradient id="down" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="up" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#2b3240" strokeDasharray="3 3" />
     
          <YAxis stroke="#9aa4b2" />
          <Tooltip
            contentStyle={{
              background: "#11151b",
              border: "1px solid #2b3240"
            }}
          />
          <Legend />

          <Area
            type="monotone"
            dataKey="download"
            stroke="#4ade80"
            fill="url(#down)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="upload"
            stroke="#60a5fa"
            fill="url(#up)"
            strokeWidth={2}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>

</div>


);
}
