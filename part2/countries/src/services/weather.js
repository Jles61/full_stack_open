import axios from 'axios'
// const api_key = import.meta.env.WEATHER_API_KEY
const api_key = "90715b8f0249bec03d468eefcd051b46"

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

const getWeather = (lat, lon) => {
    console.log(`${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}`)
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

// const getIcon = (icon) => {
//     const request = axios.get(`https://openweathermap.org/img/wn/${icon}@2x.png`)
//     return request.then(response => response.data)
// }

export default { getWeather }

