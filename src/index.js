import { createRoot } from "react-dom/client";
import "./index.css";
import "@asu/unity-bootstrap-theme/dist/css/unity-bootstrap-theme.css";
import Events from "./Events";

const domNodes = document.getElementsByClassName("clas-events-react-base");

for (let node of domNodes) {
  const root = createRoot(node);
  root.render(<Events dataFromPage={node.dataset} />);
}
