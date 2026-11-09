import common from "./common.json";
import navigation from "./navigation.json";
import dashboard from "./dashboard.json";
import audit from "./audit.json";
import roles from "./roles.json";
import systemSettings from "./systemSettings.json";
import users from "./users.json";
import settings from "./settings.json";
import validation from "./validation.json";

/**
 * English is the source: its keys are the message ids the whole app calls
 * `t()` with, and `MessageKey` is derived from them.
 */
export const enMessages = {
  ...common,
  ...navigation,
  ...dashboard,
  ...audit,
  ...roles,
  ...systemSettings,
  ...users,
  ...settings,
  ...validation,
};

export type MessageKey = keyof typeof enMessages;

export default enMessages;
