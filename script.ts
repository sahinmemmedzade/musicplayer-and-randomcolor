const btn=document.getElementById("btn")
function generatecolor(){
let letters:string='123456789abcdef'
let color:string="#"
for(let i=0;i<6;i++){
    color+=letters[Math.floor(Math.random()*16)]


}
document.getElementById('color-box')!.style.backgroundColor = color;
  document.getElementById('color-code')!.textContent = color;
}
btn?.addEventListener('click',generatecolor
)