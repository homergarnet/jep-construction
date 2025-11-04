import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const Login = React.lazy(() => import("../pages/admin/Login"));
const EmployeeLogin = React.lazy(() => import("../pages/employee/Login"));
const EmployeeListPage = React.lazy(() => import("../pages/admin/employee/EmployeeListPage"));
const EmployeeAttendancePage = React.lazy(() => import("../pages/admin/employee/EmployeeAttendancePage"));
const AssignProjectPage = React.lazy(() => import("../pages/admin/employee/AssignProjectPage"));
const ClientLogin = React.lazy(() => import("../pages/client/Login"));
const PayslipPage = React.lazy(() => import("../pages/admin/employee/EmployeePayslipPage"));
const ClientListPage = React.lazy(() => import("../pages/admin/ClientListPage"));
const ProjectManagementPage = React.lazy(() => import("../pages/admin/ProjectManagementPage"));
const ReviewPage = React.lazy(() => import("../pages/ReviewPage"));
const Messages = React.lazy(() => import("../pages/Messenger/Messages"));
const InventoryPage = React.lazy(() => import("../pages/InventoryPage"));
const ClientRequestPage = React.lazy(() => import("../pages/admin/ClientRequestPage"));
const ProfilePage = React.lazy(() => import("../pages/ProfilePage"));
const InOut = React.lazy(() => import("../pages/employee/InOut"));
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
            {/* <Messages /> */}
            <HomePage />
            {/* <Login /> */}
          </Suspense>
        }
      />
      <Route
        path="admin/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="employee/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <EmployeeLogin />
          </Suspense>
        }
      />
      <Route
        path="client/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ClientLogin />
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
          path="admin/assign-project"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AssignProjectPage />
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
          path="admin/client-list"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ClientListPage />
            </Suspense>
          }
        />
        <Route
          path="admin/project-management"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProjectManagementPage />
            </Suspense>
          }
        />
        <Route
          path="admin/reviews"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ReviewPage />
            </Suspense>
          }
        />
        <Route
          path="admin/client-request"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ClientRequestPage />
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
          path="admin/inventory"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <InventoryPage />
            </Suspense>
          }
        />
        <Route
          path="admin/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProfilePage />
            </Suspense>
          }
        />

      </Route>

      {/* Protected routes for role 2 */}
      <Route element={<ProtectedRoute roles={[2]} />}>
        <Route
          path="employee/in-out"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <InOut />
            </Suspense>
          }
        />
        <Route
          path="employee/in-out-list"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EmployeeAttendancePage />
            </Suspense>
          }
        />
        <Route
          path="employee/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProfilePage />
            </Suspense>
          }
        />
      </Route>
      {/* Protected routes for role 3 */}
      <Route element={<ProtectedRoute roles={[3]} />}>
        <Route
          path="client/my-projects"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProjectManagementPage />
            </Suspense>
          }
        />
        <Route
          path="client/inventory"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <InventoryPage />
            </Suspense>
          }
        />
        <Route
          path="client/messages"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Messages />
            </Suspense>
          }
        />
        <Route
          path="client/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProfilePage />
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
