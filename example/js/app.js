const api = "https://api.pexels.com/v1";
const key = "563492ad6f917000010000013259d56eb0944472b3d0e5b7b5baaa11";
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

document.addEventListener("DOMContentLoaded", () => getListPhotos(0));

function photos(images) {
  ma.show(images, container);
}

async function getListPhotos(page = 0) {
  container.innerHTML = "";
  loader.style.display = "block";
  disableButtons();
  const res = await fetch(`${api}/curated?per_page=80&page=${page}`, {
    headers: {
      Authorization: key,
    },
  });
  const data = await res.json();
  const images = data.photos;
  const links = images.map((x) => ({
    src: x.src.large,
    lazy: x.src.small,
  }));
  loader.style.display = "none";
  photos(links);
  disableButtons(false);
}
