const num1 = Math.ceil(Math.random()*100);
const num2 =Math.ceil(Math.random()*100);
const scoreEl= document.getElementById("score")
let score= JSON.parse(localStorage.getItem("score"));
if( !score)
{
    score=0;
}
scoreEl.innerHTML= `score: ${score}`
const inputEl= document.getElementById("input")
const formEl= document.getElementById("form")
const questionEl = document.getElementById("question");
questionEl.innerText= `What is ${num1} multiply by ${num2}?`
const correctAns= num1* num2;
formEl.addEventListener("submit",()=>
{
    const userAns= +inputEl.value;
    // console.log(userAns,typeof userAns)
    if(userAns==correctAns)
    {
        score++;
     updateLocalStorage();
    }
    else
    {
        score--;
    updateLocalStorage();
    }
})
function updateLocalStorage()
{
    localStorage.setItem("score",JSON.stringify(score))
}

