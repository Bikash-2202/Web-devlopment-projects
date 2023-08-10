const selecElement = (selector) => {
    const element = document.querySelector(selector)
    if(element) return element;
    throw new Error(`Something went wrong, Make sure the ${selector} exists or typed correctly.`);
}




const theme=document.querySelector(".theme");
const sidebar =document.getElementById('sidebar');
const featureArticle= document.querySelector('.featured-articles-container')



function myFunction(x)
{
    x.classList.toggle("change");
    showSidebar(sidebar);
    smallerFeature_articles(featureArticle)
}
function showSidebar(sidebar){
    sidebar.classList.toggle("show-sidebar");
   }

   function smallerFeature_articles(featureArticle)
   {
    featureArticle.classList.toggle(".smaller-container")
   }

const bodyElement =document.body;
const themeTogglebtn= document.querySelector('.theme-change-btn')
const currentTheme= localStorage.getItem('currentTheme');
if(currentTheme)
{
    bodyElement.classList.add('dark-theme')
}

themeTogglebtn.addEventListener('click', ()=>
{
    bodyElement.classList.toggle('dark-theme');
    
    if(bodyElement.classList.contains("dark-theme"))
    {
        localStorage.setItem('currentTheme','themeActive');
        
    }
    else
    {
        localStorage.removeItem('currentTheme');
        
    }
});

function changeTheme(y)
{
    y.classList.toggle("fa-sun");
    y.classList.toggle("fa-moon");

    // theme.classList.toggle("dark-theme");
    // theme.classList.toggle("light-theme");
}
const scrollHeader =()=>
{
    const headerElement = selecElement('.nav-bar');
    if(this.scrollY >=5)
{
    headerElement.classList.add('acitvated');
}
else{
    headerElement.classList.remove('activated');
}
}

window.addEventListener('scroll', scrollHeader)


const swiper = new Swiper('.swiper',{
    slidesPerView: 1,
    spaceBetween:20,
    navigation:{
        nextEl:'.swiper-button-next',
        prevEl:'.swiper-button-prev'
    },
    pagination:{
        el:'.swiper-pagination'
    },
    breakpoints:
    {
        700:{
            slidesPerView:2
        },
    1200:{
slidesPerView:3
    }
    }
})
