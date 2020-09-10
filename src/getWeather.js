import axios from "axios";

export const getWeather = (city, api_key) => {
    return  axios.get(`https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${api_key}`)
        .then(response => response.data.list[0])
        .catch(error => console.log('Error', error))
}