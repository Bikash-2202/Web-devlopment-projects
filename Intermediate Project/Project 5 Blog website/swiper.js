const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector('.carousel');

let isDragging = false, startX, startScrollLeft;

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if (!isDragging) return;
    
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove('dragging');
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

// Now make buttons functionable
const arrowBtn=document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector('.cards').offsetWidth;
arrowBtn.forEach(btn => {
    btn.addEventListener("click", ()=>{
        carousel.scrollLeft += btn.id ==="left" ? -firstCardWidth : firstCardWidth;
    })

});


// Now make the scroll infinite
//First insert the copies of the last cards and place it at the begin

const carouselChildren = [...carousel.children];
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildren.slice(-cardPerView).reverse().forEach( card => {
 carousel.insertAdjacentHTML("afterbegin",card.outerHTML);
});

carouselChildren.slice(0, cardPerView).forEach(card =>{
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})

const infiniteScroll = ()=>{
    carousel.classList.add("no-transition");
    if(carousel.scrollLeft === 0)
    {
    carousel.scrollLeft = carousel.scrollWidth - (2* carousel.offsetWidth);
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth -carousel.offsetWidth){
        carousel.scrollLeft = carousel.offsetWidth;
    }
    carousel.classList.remove("no-transition");
 clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoplay();
}

carousel.addEventListener("scroll", infiniteScroll);

//Now let make the quick read section autoplay
let timeoutId;
const autoplay = ()=>{
    if(window.innerWidth< 800) return;
    timeoutId = setTimeout (()=>{
        carousel.scrollLeft += firstCardWidth;
    },2500)
}
autoplay();

wrapper.addEventListener("mouseenter", ()=> clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoplay);