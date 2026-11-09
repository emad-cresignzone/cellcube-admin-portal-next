import type { ListState } from "@/types/list";
import type { User } from "../../interfaces/UserApi";
import type { UserEditSection } from "../../interfaces/UsersProps";

export interface UserEditSession {
  userId: string;
  section: UserEditSection;
}

export interface UsersState extends ListState<User> {
  /** The one section being edited — the Edit profile button hides while set. */
  edit: UserEditSession | null;
}
