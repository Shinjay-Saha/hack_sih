function RiskTable({ roads }) {
  return (
    <div className="risk-table-wrapper">
      <table className="risk-table">
        <thead>
          <tr>
            <th>ROAD ID</th>
            <th>ROAD NAME</th>
            <th>RISK SCORE</th>
            <th>RISK LEVEL</th>
            <th>INCIDENTS</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          {roads.map((road) => (
            <tr key={road.id}>
              <td>
                <strong>{road.id}</strong>
              </td>

              <td>{road.name}</td>

              <td>
                <div className="score-cell">
                  <strong>{road.score}</strong>
                  <div className="score-bar">
                    <div
                      className={`score-fill ${road.level.toLowerCase()}`}
                      style={{ width: `${road.score}%` }}
                    ></div>
                  </div>
                </div>
              </td>

              <td>
                <span className={`risk-badge ${road.level.toLowerCase()}`}>
                  {road.level}
                </span>
              </td>

              <td>{road.incidents}</td>

              <td>
                <span
                  className={`status-badge ${
                    road.status === "OPEN" ? "open" : "restricted"
                  }`}
                >
                  ● {road.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RiskTable;