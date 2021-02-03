const api = "https://api.pexels.com/v1";
const key = "563492ad6f917000010000013259d56eb0944472b3d0e5b7b5baaa11";
const btns = document.querySelectorAll(".pagination button");

const loader = document.getElementById("loader");

const container = document.getElementById("container");

const ma = new Massory({
  width: "100%",
  maxWidth: "1200px",
  center: true,
  columns: 6,
  lazyLoad: true,
  margin: "5px",
});

function photos(images) {
  // images is an array string
  ma.show(images, container);
}


document.addEventListener("DOMContentLoaded", () => getListPhotos(0));

for (const btn of btns) {
  btn.addEventListener("click", ({ target }) => {
    getListPhotos(target.value);

    if (target.getAttribute("data-first") == "true") {
      setPagesButtons(target.value, "left");
    }

    if (target.getAttribute("data-last") == "true") {
      setPagesButtons(target.value);
    }
  });
}

function disableButtons(b = true) {
  for (const btn of btns) btn.disabled = b;
}

function getListPhotos(page = 0) {
  container.innerHTML = "";
  loader.style.display = "block";
  disableButtons();
  fetch(`${api}/curated?per_page=80&page=${page}`, {
    headers: {
      Authorization: key,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const images = data.photos;
      const links = images.map((x) => ({
        src: x.src.large,
        lazy: x.src.small,
      }));
      // const links = images.map((x) => x.src.large);
      loader.style.display = "none";
      photos(links);
      disableButtons(false);
    });
}

function setPagesButtons(initPage, dir = "right") {
  let n = Number.parseInt(initPage);
  const d = dir == "right";
  /* si es  la derecha es necesario voltear los botones
   para que la paginacion no ponga alreves
   */
  const _btns = !d ? [...btns].reverse() : btns;

  for (const btn of _btns) {
    /* si la pagina actual es mayor a 1 (evitar restas negativas)
      podemos aumentar y disminuirla paginacion
   */
    if (n > 1) {
      // si es a la izquierda, se aumenta
      if (d) {
        n++;
      } else {
        n--; // de lo contrario se pasa a la anterior pagina
      }

      btn.value = n;
      btn.textContent = n;
    }
  }
}

