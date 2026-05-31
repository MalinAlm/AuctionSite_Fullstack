import { Route, Routes } from "react-router";
import AuctionsView from "../Auctions/AuctionsView";
import LoginView from "../auth/LoginView/LoginView";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import AuctionDetailsView from "../AuctionDetails/AuctionDetailsView";
import CreateAuctionView from "../CreateAuction/CreateAuctionView";
import UpdateAuctionView from "../UpdateAuction/UpdateAuctionView";
import MyPagesView from "../MyPages/MyPagesView";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuctionsView />} />

        <Route path="/auction/:id" element={<AuctionDetailsView />} />

        <Route
          path="/create-auction"
          element={
            <ProtectedRoute>
              <CreateAuctionView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/auction/:id/edit"
          element={
            <ProtectedRoute>
              <UpdateAuctionView />
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

        <Route
          path="/my-pages"
          element={
            <ProtectedRoute>
              <MyPagesView />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginView />} />
      </Routes>
    </>
  );
};

export default Main;
