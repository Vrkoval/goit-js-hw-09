import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = { 
  form: document.querySelector(".form")
}
console.dir(refs.form);
refs.form.addEventListener('submit', e => {
  e.preventDefault()
  const { delay, step, amount } = e.currentTarget;
  const delayNum = Number(delay.value)
  let stepNum = delayNum
  const amountNum = Number(amount.value)
  for (let i = 1; i <= amountNum; i += 1) {

      createPromise(i, stepNum)
          .then(({ position, delay }) => {
              Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
              Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
          stepNum += Number(step.value)
  }
})
// ---------------------------------------------------------------------------------------------------------
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (shouldResolve) {
            resolve({ position, delay })
        }
        reject({ position, delay });
    }, delay)
})
}
