import common from "./common.json";
import navigation from "./navigation.json";
import dashboard from "./dashboard.json";
import audit from "./audit.json";
import roles from "./roles.json";
import systemSettings from "./systemSettings.json";
import users from "./users.json";
import settings from "./settings.json";
import validation from "./validation.json";

import type { MessageKey } from "../en";

const messages: Record<MessageKey, string> = {
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

export default messages;
