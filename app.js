document.querySelector("#submit").addEventListener("click", () => {
  const hexValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let hexCode1 = "";
  let hexCode2 = "";
  let random_index = 0;

  for (let i = 0; i < 6; i++) {
    random_index = Math.floor(Math.random() * hexValues.length);
    hexCode1 += hexValues[random_index];
    random_index = Math.floor(Math.random() * hexValues.length);
    hexCode2 += hexValues[random_index];
  }

  document.body.style.background = `linear-gradient(to right, #${hexCode1}, #${hexCode2})`;
  document.querySelector("#hexcode1").textContent = hexCode1;
  document.querySelector("#hexcode2").textContent = hexCode2;
});
