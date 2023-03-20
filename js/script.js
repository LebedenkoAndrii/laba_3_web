let btn = document.getElementById("btn");

function splitString() {
  let text = document.getElementById("inp").value;
  let result = document.getElementById("resultText");

  let length = text.length;
  let firstHalf = text.slice(0, Math.floor(length / 2));
  let secondHalf = text.slice(Math.floor(length / 2));

  result.textContent = firstHalf + " " + secondHalf;
}
