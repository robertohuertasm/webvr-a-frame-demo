function qS(selector) {
  return document.querySelector(selector);
}

function qSA(selector) {
  return document.querySelectorAll(selector);
}

function echo(s, c = 'ff0000') {
  console.log(`%c ${s}`, `background: #${c}; color: #fff`);
}
