import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        alert("Login first.");
        navigate("/");
      } else {
        setUser(session.user);
      }
    });
  }, []);

  return user ? children : null;
}

export default ProtectedRoute;
