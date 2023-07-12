if ("/" === window.location.pathname) {
    container = document.querySelector("div.md-container");
    main = document.querySelector("main.md-main");
    background_elem = document.createElement("div");
    background_elem.classList.add("back");
    container.insertBefore(background_elem, main);
}