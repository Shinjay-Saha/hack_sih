function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">🛣️</div>
        <div>
          <h2>RoadGuard</h2>
          <span>Smart Road Safety</span>
        </div>
      </div>

      <nav className="nav">
        <p className="nav-title">MAIN MENU</p>

        <a className="nav-item active" href="#">
          <span>▣</span>
          Dashboard
        </a>

        <a className="nav-item" href="#">
          <span>⚠</span>
          Risk Analysis
        </a>

        <a className="nav-item" href="#">
          <span>⌖</span>
          Risk Map
        </a>

        <a className="nav-item" href="#">
          <span>◉</span>
          Incidents
        </a>

        <a className="nav-item" href="#">
          <span>➤</span>
          Safe Routes
        </a>

        <p className="nav-title">SYSTEM</p>

        <a className="nav-item" href="#">
          <span>⚙</span>
          Settings
        </a>
      </nav>

      <div className="system-card">
        <div className="system-dot"></div>
        <div>
          <strong>System Online</strong>
          <small>All services operational</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;