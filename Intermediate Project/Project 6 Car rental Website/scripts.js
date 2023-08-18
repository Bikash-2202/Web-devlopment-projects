let acc=document.getElementsByClassName("accordion");
let i;
let activepanel = null;// Variable to keep track of the active panel
for(i=0;i<acc.length;i++)
{
    acc[i].addEventListener("click", function(){

        if(activepanel && activepanel!==this)
{
    activepanel.classList.remove("active");
    activepanel.nextElementSibling.style.maxHeight=null;
}


        this.classList.toggle('active');
      
        let panel=this.nextElementSibling;
    if(panel.style.maxHeight){
        panel.style.maxHeight = null;
    }
    else{
        panel.style.maxHeight = panel.scrollHeight + "px";
    }

    if(this.classList.contains("active")){
        activepanel =this;
    }else{
        activepanel =null;
    }

    });
}