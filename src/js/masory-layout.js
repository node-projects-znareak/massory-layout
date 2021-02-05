import lazyLoad from "./lazyLoad.js";
import { CONTAINER_CLASSNAME, ITEM_CLASSNAME } from "./config.js";

import {
  element,
  makeColumns,
  getSource,
  append,
  successMessage,
} from "./helpers.js";

export default class Massory {
  constructor({
    columns = 2,
    container = document.body,
    center = false,
    width = "100%",
    maxWidth = "100%",
    height = "auto",
    lazyLoad = false,
    breakPoints = {},
    margin,
  } = {}) {
    this.columns = columns;
    this.container = container;
    this.center = center;
    this.width = width;
    this.height = height;
    this.maxWidth = maxWidth;
    this.lazyLoad = lazyLoad;
    this.margin = margin;
    this.breakPoints = breakPoints;
  }

  show(imagesArray, _container) {
    if (imagesArray.length > 0) {
      const containerGrid = element("div", { class: CONTAINER_CLASSNAME });
      this.containerGrid = containerGrid;
      const numberImages = imagesArray.length;
      const columnNodesObject = makeColumns(this.columns);
      let indexColumn = 0;

      containerGrid.style.width = this.width;
      containerGrid.style.maxWidth = this.maxWidth;
      containerGrid.style.height = this.height;

      if (this.columns >= 4) {
        containerGrid.classList.add("ms-fluid");
      }

      if (this.center) {
        containerGrid.style.marginLeft = "auto";
        containerGrid.style.marginRight = "auto";
      }

      for (let i = 0; i < numberImages; i++) {
        const gridItemNode = element("div", { class: ITEM_CLASSNAME });
        const imgNode = element("img", {
          src: this.lazyLoad ? imagesArray[i].lazy : getSource(imagesArray[i]),
        });

        if (this.lazyLoad) {
          imgNode.setAttribute("data-src", getSource(imagesArray[i]));

          // When the image loads, immediately start using lazy loading
          imgNode.onload = () => lazyLoad(imgNode);
        }

        if (this.margin) {
          gridItemNode.style.margin = this.margin;
        }

        append(gridItemNode, imgNode);
        if (indexColumn == this.columns) {
          indexColumn = 0;
        }

        append(columnNodesObject[indexColumn], gridItemNode);
        indexColumn++;
      }

      for (const columnNode of Object.values(columnNodesObject)) {
        append(containerGrid, columnNode);
      }

      append(_container || this.container, containerGrid);

      successMessage();
    }
  }
}
