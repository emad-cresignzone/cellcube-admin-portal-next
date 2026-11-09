import { rolesData } from "../constants/rolesData";
import type { Role } from "../interfaces/RoleApi";

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */
export const fetchRoles = async (): Promise<Role[]> => rolesData;

export const getRole = async (id: string): Promise<Role | undefined> =>
  rolesData.find((role) => role.id === id);
