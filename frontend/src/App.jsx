import Header from "./components/layouts/Header.jsx";
import Dashboard from "./components/layouts/Dashboard.jsx";
import Sidebar from "./components/layouts/Sidebar.jsx";
//
import { useEffect, useState } from "react";
import axios from "axios";
const url = "http://localhost:3000/user/18";

export default function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  if (loading)
    return (
      <div className="loader-box">
        <p>Chargement en cours ...</p>
        <span className="loader"></span>
      </div>
    );

  if (error)
    return (
      <div className="error">
        <p>Oups, une erreur est survenue</p>
        {console.log(`Erreur : ${error}`)}
      </div>
    );
  return (
    <>
      <Header />
      <Sidebar />
      <Dashboard user={user} />
    </>
  );
}
