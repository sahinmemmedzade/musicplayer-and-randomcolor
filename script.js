var btn = document.getElementById("btn");
function generatecolor() {
    var letters = '123456789abcdef';
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    document.getElementById('color-box').style.backgroundColor = color;
    document.getElementById('color-code').textContent = color;
}
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', generatecolor);
