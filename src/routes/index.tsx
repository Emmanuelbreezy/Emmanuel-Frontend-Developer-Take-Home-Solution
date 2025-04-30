import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseRoute from "./baseRoute";
import AppLayout from "@/layout/app-layout";
import { BaseRoutePaths } from "./common/routes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Route */}
        <Route element={<BaseRoute />}>
          <Route element={<AppLayout />}>
            {BaseRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
        {/* Catch-all for undefined routes */}
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
