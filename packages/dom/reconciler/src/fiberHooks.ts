import { Flags } from "./fiberFlags";
import { FiberNode } from "./fiber";

let currentlyRenderingFiber: FiberNode | null = null;
let workInProgressHook: Hook | null = null;

interface Hook {
  memorizedState: any;
  updateQueue: unknown;
  next: Hook | null;
}

export interface Effect {
  tag: Flags;
  create: EffectCallback | void;
  destroy: EffectCallback | void;
  deps: EffectDeps;
  next: Effect | null;
}

type EffectCallback = () => void;
type EffectDeps = any[] | null;

// export function renderWithHooks(wip: FiberNode, lane: Lane) {
//
// }
