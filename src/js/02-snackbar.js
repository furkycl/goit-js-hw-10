import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateRadio = document.querySelectorAll('input[name="state"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = parseInt(delayInput.value);
  const state = [...stateRadio].find(radio => radio.checked)?.value;

  if (!state || isNaN(delay)) return;
  //make promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(resolvedDelay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
        position: 'topRight',
      });
    })
    .catch(rejectedDelay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
        position: 'topRight',
      });
    });
});
