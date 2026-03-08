import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const navigate = useNavigate();
  return (
    <main>
      <h1>This is under development. Come again later!</h1>
      <button onClick={() => navigate(-1)} className="underline">
        Back button
      </button>
    </main>
  );
}

export default ProfilePage;
