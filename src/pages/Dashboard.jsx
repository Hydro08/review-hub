import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <main className="min-h-screen w-screen">
      <h1>The system is under maintenance, but you are logged in.</h1>
      <br />
      <Link to="/">Back To Landpage</Link>
    </main>
  );
}
export default DashboardPage;
