# PingScope

**PingScope** is a lightweight, browser-based network performance analyzer built with React and TypeScript.

It allows users to measure and visualize real-time network metrics such as latency, packet loss, and DNS resolution speed. Whether you're a developer debugging an API, a gamer checking ping spikes, or a remote worker facing Zoom issues — PingScope gives you a clear view into what your connection is doing.

---

## 📦 Features

- **Latency Testing:** Manually ping a server and display the time in milliseconds.
- **Latency History Chart:** View trends over time in a line chart.
- **Auto-Ping Mode:** Automatically ping every 5 seconds and update the chart live.
- **Packet Loss Simulation:** Send multiple requests and show how many failed.
- **DNS Speed Test:** Simulate DNS resolution timing by testing domain fetch speed.
- **Export to CSV:** Download your latency history for analysis or reporting.

---

## 🎯 Why Use PingScope?

Most users rely on generic speed tests that don't reveal the full picture. PingScope gives fine-grained visibility into:
- Unstable latency and random spikes
- Failing requests that indicate packet loss
- Slow DNS response times that affect web browsing

It's perfect for diagnosing why your network feels slow — even when speed tests look fine.

---

## 👥 Who Is It For?

- Developers testing API response time and performance  
- Gamers needing to visualize ping consistency  
- Remote workers experiencing lag during calls  
- Students or beginners learning about latency and packet flow  

---

## 🛠️ Built With

- React (via Vite)  
- TypeScript  
- Chart.js (`react-chartjs-2`)  
- Browser APIs (`fetch`, `performance.now`, `setInterval`)  

---

## 🚧 Future Improvements

- [ ] Threshold alerting for high latency  
- [ ] Average/min/max stats display  
- [ ] Traceroute-style path display  
- [ ] UI theme switch (light/dark mode)  

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
