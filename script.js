var input = el(".input");
var button = el(".button");
var form = el(".form");
var result = el(".result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var inputValue = input.value;

  if (!inputValue) {
    return;
  }

  var numbers = parseBirth(inputValue);

  display(
    ".js-birth",
    new Date(inputValue).toLocaleString("ru", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );
  display(".js-tipology", numbers.tipology);
  display(".js-character", getCellContent(1, numbers.count["1"], 1));
  display(".js-energy", getCellContent(2, numbers.count["2"], 1));
  display(".js-interes", getCellContent(3, numbers.count["3"], 1));
  display(".js-health", getCellContent(4, numbers.count["4"], 1));
  display(".js-logic", getCellContent(5, numbers.count["5"], 1));
  display(".js-labor", getCellContent(6, numbers.count["6"], 1));
  display(".js-lucky", getCellContent(7, numbers.count["7"], 1));
  display(".js-duty", getCellContent(8, numbers.count["8"], 1));
  display(".js-memory", getCellContent(9, numbers.count["9"], 1));
  display(
    ".js-goal",
    countDigits(
      getCellContent(1, String(numbers.count["1"])) +
        getCellContent(4, String(numbers.count["4"])) +
        getCellContent(7, String(numbers.count["7"]))
    )
  );
  display(
    ".js-family",
    countDigits(
      getCellContent(2, String(numbers.count["2"])) +
        getCellContent(5, String(numbers.count["5"])) +
        getCellContent(8, String(numbers.count["8"]))
    )
  );
  display(
    ".js-habit",
    countDigits(
      getCellContent(3, String(numbers.count["3"])) +
        getCellContent(6, String(numbers.count["6"])) +
        getCellContent(9, String(numbers.count["9"]))
    )
  );
  display(
    ".js-life",
    countDigits(
      getCellContent(4, String(numbers.count["4"])) +
        getCellContent(5, String(numbers.count["5"])) +
        getCellContent(6, String(numbers.count["6"]))
    )
  );
  display(
    ".js-temperament",
    countDigits(
      getCellContent(3, String(numbers.count["3"])) +
        getCellContent(5, String(numbers.count["5"])) +
        getCellContent(7, String(numbers.count["7"]))
    )
  );

  result.classList.add("visible");
});

function el(className) {
  return document.querySelector(className);
}

function display(selector, value) {
  try {
    el(selector).textContent = value;
  } catch (e) {
    console.error("error", e);
  }
}

function getCellContent(num, count, withDash) {
  if (count === 0 && withDash) {
    return "—";
  }

  var result = "";

  for (var i = 0; i < count; i++) {
    result += String(num);
  }

  return result;
}

function parseBirth(inputValue) {
  var sumOfBirth = inputValue
    .split("-")
    .reduce((sum, part) => sum + getSum(part), 0);
  var tipology = getSum(sumOfBirth);
  if (tipology === 12) {
    tipology = 3;
  }
  var number3 =
    sumOfBirth -
    2 * Number(String(parseInt(inputValue.split("-")[2], 10)).slice(0, 1));
  var number4 = getSum(number3);

  return {
    sum: sumOfBirth,
    tipology: tipology,
    number3: number3,
    number4: number4,
    count: countNumbers(
      String(number3) +
        String(number4) +
        String(sumOfBirth) +
        String(tipology) +
        inputValue.split("-").join("")
    ),
  };
}

function getSum(stringOfNumbers) {
  return String(stringOfNumbers)
    .split("")
    .reduce((s, n) => s + Number(n), 0);
}

function count(arrayOfNumbers, number) {
  return arrayOfNumbers.reduce(
    (count, num) => (Number(num) === number ? count + 1 : count),
    0
  );
}

function countNumbers(numbers) {
  var arrayNumbers = String(numbers).split("");

  return {
    1: count(arrayNumbers, 1),
    2: count(arrayNumbers, 2),
    3: count(arrayNumbers, 3),
    4: count(arrayNumbers, 4),
    5: count(arrayNumbers, 5),
    6: count(arrayNumbers, 6),
    7: count(arrayNumbers, 7),
    8: count(arrayNumbers, 8),
    9: count(arrayNumbers, 9),
  };
}

function countDigits(stringOfNumber) {
  return stringOfNumber.split("").filter((n) => Number(n) !== 0).length;
}
