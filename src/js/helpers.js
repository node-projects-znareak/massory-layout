import { COLUMN_CLASSNAME } from "./config.js";

export function assigns(e, props) {
  for (const [k, v] of Object.entries(props)) {
    e.setAttribute(k, v);
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
    columns[i] = element("div", { class: COLUMN_CLASSNAME });
  }
  return columns;
}

export function getSource(item) {
  if (hasProp(item, "src")) return item.src;
  return item;
}

export function hasPropObj(obj) {
  return (prop) => hasProp(obj, prop);
}

export function append(father, child) {
  father.appendChild(child);
}

export function successMessage() {
  console.log("%c[Masonry Layout] Nodes added to the DOM ✓", "color: #54e346;");
}
