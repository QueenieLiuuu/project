import './style.css';

const root = document.getElementById('app');

const toggleDOB = (event) => {
  let target = event.target;
  while (!target.children.length) target = target.parentElement;
  target.children[0].classList.toggle('hidden');
  target.children[1].classList.toggle('hidden');
};

const renderCard = (card) => root.appendChild(card);

const fetchData = async () => {
  const response = await fetch('https://randomuser.me/api/?results=20');
  const { results: users } = await response.json();
  users.forEach((user) => renderCard(createCard(user)));
};

const createCard = (user) => {
  const cardContainer = document.createElement('div');
  const image = document.createElement('img');
  const contentWrapper = document.createElement('div');
  const name = document.createElement('p');
  const email = document.createElement('p');
  const phone = document.createElement('p');
  const dobWrapper = document.createElement('div');
  const dobButton = document.createElement('button');
  const dobDisplay = document.createElement('p');

  cardContainer.classList.add('card');
  contentWrapper.classList.add('content');
  image.src = user.picture.thumbnail;
  name.textContent = `name: ${user.name.title} ${user.name.first}`;
  email.textContent = `email: ${user.email}`;
  phone.textContent = `phone: ${user.phone}`;
  dobButton.textContent = 'Show DOB';
  dobDisplay.textContent = user.dob.date;
  dobDisplay.classList.add('hidden');
  dobWrapper.onclick = toggleDOB;
  dobWrapper.append(dobButton, dobDisplay);
  contentWrapper.append(name, email, phone, dobWrapper);
  cardContainer.append(image, contentWrapper);

  return cardContainer;
};

const render = async () => {
  root.innerHTML = '';
  await fetchData();
  const reload = document.createElement('button');
  reload.textContent = 'Reload';
  reload.classList.add('reloadButton');
  reload.onclick = render;
  root.lastElementChild.append(reload);
};

render();