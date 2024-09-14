import React, { Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

import PageLoading from "../components/page-loading/PageLoading";
import { LayoutPage } from "../components/page";
import Page404 from "../pages/errors/Page404";
import BottomNavBar from "../components/BottomNavBar";
import Home from "../pages/Home";
import AgentPage from "../pages/Agent";
import Airdrop from "../pages/Airdrop";
import Earn from "../pages/Earn";
import Tmp3 from "../pages/Tmp3";
import Tmp4 from "../pages/Tmp4";
import Workforce from "../pages/Workforce";

const getRouteElementPublic = (
  Component: React.ElementType
): React.ReactNode => {
  return (
    <Suspense fallback={<PageLoading />}>
      <LayoutPage>
        <Component />
        <BottomNavBar />
      </LayoutPage>
    </Suspense>
  );
};

const routes: RouteObject[] = [
  { path: "*", element: getRouteElementPublic(Page404) },
  { path: "/", element: getRouteElementPublic(Home) },
  { path: "/agents", element: getRouteElementPublic(AgentPage) },
  { path: "/earn", element: getRouteElementPublic(Earn) },
  { path: "/airdrop", element: getRouteElementPublic(Airdrop) },
  { path: "/settings", element: getRouteElementPublic(Tmp3) },
  { path: "/settings/languages", element: getRouteElementPublic(Tmp4) },
  { path: "/workforce", element: getRouteElementPublic(Workforce) },
];

const Router = createBrowserRouter(routes);

export default Router;
