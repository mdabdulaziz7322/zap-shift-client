import {
  createBrowserRouter
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Homepage/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/LogIn/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Overview from "../pages/Dashboard/Overview/Overview";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/BeARider/BeARider";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch('/serviceCenter.json')
      },
      {
        path: "send-parcel",
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
      },
      {
        path: "rider",
        element: <PrivateRoute> <BeARider></BeARider> </PrivateRoute>
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "overview",
        Component: Overview
      },
      {
        path: "my-parcels",
        Component: MyParcels
      },
      {
        path: "payment-history",
        Component: PaymentHistory
      },
      {
        path: "track-parcel",
        Component: TrackParcel
      }
    ],
  },
]);