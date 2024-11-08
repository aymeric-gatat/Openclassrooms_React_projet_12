import { Pie, PieChart, Cell, ResponsiveContainer, Text, Label } from "recharts";
import { getScore } from "../../data/getData";
import { useEffect, useState } from "react";

export default function PieGraph({ userId }) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const activityData = await getScore(userId);
        let todayScore;
        activityData.todayScore ? (todayScore = activityData.todayScore * 100) : (todayScore = activityData.score * 100);
        setScore(todayScore);
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

  const data = [
    { name: "Score", value: score },
    { name: "Restant", value: 100 - score },
  ];

  const COLORS = ["#ff0000", "#E0E0E0"];

  return (
    <div className="graph-small pie">
      <h3>Score</h3>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={"80%"} outerRadius={"100%"} startAngle={80} endAngle={450}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} cornerRadius={index == 0 ? 8 : 0} />
            ))}
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="#282D30" transform="translate(2,-40)">
            <tspan fontSize="24" fontWeight="bold" dy="26">
              {score}%
            </tspan>
            <tspan fontSize="14" fill="#74798C" x="50%" dy="26">
              de votre objectif
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
