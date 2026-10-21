import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("project", "routes/project.tsx"),
  route("team", "routes/team.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
