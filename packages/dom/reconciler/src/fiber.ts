import {WorkTags} from "./workTags";
import {Key, Props, Ref, Wakeable} from "../../shared/ReactTypes";
import {Flags, NoFlags} from "./fiberFlags";
import {Effect} from "./fiberHooks";
import {Container} from "hostConfig";
import {Lane, Lanes, NoLane, NoLanes} from "./fiberLanes";
import {CallbackNode} from "scheduler";

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
  parent: FiberNode | null;
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
    this.parent = null;
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
  finishedLane: Lane;
  pendingPassiveEffect: PendingPassiveEffects;

  callbackNode: CallbackNode | null;
  callbackPriority: Lane;

  pingCache: WeakMap<Wakeable<any>, Set<Lane>> | null;

  suspendedLanes: Lanes;
  pingedLanes: Lanes;

  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container;
    this.current = hostRootFiber;
    hostRootFiber.stateNode = this;
    this.finishedWork = null;

    this.pendingLanes = NoLanes;
    this.suspendedLanes = NoLanes;
    this.pingedLanes = NoLanes;

    this.finishedLane = NoLanes;

    this.callbackNode = null;
    this.callbackPriority = NoLane;

    this.pendingPassiveEffect = {
      unmount: [],
      update: []
    };

    this.pingCache = null;
  }
}

export const createWorkInProgress = (
  current: FiberNode,
  pendingProps: Props
): FiberNode => {
  let wip = current.alternate;

  if (wip === null) {
    // mount
    wip = new FiberNode(current.tag, pendingProps, current.key);
    wip.stateNode = current.stateNode;
    wip.alternate = current;
    current.alternate = wip;
  } else {
    // update
    wip.pendingProps = pendingProps;
    wip.flags = NoFlags;

    wip.subtreeFlags = NoFlags;
    wip.deletions = null;
  }
  wip.type = current.type;
  wip.updateQueue = current.updateQueue;
  wip.child = current.child;
  wip.memorizedState = current.memorizedState;
  wip.ref = current.ref;
  wip.memorizedProps = current.memorizedProps;

  return wip;
}
