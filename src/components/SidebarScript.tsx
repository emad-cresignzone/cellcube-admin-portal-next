import { sidebarScript } from "./constants/sidebarScript";

/** Injects the pre-paint sidebar bootstrap into the document head. */
export default function SidebarScript() {
  return <script dangerouslySetInnerHTML={{ __html: sidebarScript }} />;
}
