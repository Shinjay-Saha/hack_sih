function RiskChart({ roads = [] }) {
  const high = roads.filter(
    (road) => String(road.level).toUpperCase() === "HIGH"
  ).length;

  const medium = roads.filter(
    (road) => String(road.level).toUpperCase() === "MEDIUM"
  ).length;

  const low = roads.filter(
    (road) => String(road.level).toUpperCase() === "LOW"
  ).length;

  const total = roads.length;

  return (
    <div className="risk-chart">
      <div className="chart-bars">
        <div className="chart-item">
          <div
            className="chart-bar high"
            style={{
              height: `${total ? (high / total) * 100 : 0}%`,
            }}
          ></div>
          <span>High</span>
          <strong>{high}</strong>
        </div>

        <div className="chart-item">
          <div
            className="chart-bar medium"
            style={{
              height: `${total ? (medium / total) * 100 : 0}%`,
            }}
          ></div>
          <span>Medium</span>
          <strong>{medium}</strong>
        </div>

        <div className="chart-item">
          <div
            className="chart-bar low"
            style={{
              height: `${total ? (low / total) * 100 : 0}%`,
            }}
          ></div>
          <span>Low</span>
          <strong>{low}</strong>
        </div>
      </div>
    </div>
  );
}

export default RiskChart;