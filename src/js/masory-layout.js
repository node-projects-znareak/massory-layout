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
  /**
   * Create an instance of a grid
   * @param {Object} settings
   * @param {number} settings.columns - The number of columns
   * @param {HTMLElement} settings.container - The container node in the DOM
   * @param {boolean} settings.center - A boolean to center the container node
   * @param {String} settings.width - The container width
   * @param {String} settings.maxWidth -  The container max-width
   * @param {String} settings.height - The container height
   * @param {boolean} settings.lazyLoad - A boolean to use lazy load in the images
   * @param {String} settings.margin - The grid items margin
   */
  constructor({
    columns = 2,
    container = document.body,
    center = false,
    width = "100%",
    maxWidth = "100%",
    height = "auto",
    lazyLoad = false,
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
  }

  /**
   * Create a container node with the columns in the DOM
   * @param {Array} imagesArray - The array with the defined structure of the images links
   * @param {HTMLElement} _container - The container node in the DOM
   */
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
