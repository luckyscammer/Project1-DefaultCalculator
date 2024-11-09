window.addEventListener("load", () => {
    const loader = document.querySelector(".loading-box-body");
    const wrapper = document.querySelector(".wrapper");

    setTimeout(() => {
        loader.style.display = "none";
        wrapper.style.display = "block";
    }, 500);
});
