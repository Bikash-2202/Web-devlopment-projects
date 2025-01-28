
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


// Car Image toggle And Chart 
const carObject ={
    arrPrice:[45,40,50,40,60,80,50],
    Model: ["Mercedes","BMW","Tesla","VW Golf","VW Passat","Ford Mustang","Verna"],
    Mark:["A1",'S1',"M1","G35","V12","GT","N1"],
    Year:["2020","2018","2022","2023","2020","2025","2024"],
    Door:["4/5","4","2","4/5","2","2","4"],
    Transmission:["Manual","Automatic","Automatic","Manual","Auto/Manual","Auto/Manual","Manual"],
    Fuel:["Petrol","Diesel","Electric","Petrol","Petrol","Petrol","Diesel"]
}
function carRent(index){
    const priceTag =document.getElementById('price');
    priceTag.textContent=` $ ${carObject.arrPrice[index]}  /  Day`;
    const models =document.getElementById('model');
    models.textContent=`  ${carObject.Model[index]} `;
     const marks =document.getElementById('mark');
    marks.textContent=` ${carObject.Mark[index]}`; 
    const years =document.getElementById('year');
    years.textContent=` ${carObject.Year[index]} `;
    const doors =document.getElementById('door');
    doors.textContent=` ${carObject.Door[index]} `;
    const trans =document.getElementById('transmission');
    trans.textContent=` ${carObject.Transmission[index]} `;
    const fuel =document.getElementById('fuel');
    fuel.textContent=` ${carObject.Fuel[index]} `;

}

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
            carRent(index);
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

        }
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
