import { Route, Routes } from "react-router";
import AuctionsView from "../Auctions/AuctionsView";
import LoginView from "../auth/LoginView/LoginView";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuctionsView />} />
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </>
  );
};

export default Main;
