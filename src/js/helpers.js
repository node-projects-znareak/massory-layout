import { SM_SIZE, MD_SIZE, LG_SIZE, COLUMN_CLASSNAME } from "./config.js";

export function assigns(e, props) {
  for (const [k, v] of Object.entries(props)) {
    e[k] = v;
  }
  return e;
}

export function element(tag, props) {
  const e = document.createElement(tag);
  return assigns(e, props);
}

export function hasProp(obj, prop) {
  return obj.hasOwnProperty(prop);
}

export function makeColumns(count) {
  const columns = {};
  for (let i = 0; i < count; i++) {
    columns[i] = element("div", { className: COLUMN_CLASSNAME });
  }
  return columns;
}

export function getSource(item) {
  if (hasProp(item, "src")) return item.src;
  return item;
}

export function createMedia(size = SM_SIZE, ruleAt = "max-width") {
  return window.matchMedia(`(${ruleAt}: ${size})`);
}

export function hasPropObj(obj) {
  return (prop) => hasProp(obj, prop);
}

export const querySm = createMedia();
export const queryMd = createMedia(MD_SIZE);
export const queryLg = createMedia(LG_SIZE);
