fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=orchids')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        const photographerName = document.createElement('a');
        photographerName.setAttribute('href', `${data.user.links.html}`);
        photographerName.textContent = `${data.user.name}`;
        document.querySelector('.photographer').append(photographerName);
    })
    .catch(err => {
        document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1609631546661-9975bf3476d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODYzNDg5NzN8&ixlib=rb-4.0.3&q=85')`
        const photographerName = document.createElement('a');
        photographerName.setAttribute('href', 'https://unsplash.com/@earl_plannerzone');
        photographerName.textContent = 'Earl Wilcox';
        document.querySelector('.photographer').append(photographerName);
    })

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(res => {
        if (!res.ok) {
            throw Error('Something went wrong!')
        }
        return res.json();
    })
    .then(data => {
        document.querySelector('.crypto-name').innerHTML = `
            <img src="${data.image.small}" />
            <p>${data.name}</p>
        `
        document.querySelector('.crypto-values').innerHTML = `
            <p><span>➡️</span> : $${data.market_data.current_price.usd}</p>
            <p><span>⬆️</span> : $${data.market_data.high_24h.usd} </p>
            <p><span>⬇️</span> : $${data.market_data.low_24h.usd} </p>
        `
    })
    .catch(err => console.log(err));

function displayTime() {
    const date = new Date();
    document.querySelector('.time').textContent = `${date.toLocaleTimeString('en-US', {timeStyle: 'short'})}`
}

setInterval(displayTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error('Weather data not available');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            const weatherIcon = document.createElement('img');
            weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            const temperature = document.createElement('p');
            temperature.innerHTML = `${data.main.temp}&deg;`;
            const city = document.createElement('p');
            city.textContent = `${data.name}`;
            document.querySelector('.img-container').append(weatherIcon);
            document.querySelector('.weather-top').append(temperature);
            document.querySelector('.weather-bottom').append(city);
        })
        .catch(err => console.log(err));
    })