import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


const Login = lazy(() => import('../src/'));

const NotFound = lazy(() => import("../src/public/NotFound"));


function AppRoutes() {

  const ScrollToTop = () => { return (window.scrollTo(0, 0)) }

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
          {ScrollToTop()}
          <Suspense fallback={<></>}>
            <Routes>
              <Route path="/" element={<Login />} />
           

             
            

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </>
  )
}

export default AppRoutes;
