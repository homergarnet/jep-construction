import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";


import InOutList from "@/pages/employee/InOutList";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const Login = React.lazy(() => import("../pages/admin/Login"));
const EmployeeLogin = React.lazy(() => import("../pages/employee/Login"));
const EmployeeListPage = React.lazy(() => import("../pages/admin/Employee/EmployeeListPage"));
const EmployeeAttendancePage = React.lazy(() => import("../pages/admin/Employee/EmployeeAttendancePage"));
const ClientLogin = React.lazy(() => import("../pages/client/Login"));
const PayslipPage = React.lazy(() => import("../pages/admin/Employee/EmployeePayslipPage"));
const ProjectManagement = React.lazy(() => import("../pages/admin/ProjectManagement"));
const Reviews = React.lazy(() => import("../pages/Reviews"));
const Messages = React.lazy(() => import("../pages/Messenger/Messages"));
const Inventory = React.lazy(() => import("../pages/Inventory"));
const ClientRequest = React.lazy(() => import("../pages/admin/ClientRequest"));
const Profile = React.lazy(() => import("../pages/Profile"));
const MyProjects = React.lazy(() => import("../pages/client/MyProjects"));
const Feedback = React.lazy(() => import("../pages/client/Feedback"));
const In = React.lazy(() => import("../pages/employee/In"));
const EmployeeOut = React.lazy(() => import("../pages/employee/Out"));
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
          path="admin/client-request"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ClientRequest />
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
              <Inventory />
            </Suspense>
          }
        />
        <Route
          path="admin/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          }
        />
      </Route>

      {/* Protected routes for role 2 */}
      <Route element={<ProtectedRoute roles={[2]} />}>
        <Route
          path="employee/in"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <In />
            </Suspense>
          }
        />
        <Route
          path="employee/out"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EmployeeOut />
            </Suspense>
          }
        />
        <Route
          path="employee/in-out-list"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <InOutList />
            </Suspense>
          }
        />
        <Route
          path="employee/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
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
              <MyProjects />
            </Suspense>
          }
        />
        <Route
          path="client/inventory"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Inventory />
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
          path="client/feedback"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Feedback />
            </Suspense>
          }
        />
        <Route
          path="client/feedback"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="client/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
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
