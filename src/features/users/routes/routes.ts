/** Endpoint paths — unused until the module has a backend. */
export const usersRoutes = {
  index: "/users",
  show: (id: string) => `/users/${id}`,
} as const;
