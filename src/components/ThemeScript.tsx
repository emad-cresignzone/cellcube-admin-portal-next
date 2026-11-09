import { themeScript } from "./constants/themeScript";

/** Injects the pre-paint theme bootstrap into the document head. */
export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
