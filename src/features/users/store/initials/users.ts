import { createListState } from "@/utils/createListState";
import { usersData } from "../../constants/usersData";
import type { UsersState } from "../interfaces/users";

export const initialUsersState: UsersState = { ...createListState(usersData), edit: null };
