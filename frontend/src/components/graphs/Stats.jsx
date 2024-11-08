import { useEffect, useState } from "react";
import { getScore } from "../../data/getData";
import flame from "../../assets/logo/flame.svg";
import chicken from "../../assets/logo/chicken.svg";
import apple from "../../assets/logo/apple.svg";
import cheeseburger from "../../assets/logo/cheeseburger.svg";

export default function Stats({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getScore(userId);
        setData(userData.keyData);
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
    <>
      <div className="box box-cal">
        <div className="picture">
          <img src={flame} alt="flame icon" />
        </div>
        <div className="info">
          <p className="number">{data.calorieCount}kCal</p>
          <p className="text">Calories</p>
        </div>
      </div>
      <div className="box box-pro">
        <div className="picture">
          <img src={chicken} alt="chicken icon" />
        </div>
        <div className="info">
          <p className="number">{data.carbohydrateCount}g</p>
          <p className="text">Proteines</p>
        </div>
      </div>
      <div className="box box-glu">
        <div className="picture">
          <img src={apple} alt="apple icon" />
        </div>
        <div className="info">
          <p className="number">{data.lipidCount}g</p>
          <p className="text">Glucides</p>
        </div>
      </div>
      <div className="box box-lip">
        <div className="picture">
          <img src={cheeseburger} alt="cheeseburger icon" />
        </div>
        <div className="info">
          <p className="number">{data.proteinCount}g</p>
          <p className="text">Lipides</p>
        </div>
      </div>
    </>
  );
}
