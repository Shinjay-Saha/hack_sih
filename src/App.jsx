import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import RiskTable from "./components/RiskTable";
import RiskChart from "./components/RiskChart";
import { roads, stats, incidents } from "./data/mockData";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        {/* TOP HEADER */}
        <header className="top-header">
          <div>
            <h1>Road Safety Dashboard</h1>
            <p>Real-time road risk monitoring and analysis</p>
          </div>

          <div className="header-actions">
            <div className="date-info">
              <span>Last updated</span>
              <strong>Today, 12:05 AM</strong>
            </div>

            <div className="profile">
              <div className="profile-avatar">S</div>
              <div>
                <strong>Shivam</strong>
                <span>Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* OVERVIEW */}
        <section className="section">
          <div className="section-title">
            <div>
              <h2>Overview</h2>
              <p>Current road safety status</p>
            </div>

            <button className="refresh-button">
              ↻ Refresh Data
            </button>
          </div>

          <div className="stats-grid">
            <StatCard
              title="Total Roads"
              value={stats.totalRoads}
              subtitle="Currently monitored"
              icon="▤"
              type="blue"
            />

            <StatCard
              title="High Risk"
              value={stats.highRisk}
              subtitle="Immediate attention"
              icon="⚠"
              type="red"
            />

            <StatCard
              title="Medium Risk"
              value={stats.mediumRisk}
              subtitle="Needs monitoring"
              icon="◈"
              type="yellow"
            />

            <StatCard
              title="Incidents"
              value={stats.incidents}
              subtitle="Reported incidents"
              icon="!"
              type="purple"
            />
          </div>
        </section>

        {/* MAP + RISK CHART */}
        <section className="content-grid">
          <div className="dashboard-card map-card">
            <div className="card-header">
              <div>
                <h3>Road Risk Map</h3>
                <p>Live visualization of monitored roads</p>
              </div>

              <button className="map-button">View Full Map →</button>
            </div>

            <div className="map-area">
              <div className="map-grid"></div>

              <div className="road-line road-1"></div>
              <div className="road-line road-2"></div>
              <div className="road-line road-3"></div>

              <div className="map-marker marker-high marker-1">
                <span>R003</span>
              </div>

              <div className="map-marker marker-high marker-2">
                <span>R005</span>
              </div>

              <div className="map-marker marker-medium marker-3">
                <span>R001</span>
              </div>

              <div className="map-marker marker-low marker-4">
                <span>R002</span>
              </div>

              <div className="map-center">
                <div className="map-icon">⌖</div>
                <strong>Chaibasa Region</strong>
                <span>Risk monitoring active</span>
              </div>

              <div className="map-legend">
                <span>
                  <i className="legend-dot high"></i>
                  High Risk
                </span>
                <span>
                  <i className="legend-dot medium"></i>
                  Medium
                </span>
                <span>
                  <i className="legend-dot low"></i>
                  Low Risk
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h3>Risk Distribution</h3>
                <p>Roads by risk category</p>
              </div>
            </div>

            <RiskChart />

            <div className="risk-total">
              <span>Total monitored roads</span>
              <strong>{stats.totalRoads}</strong>
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="dashboard-card table-card">
          <div className="card-header">
            <div>
              <h3>Road Risk Analysis</h3>
              <p>Latest calculated road risk scores</p>
            </div>

            <button className="outline-button">
              View All Roads →
            </button>
          </div>

          <RiskTable roads={roads} />
        </section>

        {/* BOTTOM SECTION */}
        <section className="content-grid bottom-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h3>Recent Incidents</h3>
                <p>Latest reported safety events</p>
              </div>

              <button className="text-button">
                View All →
              </button>
            </div>

            <div className="incident-list">
              {incidents.map((incident, index) => (
                <div className="incident-item" key={index}>
                  <div className={`incident-icon ${incident.severity.toLowerCase()}`}>
                    {incident.severity === "HIGH" ? "!" : "•"}
                  </div>

                  <div className="incident-info">
                    <strong>{incident.type}</strong>
                    <span>{incident.location}</span>
                  </div>

                  <div className="incident-time">
                    <span className={`mini-badge ${incident.severity.toLowerCase()}`}>
                      {incident.severity}
                    </span>
                    <small>{incident.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card route-card">
            <div className="card-header">
              <div>
                <h3>Safe Route</h3>
                <p>AI-assisted route recommendation</p>
              </div>
            </div>

            <div className="route-box">
              <div className="route-point">
                <div className="point start"></div>
                <div>
                  <span>FROM</span>
                  <strong>Current Location</strong>
                </div>
              </div>

              <div className="route-line"></div>

              <div className="route-point">
                <div className="point destination"></div>
                <div>
                  <span>TO</span>
                  <strong>City Centre</strong>
                </div>
              </div>
            </div>

            <div className="route-result">
              <div>
                <span>Recommended Route</span>
                <strong>Route R002</strong>
              </div>

              <div className="route-score">
                <strong>21.31</strong>
                <span>LOW RISK</span>
              </div>
            </div>

            <button className="safe-route-button">
              Find Safest Route →
            </button>
          </div>
        </section>

        <footer>
          <span>RoadGuard • Smart Road Safety Platform</span>
          <span>AI Risk Analysis System</span>
        </footer>
      </main>
    </div>
  );
}

export default App;