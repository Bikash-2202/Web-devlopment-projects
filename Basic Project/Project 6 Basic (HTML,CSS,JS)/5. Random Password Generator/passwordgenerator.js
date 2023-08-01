function password() {
  const chars = "123456789absdfghijklmnopqrstuvwxyz@#$_~*";
  const length = 16;
  let generatedPassword = "";
  for (let i = 0; i < length; i++) {
    let randomnum = Math.floor(Math.random() * chars.length);
    generatedPassword += chars.substring(randomnum, randomnum + 1);
  }
  return generatedPassword;
}

const innerContainerEl = document.querySelector(".innercontainer");

document.getElementById("btn").addEventListener("click",refresh)

    function refresh()
    {
        
  let pass = password();
  innerContainerEl.innerText = pass;

    }