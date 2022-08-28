import { patch, h } from "./vdom";
import type { VNode } from "./types";
const container = document.getElementById("app");

{
  let currentVnode: VNode;

  const singleTon: {
    [key in string]: any;
  } = {
    a: 1,
    b: 2,
    arr: [3, 4, [5, 6], { c: 7, d: 8 }],
  };

  function destroy() {
    currentVnode &&
      patch(
        currentVnode,
        h("!", {
          hooks: {
            post: () => {
              console.log("Unmounting");
            },
          },
        })
      );
  }
  const templateRender = (prop: { proxy: typeof singleTon }) => {
    const { proxy } = prop;
    return h("div#app", {}, [
      h("div", [JSON.stringify(proxy)]),
      h("div", [
        h("button", {}, ["patch"]),
        h(
          "button",
          {
            on: {
              click: () => {
                proxy.a++;
              },
            },
          },
          ["a++"]
        ),
        h(
          "button",
          {
            on: {
              click: () => {
                proxy.b++;
              },
            },
          },
          ["b++"]
        ),
        h(
          "button",
          {
            on: {
              click: () => {
                proxy.c = 3;
              },
            },
          },
          ["add c:3"]
        ),
        h(
          "button",
          {
            on: {
              click: () => {
                delete proxy.c;
              },
            },
          },
          ["delete c:3"]
        ),
        h(
          "button",
          {
            on: {
              click: () => {
                destroy();
              },
            },
          },
          ["destroy"]
        ),
      ]),
    ]);
  };
  const revocable = Proxy.revocable(singleTon, {
    set(obj, prop, value) {
      const flag = Reflect.set(obj, prop, value);
      flag && onDataChange();
      return flag;
    },
    defineProperty(target, property, descriptor) {
      const flag = Reflect.defineProperty(target, property, descriptor);
      flag && onDataChange();
      return flag;
    },
    deleteProperty(target, p) {
      const flag = Reflect.deleteProperty(target, p);
      flag && onDataChange();
      return flag;
    },
  });
  const proxy = revocable.proxy;

  function appMounted() {
    const vnode = templateRender({ proxy });
    return patch(container, vnode);
  }
  function onDataChange() {
    const newVNode = templateRender({ proxy });
    currentVnode = patch(currentVnode, newVNode);
    return currentVnode;
  }

  currentVnode = appMounted();
}
