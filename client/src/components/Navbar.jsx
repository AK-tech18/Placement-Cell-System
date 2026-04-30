export default function Navbar() {
  return (
    <div className="navbar glass">

      <div className="nav-left">
        <h2>Dashboard</h2>
      </div>

      <div className="nav-right">
        <input placeholder="Search..." />
        <div className="nav-avatar"></div>
      </div>

    </div>
  );
}