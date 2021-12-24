import Loading from "@components/Loading";
import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import OptionPage from "./Option";
import ProductListPage from "./PassbookList";
import UserPage from "./User";
import UserPassbookListPage from "./UserPassbookList";

const Dashboard = lazy(() => import(`./Dashboard`));
interface IApp {}

const App: React.FC<IApp> = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/passbook" element={<ProductListPage />} />
        <Route path="/passbook/:id" element={<ProductListPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/passbook/:id" element={<UserPassbookListPage />} />
        <Route path="/option" element={<OptionPage />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
