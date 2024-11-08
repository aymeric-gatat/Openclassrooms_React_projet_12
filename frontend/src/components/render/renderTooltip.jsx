export const renderTooltip = ({ active, payload, coordinate, className }) => {
  if (active && payload && payload.length) {
    const style = {
      position: "absolute",
      transform: "translate(-50%, -100%)", // Pour centrer et positionner au-dessus
      left: coordinate.x + 50, // Position dynamique basée sur la coordonnée x
      top: coordinate.y - 20,
    };

    return (
      <ul className={className} style={style}>
        {payload.map((entry, index) => (
          <li className="value" key={`index-${index}`}>{`${entry.value}${entry.unit ?? " min"}`}</li>
        ))}
      </ul>
    );
  }
  return null;
};
