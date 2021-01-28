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

export function makeColumns(count) {
  const columns = {};
  for (let i = 0; i < count; i++) {
    columns[i] = element("div", { className: "ms-column" });
  }
  return columns;
}

export function getSource(item) {
  if (item.hasOwnProperty("src")) return item.src;
  return item;
}
