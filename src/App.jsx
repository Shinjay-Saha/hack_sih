import { useEffect, useState } from "react";
import { getHealth, getSummary, getDataset, getPrediction } from "./api";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import RiskTable from "./components/RiskTable";
import RiskChart from "./components/RiskChart";
import { roads, stats, incidents } from "./data/mockData";
import "./App.css";

function normalizeRoad(road) {
  return {
    id: road.road_id ?? road.id ?? "N/A",
    name: road.road_name ?? road.name ?? road.road_id ?? "Unknown Road",
    score: Number(
      road.final_risk_score ??
      road.road_risk_score ??
      road.risk_score ??
      road.score ??
      0
    ),
    level: String(
      road.risk_level ??
      road.level ??
      "LOW"
    ).toUpperCase(),
    incidents: Number(
      road.incidents ??
      road.incident_count ??
      0
    ),
    status: String(
      road.status ??
      "OPEN"
    ).toUpperCase(),
  };
}

function normalizeIncident(incident) {
  return {
    id: incident.incident_id ?? incident.id ?? Math.random(),
    type:
      incident.incident_type ??
      incident.type ??
      incident.description ??
      "Incident",
    location:
      incident.location ??
      incident.road_id ??
      "Unknown location",
    severity: String(
      incident.severity ??
      "LOW"
    ).toUpperCase(),
    time:
      incident.timestamp ??
      incident.time ??
      incident.date ??
      "Recently",
  };
}

function App() {
  const [backendStatus, setBackendStatus] = useState("checking");
  const [summary, setSummary] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [backendRoads, setBackendRoads] = useState([]);
  const [backendIncidents, setBackendIncidents] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionError, setPredictionError] = useState(null);
  const roadStats = backendRoads.reduce(
    (acc, road) => {
      acc.total++;

      if (road.level === "HIGH") {
        acc.high++;
      } else if (road.level === "MEDIUM") {
        acc.medium++;
      } else if (road.level === "LOW") {
        acc.low++;
      }

      return acc;
    },
    {
      total: 0,
      high: 0,
      medium: 0,
      low: 0,
    }
  );

  async function handleSafestRoute() {
    try {
      setPredictionLoading(true);
      setPredictionError(null);

      const result = await getPrediction("R002");

      console.log("PREDICTION:", result);

      setPrediction(result.prediction);
    } catch (error) {
      console.error(error);
      setPredictionError(error.message);
    } finally {
      setPredictionLoading(false);
    }
  }

  useEffect(() => {
    async function connectBackend() {
      try {
        await getHealth();

        setBackendStatus("connected");

        const summaryData = await getSummary();
        console.log("BACKEND SUMMARY:", summaryData);
        setSummary(summaryData);

        const roadsData = await getDataset("roads");
        console.log("BACKEND ROADS:", roadsData);
        setBackendRoads(roadsData.records.map(normalizeRoad));

        const incidentsData = await getDataset("incidents");
        console.log("BACKEND INCIDENTS:", incidentsData);
        setBackendIncidents(incidentsData.records.map(normalizeIncident));

      } catch (error) {
        console.error(error);
        setBackendStatus("error");
        setApiError(error.message);
      }
    }

    connectBackend();
  }, []);
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
              title="Total Roads"
              value={roadStats.total || stats.totalRoads}
              subtitle="Currently monitored"
              icon="▤"
              type="blue"
            />

            <StatCard
              title="High Risk"
              value={roadStats.high || stats.highRisk}
              subtitle="Immediate attention"
              icon="⚠"
              type="red"
            />

            <StatCard
              title="Medium Risk"
              value={roadStats.medium || stats.mediumRisk}
              subtitle="Needs monitoring"
              icon="◈"
              type="yellow"
            />

            <StatCard
              title="Incidents"
              value={backendIncidents.length || stats.incidents}
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

            <RiskChart roads={backendRoads} />

            <div className="risk-total">
              <span>Total monitored roads</span>
              <strong>{backendRoads.length || stats.totalRoads}</strong>
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

          <RiskTable roads={backendRoads.length ? backendRoads : roads} />
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
              {(backendIncidents.length ? backendIncidents : incidents).map((incident, index) => (
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
                <strong>
                  {prediction?.final_risk_score ?? "—"}
                </strong>

                <span>
                  {prediction?.risk_level ?? "NOT CHECKED"}
                </span>
              </div>
            </div>

            {predictionError && (
              <p className="api-error">
                {predictionError}
              </p>
            )}

            <button
              className="safe-route-button"
              onClick={handleSafestRoute}
              disabled={predictionLoading}
            >
              {predictionLoading
                ? "Analyzing..."
                : "Find Safest Route →"}
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