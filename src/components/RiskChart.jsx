function RiskChart() {
  return (
    <div className="chart-container">
      <div className="chart-bars">
        <div className="bar-item">
          <div className="bar-value">10</div>
          <div className="bar low-bar"></div>
          <span>Low</span>
        </div>

        <div className="bar-item">
          <div className="bar-value">9</div>
          <div className="bar medium-bar"></div>
          <span>Medium</span>
        </div>

        <div className="bar-item">
          <div className="bar-value">6</div>
          <div className="bar high-bar"></div>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}

export default RiskChart;