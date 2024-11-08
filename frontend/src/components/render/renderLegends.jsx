export const renderLegend = (props) => {
  const { payload } = props;

  return (
    <div className="legend">
      <h2>Activité quotidienne</h2>
      <ul className="list-legend">
        {payload.map((entry, index) => {
          return (
            <li key={`item-${index}`} className="item-legend">
              <span style={{ background: `${entry.color}` }} className="icon-legend"></span>
              {index == 0 ? "Poids " : "Calories brûlées"}({entry.payload.unit})
            </li>
          );
        })}
      </ul>
    </div>
  );
};
