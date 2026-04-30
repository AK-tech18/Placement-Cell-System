import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />
        {children}
      </div>
    </div>
  );
}