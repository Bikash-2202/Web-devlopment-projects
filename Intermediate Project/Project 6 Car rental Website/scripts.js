
// FAQ Section
let acc = document.getElementsByClassName("accordion");
let i;
let activepanel = null;// Variable to keep track of the active panel
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {

        if (activepanel && activepanel !== this) {
            activepanel.classList.remove("active");
            activepanel.nextElementSibling.style.maxHeight = null;
        }
        this.classList.toggle('active');

        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        }
        else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

        if (this.classList.contains("active")) {
            activepanel = this;
        } else {
            activepanel = null;
        }

    });
}


// Car Image toggle

const table = document.getElementById('table-list')
const vehicle_table = [...table.children];
const vehicleImage = document.querySelector('.vehicle-images')

vehicle_table.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (activepanel && activepanel !== btn) {
            activepanel.classList.remove("active-t");
        }
        btn.classList.toggle("active-t");
        if (btn.classList.contains("active-t")) {
            activepanel = btn;
            const imagePath = `./Cars/Car_${index + 1}.png`;
            vehicleImage.querySelector('img').src = imagePath;
        }
        else {
            activepanel = null;
        }
    })
})

// Swiper Library

let swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 4500,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        200:{
            slidesPerView:1,
            centeredSlides:true,
    loop: true,

        },
        700:{ slidesPerView:2},
    loop: true,

        1200: {
            slidesPerView: 3,
    loop: true,

        },
    }
});

// Menu icon toggle

let menuToggle= document.querySelector(".menu-toggle");
let links = document.querySelector(".links");
menuToggle.addEventListener("click",()=>{
    links.classList.toggle("display");
    menuToggle.classList.toggle("fa-bars");
    menuToggle.classList.toggle("fa-xmark");
})