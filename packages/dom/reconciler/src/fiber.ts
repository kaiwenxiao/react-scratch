import { WorkTags } from "./workTags";
import { Key, Props, Ref } from "../../shared/ReactTypes";
import { Flags, NoFlags } from "./fiberFlags";
import { Effect } from "./fiberHooks";
import { Container } from "hostConfig";

export interface OffscreenProps {
  mode: "visible" | "hidden";
  children: any;
}

export class FiberNode {
  type: any;
  tag: WorkTags;
  pendingProps: Props;
  key: Key;
  stateNode: any; // true dom
  ref: Ref;

  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  oarent: FiberNode | null;
  index: number;

  memorizedProps: Props | null;
  memorizedState: any;

  alternate: FiberNode | null;
  flags: Flags;
  subtreeFlags: Flags;
  updateQueue: unknown;
  deletions: FiberNode[] | null;

  constructor(tag: WorkTags, pendingProps: Props, key: Key) {
    this.tag = tag; // React Component
    this.key = key || null;
    this.stateNode = null;
    this.type = null;

    this.return = null; // parent fiberNode
    this.sibling = null;
    this.child = null;
    this.index = 0;

    this.ref = null;

    this.pendingProps = pendingProps;
    this.memorizedProps = null;
    this.memorizedState = null;
    this.updateQueue = null;

    this.alternate = null;
    this.flags = NoFlags;

    this.subtreeFlags = NoFlags;
    this.deletions = null;
  }
}

export interface PendingPassiveEffects {
  unmount: Effect[];
  update: Effect[];
}

export class FiberRootNode {
  container: Container;
  current: FiberNode;
  finishedWork: FiberNode | null;
  pendingLanes: Lanes;
}
