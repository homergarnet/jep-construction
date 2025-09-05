import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";
import Layout from "@/layout/Layout";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/admin/Login";
import EmployeeLogin from "@/pages/employee/Login";

import EmployeeListPage from "@/pages/admin/Employee/EmployeeListPage";
import EmployeeAttendancePage from "@/pages/admin/Employee/EmployeeAttendancePage";
import PayslipPage from "@/pages/admin/Employee/EmployeePayslipPage";
import ProjectManagement from "@/pages/admin/ProjectManagement";
import Reviews from "@/pages/Reviews";
import Messages from "@/pages/Messenger/Messages";
import Inventory from "@/pages/Inventory";
import EmployeePayslipPage from "@/pages/admin/Employee/EmployeePayslipPage";
import ClientRequest from "@/pages/admin/ClientRequest";
import Profile from "@/pages/Profile";

const Page404 = React.lazy(() => import("../pages/Page404"));

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path=""
        element={
          <Suspense fallback={<div>Loading...</div>}>
            {/* <Layout /> */}
            {/* <EmployeeListPage /> */}
            {/* <EmployeeAttendancePage /> */}
            {/* <EmployeePayslipPage /> */}
            {/* <ClientRequest /> */}
            {/* <ProjectManagement /> */}
            {/* <Reviews /> */}
            {/* <Inventory /> */}
            {/* <Profile /> */}
            <Messages />
            {/* <HomePage /> */}
            {/* <Login /> */}
          </Suspense>
        }
      />
      <Route
        path="admin/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            {/* <Layout /> */}
            {/* <HomePage /> */}
            <Login />
          </Suspense>
        }
      />

      {/* Protected routes for role 1 */}
      <Route element={<ProtectedRoute roles={[1]} />}>
        <Route
          path="admin/employee-list"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EmployeeListPage />
            </Suspense>
          }
        />
        <Route
          path="admin/attendance"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EmployeeAttendancePage />
            </Suspense>
          }
        />
        <Route
          path="admin/payslip"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PayslipPage />
            </Suspense>
          }
        />
        <Route
          path="admin/project-management"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProjectManagement />
            </Suspense>
          }
        />
        <Route
          path="admin/reviews"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Reviews />
            </Suspense>
          }
        />
        <Route
          path="admin/messages"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Messages />
            </Suspense>
          }
        />
        <Route
          path="admin/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Inventory />
            </Suspense>
          }
        />
      </Route>

      {/* Protected routes for role 2 */}
      <Route element={<ProtectedRoute roles={[2]} />}>
        <Route
          path="employee/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EmployeeLogin />
            </Suspense>
          }
        />

      </Route>
      {/* Catch-all route for 404 */}
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Page404 />
          </Suspense>
        }
      />
    </Route>
  )
);

export default Router;
