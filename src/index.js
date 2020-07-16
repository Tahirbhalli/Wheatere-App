import './style/main.scss';

const man = (data) => {
  console.log(data);
  let a = document.querySelector('#weather');
  a.innerText = data.weather[0].description;
  a = document.querySelector('#temprature');
  a.innerText += data.main.temp_max - 273.15;
  a = document.querySelector('#wind');
  a.innerText += data.wind.speed;
};
const apiError = (err) => {
  alert(err);
  document.querySelector('input').value = null;
};
const btn = document.querySelector('button');
btn.onclick = () => {
  const input = document.querySelector('input');
  let { value } = input;
  value = value.charAt(0).toUpperCase() + value.slice(1);

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=c1fa6e2dfb53e4d98ad5173f6574f95a`)
    .then(respons => respons.json()).then(data => man(data))
    .catch(err => apiError(err));
};