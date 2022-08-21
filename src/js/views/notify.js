function getNotifyContainer() {
  return document.querySelector('.notify-container');;
}

function alertTemplate(msg, className, index) {
  return `
    <span class="alert ${className}" data-index="${index}" >${msg}</span>
  `;
}
function getAlertIndex() {
  return document.querySelectorAll('.notify-container .alert').length
}

function notifyContainerTemplate() {
  return `
  <div class="notify-container" class="" style="display: flex; flex-direction: column;position: fixed; top: 1em; right: 1em; z-index: 99"></div>
  `;
}

function createNotifyContainer() {
  const template = notifyContainerTemplate();
  document.body.insertAdjacentHTML('afterbegin', template)
}

/**
 *  Function notify. Show notify message
 * @param {Object} settings
 * @param {String} settings.msg
 * @param {String} settings.className
 * @param {Number} settings.timeout 1000 = 1s
 */

export function notify({ msg = 'info message', className = 'alert-info', timeout = 2000 } = {}) {
  if (!getNotifyContainer()) {
    createNotifyContainer()
  }
  let index = getAlertIndex()
  const container = getNotifyContainer();
  const template = alertTemplate(msg, className, index);

  container.insertAdjacentHTML('beforeend', template)

  setTimeout(() => removeNotify(index), timeout)

}

export function removeNotify(index) {
  let alert;

  if (index === undefined) {
    alert = document.querySelector('.notify-container .alert');
  } else {
    alert = document.querySelector(`.notify-container .alert[data-index="${index}"]`);
  }

  if (!alert) {
    console.warn('Alert not found');
    return;
  }
  const container = getNotifyContainer();
  container.removeChild(alert);
}
