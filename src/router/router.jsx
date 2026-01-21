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
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../pages/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../pages/Dashboard/MyEarnings/MyEarnings";
import Payouts from "../pages/Dashboard/Payouts/Payouts";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AboutUs from "../pages/AboutUs/AbouUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";


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
        path:'about',
        Component:AboutUs
      },
      {
        path:'contact',
        Component: ContactUs
      },
      {
        path: "forbidden",
        Component: Forbidden
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
        index: true,
        Component: DashboardHome

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
      },
      {
        path: "assign-rider",
        element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
      },
      {
        path: "pending-riders",
        element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path: "active-riders",
        element: <AdminRoute> <ActiveRiders></ActiveRiders></AdminRoute>
      },
      {
        path: 'payouts',
        element: <AdminRoute><Payouts></Payouts></AdminRoute>
      },
      {
        path: "make-admin",
        element: <AdminRoute> <MakeAdmin></MakeAdmin> </AdminRoute>
      },
      {
        path: 'pending-deliveries',
        element: <RiderRoute><PendingDeliveries></PendingDeliveries></RiderRoute>
      },
      {
        path: 'completed-deliveries',
        element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
      },
      {
        path: 'rider-earnings',
        element: <RiderRoute><MyEarnings></MyEarnings></RiderRoute>
      },


    ],
  },
]);