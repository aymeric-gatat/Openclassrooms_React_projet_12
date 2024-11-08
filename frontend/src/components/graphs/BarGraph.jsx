import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getActivity } from "../../data/getData";
import { renderLegend } from "../render/renderLegends";
import { renderTooltip } from "../render/renderTooltip";

export default function BarGraph({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const activityData = await getActivity(userId);
        setData(activityData.sessions);
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
    <div className="graph-large bar">
      <ResponsiveContainer width={"100%"} height={200}>
        <BarChart data={data} barGap={8} barSize={7}>
          <Legend content={renderLegend} verticalAlign="top" align="right" />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dy={16} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" dataKey="kilogram" type="number" domain={["dataMin - 2", "dataMax +2"]} tickLine={false} axisLine={false} dx={23} />
          <YAxis yAxisId="left" orientation="left" dataKey="calories" type="number" hide />
          <Tooltip content={renderTooltip} className="tooltip" />
          <Bar yAxisId="right" dataKey="kilogram" fill="#282D30" radius={[10, 10, 0, 0]} unit="kg" />
          <Bar yAxisId="left" dataKey="calories" fill="#E60000" radius={[10, 10, 0, 0]} unit="kCal" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
