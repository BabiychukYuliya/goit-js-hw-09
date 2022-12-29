const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

// Для генерування випадкового кольору використовуй функцію getRandomHexColor
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

btnStart.addEventListener('click', () => {

btnStart.disabled = true; // роби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).


  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});


btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    btnStart.disabled = false;
});