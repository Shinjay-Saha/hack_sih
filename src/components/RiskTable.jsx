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
          {roads.map((road) => {
            const roadId = road.road_id ?? road.id ?? "N/A";

            const roadName =
              road.road_name ??
              road.name ??
              roadId;

            const score = Number(
              road.final_risk_score ??
              road.score ??
              0
            );

            const level =
              road.risk_level ??
              road.level ??
              "UNKNOWN";

            const incidents =
              road.incidents ??
              road.incident_count ??
              0;

            const status =
              road.status ??
              "OPEN";

            return (
              <tr key={roadId}>
                <td>
                  <strong>{roadId}</strong>
                </td>

                <td>{roadName}</td>

                <td>
                  <div className="score-cell">
                    <strong>{score.toFixed(2)}</strong>

                    <div className="score-bar">
                      <div
                        className={`score-fill ${String(
                          level
                        ).toLowerCase()}`}
                        style={{
                          width: `${Math.min(Math.max(score, 0), 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    className={`risk-badge ${String(
                      level
                    ).toLowerCase()}`}
                  >
                    {level}
                  </span>
                </td>

                <td>{incidents}</td>

                <td>
                  <span
                    className={`status-badge ${String(status).toUpperCase() === "OPEN"
                        ? "open"
                        : "restricted"
                      }`}
                  >
                    ● {String(status).toUpperCase()}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RiskTable;