import './style/main.scss';

const main = (data) => {
  console.log(data);
  const table = document.querySelector('table');
  table.style.height = '100px';
  if (data.weather[0].main === 'drizle' || data.weather[0].main === 'rainy') {
    table.style.backgroundImage = 'url(https://media0.giphy.com/media/xUOwGoNa2uX6M170d2/giphy.gif)';
  } else if (data.weather[0].main === 'hot') {
    table.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIffUkHMZ8UXvqNEUHPh71_CCrexatqjSqRA&usqp=CAU)';
  } else if (data.weather[0].main === 'cloudy') {
    table.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUY8U9JWMV3yqU4k2XanlHo_XcBN7HGIPSuA&usqp=CAU)';
  } else {
    document.body.style.backgroundImage = 'url(https://mir-s3-cdn-cf.behance.net/project_modules/disp/921a2527118125.5636097aa6505.gif)';
  }
  let a = document.querySelector('#weather');
  a.innerText = data.weather[0].description;
  a = document.querySelector('#temprature');
  a.innerText += data.main.temp - 273.15;
  a = document.querySelector('#wind');
  a.innerText += data.wind.speed;
  const btn = document.createElement('button');
  btn.classList = 'btn btn-primary mx-auto';
  btn.id = 'converter';
  btn.innerText = 'Fahrenheit';
  btn.onclick = () => {
    if (btn.innerText === 'Fahrenheit') {
      a = document.querySelector('#temprature');
      a.innerText = ((data.main.temp - 273.15) * 9) / 5 + 32;
      btn.innerText = 'Celsious';
    } else {
      btn.innerText = 'Fahrenheit';
      a = document.querySelector('#temprature');
      a.innerText = data.main.temp - 273.15;
    }
  };
  document.body.appendChild(btn);
};
const apiError = (err) => {
  alert(err);
  document.querySelector('input').value = null;
};
const btn = document.querySelector('button');
btn.onclick = () => {
  const temp = document.querySelector('#converter');
  if (temp !== null) {
    temp.parentNode.removeChild(temp);
  }
  const input = document.querySelector('input');
  let { value } = input;
  value = value.charAt(0).toUpperCase() + value.slice(1);

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=c1fa6e2dfb53e4d98ad5173f6574f95a`)
    .then(respons => respons.json()).then(data => main(data))
    .catch(err => apiError(err));
};
