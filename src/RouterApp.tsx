import { BrowserRouter, Route, RouteProps, Routes } from "react-router-dom";
import { RequestInterceptor } from "./interceptors";
import LoginView from "./UI/Routes/LoginView";
import NotFoundView from "./UI/Routes/NotFoundView/Index";
import routePaths from "./constants/routePaths";
import LayoutApp from "./UI/Components/Layaout";
import { ConfigProvider } from "antd";
import { lazy, Suspense } from "react";
import ContentLoading from './UI/Components/contentLoading';

const PoemasView = lazy(() => import('./UI/Routes/PoemasView/index'))
const PoemasReadView = lazy(() => import('./UI/Routes/PoemasView/readView'))
const PoemasCreateEdit = lazy(() => import('./UI/Routes/PoemasView/CreateOrEdit'))
const PoemasVidaView = lazy(() => import('./UI/Routes/PoemasVidaView/index'))
const PoemasVidaReadView = lazy(() => import('./UI/Routes/PoemasVidaView/readView'))
const PoemasVidaCreateEdit = lazy(() => import('./UI/Routes/PoemasVidaView/CreateOrEdit'))

const HomeRoutes = () => {
    const routes: RouteProps[] = [
        {
            path: routePaths.AMOR,
            children: <>
                <Route index element={<PoemasView />} />
                <Route path={routePaths.DEFAULTSEE} element={<PoemasReadView />} />
                <Route path={routePaths.DEFAULTEDITCREATE} element={<PoemasCreateEdit />} />
            </> 
        },
        {
            path: routePaths.VIDA,
            children: <>
                <Route index element={<PoemasVidaView />} />
                <Route path={routePaths.DEFAULTSEE} element={<PoemasVidaReadView />} />
                <Route path={routePaths.DEFAULTEDITCREATE} element={<PoemasVidaCreateEdit />} />
            </>
        }
    ]

    return (
        <ConfigProvider 
            theme={{
                token: {
                    colorPrimary: '#fa1f03'
                }
            }}
        >
            <Suspense fallback={<ContentLoading />} >
                    <Routes>
                        {routes.map((route, index) => (
                            console.log(route, index),
                            <Route key={index} {...route} />
                        ))}
                    <Route path="*" element={<NotFoundView />} />
                </Routes>
            </Suspense>
        </ConfigProvider>
    )
}


export default function RouterApp() {

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    return (
        <BrowserRouter>
            <RequestInterceptor>
            </RequestInterceptor>

            <Routes>
                <Route path={routePaths.LOGIN} element={<LoginView />} index/>
                <Route path="*" element={<NotFoundView />} />
                <Route element={<LayoutApp />}>
                    <Route path={`${routePaths.DEFAULT_HOME}/*`} element={<HomeRoutes />} />
                </Route>
            </Routes> 
        </BrowserRouter>
    )
}