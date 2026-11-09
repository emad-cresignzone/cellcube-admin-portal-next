/** Endpoint paths — unused until the module has a backend. */
export const rolesRoutes = {
  index: "/roles",
  show: (id: string) => `/roles/${id}`,
} as const;
