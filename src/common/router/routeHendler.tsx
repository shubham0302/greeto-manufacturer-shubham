import { isNil } from "lodash";
import { RouteProps, matchPath } from "react-router-dom";

export type RouteOption = {
  hideHeader?: boolean;
  hideSideBar?: boolean;
  name?: string;
  icon?: React.ReactElement;
  shouldIncludeInNavigation?: boolean;
};

export type SFRouteProps = {
  isPublic: boolean;
  props: RouteProps;
  options: RouteOption;
};

class RouteHandler {
  private routes: Map<string, SFRouteProps> = new Map();

  private getRoutes(isPublic: boolean): SFRouteProps[] {
    const values = Array.from(this.routes.values());
    return values.filter((e) => e.isPublic === isPublic);
  }
  getPrivateRoutes(): SFRouteProps[] {
    return this.getRoutes(false);
  }
  getPublicRoutes(): SFRouteProps[] {
    return this.getRoutes(true);
  }

  private registerRoute(
    props: RouteProps,
    pOptions?: RouteOption,
    isPublic?: boolean
  ): void {
    const { path } = props;
    const options: RouteOption = {
      ...pOptions,
      hideHeader: isNil(pOptions?.hideHeader) ? isPublic : pOptions?.hideHeader,
      hideSideBar: isNil(pOptions?.hideSideBar)
        ? isPublic
        : pOptions?.hideSideBar,
      shouldIncludeInNavigation: pOptions?.shouldIncludeInNavigation || false,
    };
    this.routes.set(path, {
      isPublic,
      props,
      options,
    });
  }
  registerPrivateRoute(props: RouteProps, options?: RouteOption): void {
    this.registerRoute(props, options, false);
  }
  registerPublicRoute(props: RouteProps, options?: RouteOption): void {
    this.registerRoute(props, options, true);
  }

  getRouteByMatch(path: string): SFRouteProps | undefined {
    const routes = Array.from(this.routes.entries());
    const match = routes.find(([p]) =>
      matchPath(
        {
          path: p,
          end: true,
        },
        path
      )
    );

    const [, routeProps] = match || [];
    return routeProps;
  }

  hasRoute(path: string): boolean {
    return this.getRouteByMatch(path) !== undefined;
  }

  isCurrentRoute(path: string, currentPath: string): boolean {
    console.log(
      path,
      currentPath,
      this.getRouteByMatch(currentPath)?.props?.path === path,
      "currentPAth"
    );

    return this.getRouteByMatch(currentPath)?.props?.path === path;
  }
}

export const routeHandler = new RouteHandler();
