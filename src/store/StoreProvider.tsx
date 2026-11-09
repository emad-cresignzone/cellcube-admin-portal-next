"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "./store";

/** Composes the Redux store into the app. Mounted once, in the locale layout. */
export default function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
