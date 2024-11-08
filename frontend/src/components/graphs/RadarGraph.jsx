import { useEffect, useState } from "react";
import { getPerformance } from "../../data/getData";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

// Fonction pour mapper les genres avec les noms correspondants
const kindMapping = {
  1: "Intensité",
  2: "Vitesse",
  3: "Force",
  4: "Endurance",
  5: "Energie",
  6: "Cardio",
};

export default function RadarGraph({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const performanceData = await getPerformance(userId);

        // Mapper les genres (kind) pour utiliser les noms dans le graphique
        const formattedData = performanceData.data.map((item) => ({
          ...item,
          kind: kindMapping[item.kind], // Remplace le numéro par le nom du type
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
    <div className="graph-small radar">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius={"65%"}>
          <PolarGrid stroke="#ffffff" radialLines={false} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: "rgba(255, 255, 255)", fontSize: 10 }} />
          <Radar name="Performance" dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
