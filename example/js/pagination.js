const btns = document.querySelectorAll(".pagination button");

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

function disableButtons(isDisable = true) {
  for (const btn of btns) btn.disabled = isDisable;
}

function setPagesButtons(initPage, dir = "right") {
  let numberPage = Number.parseInt(initPage);
  const direction = dir == "right";
  /* 
   if it is the right it is necessary to turn the buttons
   so that the pagination does not reverse
   */
  const _btns = !direction ? [...btns].reverse() : btns;

  for (const btn of _btns) {
    /* 
      if the current page is greater than 1 (avoid negative subtractions)
      we can increase and decrease the pagination
    */
    if (numberPage > 1) {
      // if it is to the left, it is increased
      if (direction) {
        numberPage++;
        
      } else {

        // otherwise it goes to the previous page
        numberPage--;
      }

      btn.value = numberPage;
      btn.textContent = numberPage;
    }
  }
}
