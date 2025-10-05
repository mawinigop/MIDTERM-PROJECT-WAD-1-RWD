document.querySelectorAll(".card-wrapper").forEach(wrapper => {
    if (wrapper.classList.contains("medical-form")) return;

    const list = wrapper.querySelector(".swiper-wrapper");
    const items = wrapper.querySelectorAll(".card-item");
    const pagination = wrapper.querySelector(".swiper-pagination");

    function getSlidesPerView() {
        if (window.innerWidth >= 1025) return 3;
        if (window.innerWidth >= 601) return 2;
        return 1;
    }

    let slidesPerView = getSlidesPerView();

    function createBullets() {
        pagination.innerHTML = "";
        const total = Math.ceil(items.length / slidesPerView);
        for (let i = 0; i < total; i++) {
            const bullet = document.createElement("span");
            bullet.classList.add("bullet");
            if (i === 0) bullet.classList.add("active");
            bullet.addEventListener("click", () => {
                index = i;
                updateSlide(true); 
            });
            pagination.appendChild(bullet);
        }
    }

    let index = 0;

    function updateSlide(smooth = true) {
        const slideWidth = list.clientWidth / slidesPerView;
        if (smooth) list.style.transition = "transform 0.4s ease";
        else list.style.transition = "none";

        list.style.transform = `translateX(-${index * slideWidth}px)`;

        const bullets = pagination.querySelectorAll(".bullet");
        bullets.forEach((b, i) => b.classList.toggle("active", i === index));
    }
    createBullets();
    updateSlide(false);

    window.addEventListener("resize", () => {
        slidesPerView = getSlidesPerView();
        createBullets();
        updateSlide(false);
    });
});
