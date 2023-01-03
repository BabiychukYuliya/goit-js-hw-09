import Notiflix from 'notiflix';

// Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. 
// Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. 
// Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const amount = document.querySelector('[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');
const delay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');

// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. 
// Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

btnCreatePromise.addEventListener('click', evn => {
  evn.preventDefault();
  btnCreatePromise.disabled = true;
  const delayFirst = Number(delay.value);
  const step = Number(delayStep.value);

  for (let index = 0; index < amount.value; index += 1) {
    createPromise(index +1, delayFirst + step * index).then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });;
  }
});
btnCreatePromise.disabled = false;
