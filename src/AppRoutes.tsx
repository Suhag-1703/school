import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";




const NotFound = lazy(() => import("../src/public/NotFound"));


const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};
function AppRoutes() {


  return (
    <>
      <Router>
        <Layout>
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content="For a more personalized experience, login" />
            <meta name="keywords" content="School Services." />
            <title>School Services</title>
          </Helmet>
          <ScrollToTop/>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </>
  )
}

export default AppRoutes;
