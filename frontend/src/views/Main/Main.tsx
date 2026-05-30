import { Route, Routes } from "react-router";
import AuctionsView from "../Auctions/AuctionsView";
import LoginView from "../auth/LoginView/LoginView";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuctionsView />} />
        <Route path="/login" element={<LoginView />} />

        <Route
          path="/create-auction"
          element={
            <ProtectedRoute>
              <div>Create auction Page</div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <div>Admin page</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Main;
