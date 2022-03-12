import axios from 'axios'

export const fetchWheather = async () => {
    const city = await axios.get('https://extreme-ip-lookup.com/json/')
    .then(res => {
        let city
        if (res.data.city === '') {
            return city = 'Warsaw'
        } else {
            return res.data.city
        }
    })
    .catch(err => console.log(err))

    const wheartherData = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: 'd355aaa337c3ed0e0876c199a8060479'
        }
    }).then(res =>res.data).catch(err => console.log(err))

    return wheartherData
}