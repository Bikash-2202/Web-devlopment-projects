// const containerEl=document.querySelector(".container");

// for( let index=0;index<30;index++)
// {
//     const colorContainerEl=document.createElement("div");
//     colorContainerEl.classList.add("color-container");
//     colorContainerEl.appendChild(colorContainerEl);
// }

const containerEl = document.querySelector(".container");

for (let index = 0; index < 100; index++) {
  //create a new div
  const colorContainerEl = document.createElement("div");
  colorContainerEl.classList.add("color-container");
  containerEl.appendChild(colorContainerEl);
}

function randomColor() {
  const chars = "0123456789abcdef";
  const colorCodeLength = 6;
  let color = "";
  for (let index = 0; index < colorCodeLength; index++) {
        const randomNum=Math.floor(Math.random()* chars.length);
       
        color +=chars.substring(randomNum,randomNum+1)
        
  }
  return "#" + color

}


const colorContainerEls= document.querySelectorAll(".color-container")

function generateColors()
{
    colorContainerEls.forEach((colorContainerEl)=>
    {
        const newColor = randomColor();
        // const newColor2= randomColor2();
      colorContainerEl.style.backgroundColor = newColor;
      // colorContainerEl.style.backgroundImage = linear-CanvasGradient(right,newColor1,newColor2)
      colorContainerEl.innerText = newColor;
    })
    
}

randomColor();
generateColors()

document.body.style.backgroundColor = randomColor()