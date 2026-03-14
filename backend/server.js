const express = require("express");
const cors = require("cors");
const si = require("systeminformation");

const app = express();
app.use(cors());

app.get("/overview", async (req, res) => {
  try {
    const load = await si.currentLoad();
    const mem = await si.mem();
    const temp = await si.cpuTemperature();
    const time = await si.time();

    res.json({
      cpu: load.currentLoad.toFixed(1),
      ram: ((mem.used / mem.total) * 100).toFixed(1),
      temperature: temp.main || 0,
      uptime: Math.floor(time.uptime / 60)
    });
  } catch (err) {
    res.status(500).json({ error: "System info error" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on port 5000");
});
app.get("/processes", async (req, res) => {
  try {
    const data = await si.processes();

    const list = data.list
      .sort((a, b) => b.cpu - a.cpu)
      .slice(0, 25)
      .map(p => ({
        name: p.name,
        cpu: p.cpu.toFixed(1),
        mem: p.mem.toFixed(1),
        pid: p.pid
      }));

    res.json(list);

  } catch (err) {
    res.status(500).json({ error: "Process error" });
  }
});
app.get("/hardware", async (req, res) => {
  try {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const os = await si.osInfo();
    const disk = await si.diskLayout();
    const gpu = await si.graphics();

    res.json({
      cpu: cpu.brand,
      cores: cpu.cores,
      ram: (mem.total / 1024 / 1024 / 1024).toFixed(0) + " GB",
      os: os.distro,
      disk: (disk[0].size / 1024 / 1024 / 1024).toFixed(0) + " GB",
      gpu: gpu.controllers[0]?.model || "Integrated"
    });

  } catch (err) {
    res.status(500).json({ error: "Hardware error" });
  }
});
app.get("/network", async (req, res) => {
  try {
    const net = await si.networkStats();

    res.json({
      download: (net[0].rx_sec / 1024 / 1024).toFixed(2),
      upload: (net[0].tx_sec / 1024 / 1024).toFixed(2),
      totalDownload: (net[0].rx_bytes / 1024 / 1024 / 1024).toFixed(2),
      totalUpload: (net[0].tx_bytes / 1024 / 1024 / 1024).toFixed(2)
    });

  } catch (err) {
    res.status(500).json({ error: "Network error" });
  }
});
app.post("/kill/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);

    process.kill(pid);

    res.json({ success: true });

  } catch (err) {
    res.json({ success: false, error: "Cannot kill process" });
  }
});