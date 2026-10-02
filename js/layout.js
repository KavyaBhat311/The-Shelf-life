// Basic interaction only: the shelf choices can be selected.
// The page structure is intentionally kept simple so the layout can be
// connected to the library-builder functionality later.

const shelfOptions = document.querySelectorAll(".shelf-option");

shelfOptions.forEach((shelf) => {
  shelf.addEventListener("click", () => {
    shelfOptions.forEach((item) => item.classList.remove("selected"));
    shelf.classList.add("selected");
  });
});
