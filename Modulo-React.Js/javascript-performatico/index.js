window.addEventListener('load', start);

const clickArray = [];

function start() {
  const buttonClick = document.querySelector('#buttonClick');

  buttonClick.addEventListener('click', handleClick);
}

function handleClick() {
  const item = getnewTimestamp();
  clickArray.push(item);

  render(item);
}

function render(item) {
  const ul = document.querySelector('#data');

  const li = document.createElement('li');
  li.textContent = item;

  ul.appendChild(li);

  document.title = clickArray.length;
}
