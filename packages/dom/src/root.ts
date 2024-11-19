import { Container } from "hostConfig";
import { ReactElementType } from "../shared/ReactTypes";

export function createRoot(container: Container) {
  const root = createContainer(container);

  return {
    render(element: ReactElementType) {
      initEvent(container, "click");
      return updateContainer(element, root);
    },
  };
}
