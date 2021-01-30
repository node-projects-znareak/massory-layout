import lazyLoad from "./lazyLoad.js";
import { CONTAINER_CLASSNAME, ITEM_CLASSNAME } from "./config.js";
import {
  element,
  makeColumns,
  getSource,
  hasPropObj,
  queryMd,
} from "./helpers.js";

window.Massory = class {
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

  #fluidColumns(_container) {
    if (Object.keys(this.breakPoints).length) {
      const inObject = hasPropObj(this.breakPoints);
      const containerGrid = _container.querySelector(".ms");
      const columns = _container.querySelectorAll(".ms > .ms-column");
      window.addEventListener("resize", () => {
        if (queryMd.matches && inObject("md")) {
          containerGrid.style.flexWrap = "wrap";
          for (const column of columns) {
            column.style.flex = "0 1";
            column.style.flexBasis = this.columns =
              100 / this.breakPoints.md.columns + "%";
          }
          // this.columns = 100 / breakPoints.md.columns + "%";
          console.log(columns);
        } else {
          for (const column of columns) {
            column.style.flexBasis = 0;
            column.style.flex = "1 1";
          }
          containerGrid.style.flexWrap = "nowrap";
        }
      });
    }
  }

  show(imagesArray, _container = this.container) {
    if (imagesArray.length > 0) {
      const containerGrid = element("div", { className: CONTAINER_CLASSNAME });
      this.containerGrid = containerGrid;
      const numberImages = imagesArray.length;
      const columnNodesObject = makeColumns(this.columns);
      let indexColumn = 0;

      containerGrid.style.width = this.width;
      containerGrid.style.maxWidth = this.maxWidth;
      containerGrid.style.height = this.height;
      containerGrid.setAttribute("data-columns", this.columns);

      if (this.columns >= 4) {
        containerGrid.classList.add("ms-fluid");
      }

      if (this.center) {
        containerGrid.style.marginLeft = "auto";
        containerGrid.style.marginRight = "auto";
      }

      for (let i = 0; i < numberImages; i++) {
        const gridItemNode = element("div", { className: ITEM_CLASSNAME });
        const imgNode = element("img", {
          src: this.lazyLoad ? imagesArray[i].lazy : getSource(imagesArray[i]),
        });

        if (this.lazyLoad) {
          imgNode.setAttribute("data-loaded", getSource(imagesArray[i]));

          // When the image loads, immediately start using lazy loading
          imgNode.onload = () => lazyLoad(imgNode);
        }

        if (this.margin) {
          gridItemNode.style.margin = this.margin;
        }

        gridItemNode.appendChild(imgNode);

        if (indexColumn == this.columns) {
          indexColumn = 0;
        }

        columnNodesObject[indexColumn].appendChild(gridItemNode);
        indexColumn++;
      }

      for (const columnNode of Object.values(columnNodesObject)) {
        containerGrid.appendChild(columnNode);
      }

      if (_container) {
        _container.appendChild(containerGrid);
      } else {
        this.container.appendChild(containerGrid);
      }

      this.#fluidColumns(_container);
      console.log(
        "%c[Masonry Layout] Nodes added to the DOM ✓",
        "color: #54e346;"
      );
    }
  }
};
