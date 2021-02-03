import { COLUMN_CLASSNAME } from "./config.js";

/**
 * Set atribute to the element
 * @param {HTMLElement} e - Node of DOM
 * @param {object} props - An object with the properties
 * @return {HTMLElement} - The node with the properties
 */
export function assigns(e, props) {
  for (const [k, v] of Object.entries(props)) {
    e.setAttribute(k, v);
  }
  return e;
}

/**
 * Create a new node DOM
 * @param {string} tag - Tag of HTML node
 * @param {object} props -  An object with the properties
 * @return {HTMLElement} - The node with the properties
 */
export function element(tag, props) {
  const e = document.createElement(tag);
  return assigns(e, props);
}

/**
 * Check if it has an attribute
 * @param {object} obj - The object
 * @param {string} prop -  the property to look for
 * @return {boolean} - if prop is in obj
 */
export function hasProp(obj, prop) {
  return obj.hasOwnProperty(prop);
}

/**
 * Create DOM nodes to make the columns
 * @param {number} count - The count columns
 * @return {object} - An object that has DOM nodes accessible by indexes
 */
export function makeColumns(count) {
  const columns = {};
  for (let i = 0; i < count; i++) {
    columns[i] = element("div", { class: COLUMN_CLASSNAME });
  }
  return columns;
}

/**
 * Returns the origin from which the image will be searched
 * @param {object} item - The object to set the source source of the image
 * @return {string|object} - An object or chain depending on the slow loading flag
 */
export function getSource(item) {
  if (hasProp(item, "src")) return item.src;
  return item;
}

/**
 * Add a node in the father
 * @param {HTMLElement} father - The parent node
 * @param {HTMLElement} child - The child node
 */
export function append(father, child) {
  father.appendChild(child);
}

export function successMessage() {
  console.log("%c[Masonry Layout] Nodes added to the DOM ✓", "color: #54e346;");
}
