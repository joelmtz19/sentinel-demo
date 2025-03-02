import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [token, setToken] = useState("");

  const fetchLogs = async () => {
    const response = await fetch("http://localhost:8000/logs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setLogs(data.logs);
  };

  const fetchAnalytics = async () => {
    const response = await fetch("http://localhost:8000/analytics", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setAnalytics(data.analytics);
  };

  useEffect(() => {
    if (token) {
      fetchLogs();
      fetchAnalytics();
    }
  }, [token]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">SentinelGuard Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold">Access Logs</h2>
          <button onClick={fetchLogs} className="my-2">Refresh Logs</button>
          <div className="mt-4 max-h-64 overflow-auto border p-2 rounded-md">
            {logs.map((log, index) => (
              <p key={index} className="text-sm border-b py-1">{log}</p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Security Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics}>
              <XAxis dataKey="event" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ff6361" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
