import lazyLoad from "./LazyLoadImages.js";

(() => {
  const privateProps = new WeakMap();
  class Massory {
    constructor({
      columns = 2,
      container = document.body,
      center = false,
      width = "100%",
      maxWidth = "100%",
      height = "auto",
      lazyLoad = false,
    } = {}) {
      this.columns = columns;
      this.container = container;
      this.center = center;
      this.width = width;
      this.height = height;
      this.maxWidth = maxWidth;
      this.lazyLoad = lazyLoad;

      privateProps.set(this, {
        assigns(e, props = {}) {
          for (const [k, v] of Object.entries(props)) {
            e[k] = v;
          }
          return e;
        },

        // arrow function to preserve the context of 'this'
        element: (tag, props) => {
          const e = document.createElement(tag);
          return privateProps.get(this).assigns(e, props);
        },

        makeColumns: (count) => {
          let i = 0;
          const columns = {};
          while (i < count) {
            columns["c" + i] = privateProps
              .get(this)
              .element("div", { className: "ms-column" });
            i++;
          }
          return columns;
        },

        getSource: (item) => {
          if (item.hasOwnProperty("src")) return item.src;
          return item;
        },
      });
    }

    show(imagesArray, _container = this.container) {
      if (imagesArray.length > 0) {
        const { element, makeColumns, getSource } = privateProps.get(this);
        const containerGrid = element("div", { className: "ms" });
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
          containerGrid.style.margin = "auto";
        }

        for (let i = 0; i < numberImages; i++) {
          const gridItemNode = element("div", { className: "ms-item" });
          const imgNode = element("img", {
            src: this.lazyLoad
              ? imagesArray[i].lazy
              : getSource(imagesArray[i]),
          });

          if (this.lazyLoad) {
            imgNode.setAttribute("data-loaded", getSource(imagesArray[i]));

            // When the image loads, immediately start using lazy loading
            imgNode.onload = () => lazyLoad(imgNode);
          }

          gridItemNode.appendChild(imgNode);

          if (indexColumn == this.columns) {
            indexColumn = 0;
          }

          columnNodesObject["c" + indexColumn].appendChild(gridItemNode);
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

        console.log(
          "%c[Masonry Layout] Nodos agregados al DOM ✓",
          "color: #54e346;"
        );
      }
    }
  }

  window.Massory = Massory;
})();
