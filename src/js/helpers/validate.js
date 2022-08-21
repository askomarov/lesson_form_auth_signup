const regExpDic = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: /^[0-9a-zA-Z]{4,}$/,
  firstname: /^[a-zA-Z]{4,}$/,
  phone: /[0-9]{3}-[0-9]{3}-[0-9]/,
};

/**
 * Function validate.
 * @param {HTMLInputElement} el
 * @returns {Boolean} - Return true if input valid
 */

export function validate(el) {
  const regExpName = el.dataset.required;
  if (!regExpDic[regExpName]) return true;
  return regExpDic[regExpName].test(el.value);
}
