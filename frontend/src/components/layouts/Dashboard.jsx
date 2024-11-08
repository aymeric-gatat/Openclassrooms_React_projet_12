import BarGraph from "../graphs/BarGraph";
import LineGraph from "../graphs/LineGraph";
import PieGraph from "../graphs/PieGraph";
import RadarGraph from "../graphs/RadarGraph";
import Stats from "../graphs/Stats";

export default function Dashboard({ user }) {
  return (
    <main>
      <header>
        <h1>
          Bonjour <span>{`${user.userInfos.firstName}`}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos obectifs hier 👏</p>
      </header>
      <section>
        <div className="graph-container container-left">
          <BarGraph userId={user.id} />
          <div className="graph-row">
            <LineGraph userId={user.id} />
            <RadarGraph userId={user.id} />
            <PieGraph userId={user.id} />
          </div>
        </div>
        <div className="box-container container-right">
          <Stats userId={user.id} />
        </div>
      </section>
    </main>
  );
}
