import { useState, useEffect } from "react";
import axios from "axios";

function ActiveApisCard() {
  const [activeApis, setActiveApis] = useState(0);

  useEffect(() => {
    const fetchActiveApis = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/active-apis"); 
        setActiveApis(res.data.activeApis);
      } catch (err) {
        console.error("Error fetching active APIs:", err);
      }
    };

    // Poll every 3s
    fetchActiveApis();
    const interval = setInterval(fetchActiveApis, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-sm font-medium text-slate-600">Active APIs</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{activeApis}</p>
    </div>
  );
}

export default ActiveApisCard;
