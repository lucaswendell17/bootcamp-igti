window.addEventListener('load', start);

const clickArray = [];

function start() {
  const buttonClick = document.querySelector('#buttonClick');

  buttonClick.addEventListener('click', handleClick);
}

function handleClick() {
  clickArray.push(getnewTimestamp());

  render();
}

function render() {
  const ul = document.querySelector('#data');
  ul.innerHTML = '';

  let lis = '';

  clickArray.map((item) => {
    lis += `<li>${item}</li>`;
  });

  ul.innerHTML = lis;
  document.title = clickArray.length;
}
