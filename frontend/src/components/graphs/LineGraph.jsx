import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, ResponsiveContainer } from "recharts";
import { getDuration } from "../../data/getData";
import { renderTooltip } from "../render/renderTooltip";

// Fonction pour mapper les jours à des noms de jours
const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

export default function LineGraph({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const activityData = await getDuration(userId);

        // Mapper les jours de 1-7 sur les noms de jours de la semaine
        const formattedData = activityData.sessions.map((session) => ({
          ...session,
          day: daysOfWeek[session.day - 1], // Remplace le numéro du jour par le nom du jour
        }));

        setData(formattedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="graph-small line">
      <h3>Durée moyenne des sessions</h3>
      <ResponsiveContainer width="100%" height={"70%"}>
        <LineChart data={data}>
          <XAxis dataKey="day" tickMargin={16} axisLine={false} tickLine={false} tick={{ fill: "rgba(255, 255, 255, 0.7)", fontSize: 12, lineHeight: 24 }} />
          <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" strokeWidth={2} dot={false} />
          <Tooltip content={renderTooltip} className="line-tooltip" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
