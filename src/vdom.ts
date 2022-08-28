import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

export const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

export { h };
