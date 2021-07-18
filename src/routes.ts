import Details from "./Details";
import Initial from "./Initial";
import { IRoute } from "./interfaces";
import Settings from "./Settings";

export const routes: IRoute[] = [
    {
      path: '/',
      component: Initial,
      exact: true,
    },
    {
      path: '/settings',
      component: Settings,
      exact: true,
    },
    {
      path: '/build/:number',
      component: Details,
      exact: true,
    }
  ]