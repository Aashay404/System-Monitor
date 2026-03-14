# System Monitor Dash Board

An all-in-one live monitoring app for your real-time computer's CPU consumption, memory usage, running applications, tiny hardware details and network activity.

This project attempts to mimic a simplified task manager-like application to provide a modern, dark user interface with living functional graphs of analytical data.

# Functional Characteristics
## General Information on Your System:

Real-time measurement of CPU usage 

Real-time measurement of RAM usage 

If applicable; Measurement of System Temperature 

Display of System Uptime 

Smooth Graph of Real-Time CPU Usage 

## Monitoring System Processes 

Display of Top Running Processes 

CPU & Memory Usage of Processes 

Process Identification Number (PID) 

Ability to End Process 

Process list will Refresh Automaticlly 

## Hardware Details

CPU Make/Model and Number of Processors 

Amount of RAM Installed 

Operating System Information 

Total Physical Disk Size 

Integrated vs. Dedicated

## Network Monitoring

Real-Time Download/Upload Speed 

Data Transferred 

Real-Time Network Traffic Graph 

Continuous Monitoring of Network Performance 

# Technology Stack
## FRONTEND 

• ReactJS (ViteJS)

• Recharts (Data Visualisation)

• Inline CSS (Dark) UI Design

## BACKEND

• Node.Js

• Express.JS 

• systeminformation NPM package (OS Level Metrics)

# Project Architecture
System-Monitor
│
├── backend
│   ├── server.js
│   └── package.json
│
├── system-monitor (front-end)
│   ├── src
│   ├── pages
│   └── package.json
│
└── package.json (root - concurrently for running both servers)

The front-end will communicate with the back-end API in order to retrieve machine data in real-time.

 Running Locally

1️) Clone the repository
git clone https://github.com/aashay404/System-Monitor.git

2️) Install the dependencies by navigating to each folder and installing the node modules
cd System-Monitor
npm install
cd backend
npm install
cd ../system-monitor
npm install

3️) Start the application by running in the root folder of the project
npm start

The command will launch the following:
- The back-end server (port 5000);
- The front-end development server.
