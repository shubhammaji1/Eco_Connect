import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import { VendorVault } from "./pages/VendorVault";
import AboutUs from "./pages/AboutUs";
import  {ErrorPage}  from "./pages/ErrorPage"; // Import your error page
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import RefundPolicy from "./pages/RefundPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />, // Use the ErrorPage component as the fallback for this route
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/offerings",
    element: <VendorVault />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/refund-policy",
    element: <RefundPolicy />,
    errorElement: <ErrorPage />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

