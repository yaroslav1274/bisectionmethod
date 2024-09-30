const startXInput = document.getElementById("StartX");
const endXInput = document.getElementById("EndX");
const stepInput = document.getElementById("Step");
const epsInput = document.getElementById("Epsilon");
const checkButton = document.getElementById("check");
const resultsField = document.getElementById("results");

let a, b, c, count, found;

c = 0;

const equation = (x) => Math.pow(x, 2) - 4;

const tabulateAndFindInterval = (step, start, finish) => {
  let x1 = start;
  found = false;

  while (x1 < finish) {
    let x2 = x1 + step;
    if (equation(x1) * equation(x2) < 0) {
      a = x1;
      b = x2;
      found = true;
      break;
    }
    x1 = x2;
  }
}

function run() {
  // Перетворюємо введені дані на числа
  let startX = parseFloat(startXInput.value);
  let endX = parseFloat(endXInput.value);
  let step = parseFloat(stepInput.value);
  let eps = parseFloat(epsInput.value);

  // Запускаємо табуляцію і пошук інтервалу
  tabulateAndFindInterval(step, startX, endX);

  if (!found) {
    resultsField.innerHTML = 'Кореня не знайдено в заданій області.';
    return;
  }

  count = 0;

  // Метод ділення навпіл
  while ((b - a) >= eps) {
    c = (a + b) / 2;
    count += 1;

    if (Math.abs(equation(c)) < eps) break;

    if (equation(a) * equation(c) < 0) {
      b = c;
    } else {
      a = c;
    }
  }

  resultsField.innerHTML = `Iнтервал локалізацiї кореня: [${a.toFixed(1)}, ${b.toFixed(1)}] <br> 
  Наближене значення кореня: ${c.toFixed(10)} <br>
  Кiлькiсть подiлiв iнтервалу навпiл: ${count}`;
}

// Додаємо подію при кліку на кнопку
checkButton.addEventListener('click', run);
