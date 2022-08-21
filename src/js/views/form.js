function inputErrorTemplate(msg) {
  return `
  <div class="invalid-feedback">${msg}</div>
  `;
}

/**
 *
 * @param {HTMLElement} el
 */

export function showinputError(el) {
  if (el.classList.contains('is-invalid')) {
    return;
  }
  const parent = el.parentElement;
  const msg = el.dataset.invalidMessage || 'Invalid input';

  const template = inputErrorTemplate(msg);
  el.classList.add('is-invalid');
  parent.insertAdjacentHTML('beforeend', template);
}
/**
 *
 * @param {HTMLElement} el
 */
export function removeInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback');
  if (!err) return;

  el.classList.remove('is-invalid');
  parent.removeChild(err);
}
