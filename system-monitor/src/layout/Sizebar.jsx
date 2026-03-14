import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

const location = useLocation();

const Item = ({ to, label }) => (
<Link
to={to}
style={{
padding: "12px 15px",
marginBottom: 8,
borderRadius: 8,
textDecoration: "none",
color: location.pathname === to ? "black" : "#cbd5e1",
background: location.pathname === to ? "#4ade80" : "transparent",
display: "block",
fontSize: 14
}}
>
{label} </Link>
);

return (
<div style={{
width: 220,
background: "#11151b",
padding: 20,
minHeight: "100vh",
borderRight: "1px solid #2b3240"
}}>
<h3 style={{ marginBottom: 20 }}>System Monitor</h3>

  <Item to="/" label="Overview" />
  <Item to="/processes" label="Processes" />
  <Item to="/hardware" label="Hardware" />
  <Item to="/network" label="Network" />

</div>


);
}
