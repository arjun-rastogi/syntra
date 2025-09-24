import React, { useEffect, useState } from "react";
import axios from "axios";

const Panel = () => {
  const [stats, setStats] = useState([]);
  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard");
      setStats(response.data.results);
    } catch (err) {
      console.error("Login failed");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-gray-500">Total Leads</h3>
        <p className="text-2xl font-bold">{stats[0]?.total_leads}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-gray-500">In Progress</h3>
        <p className="text-2xl font-bold">{stats[0]?.in_progress}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-gray-500">Closed</h3>
        <p className="text-2xl font-bold">{stats[0]?.closed_leads}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-gray-500">Total Tasks</h3>
        <p className="text-2xl font-bold">{stats[0]?.total_tasks}</p>
      </div>
    </div>
  );
};

export default Panel;
