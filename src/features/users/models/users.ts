import { usersData } from "../constants/usersData";
import type { User } from "../interfaces/UserApi";

/**
 * --------------------------------------------------
 *  Functions
 * --------------------------------------------------
 */
export const fetchUsers = async (): Promise<User[]> => usersData;

export const getUser = async (id: string): Promise<User | undefined> =>
  usersData.find((user) => user.id === id);
