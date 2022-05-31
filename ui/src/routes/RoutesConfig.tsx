import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/loader/Loader";
import AppContainer from "../pages/app-container/AppContainer";
import NotFound from "../pages/not-found/NotFound";
import { PATH } from "../constants/Constants";

const UsersList = lazy(() => import("../pages/user-list/UserList"));
const UserDetail = lazy(() => import("../pages/user-detail/UserDetail"));

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path={PATH.MAIN_LAYOUT} element={<AppContainer />}>
        <Route index element={<Navigate to={PATH.USERS} />} />
        <Route
          path={PATH.USERS}
          element={
            <Suspense fallback={<Loader />}>
              <UsersList />
            </Suspense>
          }
        />
        <Route
          path={PATH.USER_DETAIL}
          element={
            <Suspense fallback={<Loader />}>
              <UserDetail />
            </Suspense>
          }
        />
        <Route path={PATH.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
}
