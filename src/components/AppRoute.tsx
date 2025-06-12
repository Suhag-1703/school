import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Login = React.lazy(()=>import('./Login'));
const DashBoard = React.lazy(() => import('./DashBoard'));
const PageNotFound = React.lazy(() => import('../public/PageNotFound'));

const AppRoute: React.FC = () => {
    const helmetCotent = () => {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="For a more personalized experience, login" />
                <meta name="keywords" content="School Services." />
                <title>School Services</title>
            </Helmet>
        )
    }

    return (
        <>
            {helmetCotent()}
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path='/' element={<DashBoard />}></Route>
                        <Route path='/Login' element={<Login />}></Route>
                        <Route path='*' element={<PageNotFound />}></Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default AppRoute