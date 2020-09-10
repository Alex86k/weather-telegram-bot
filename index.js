import { Telegraf }  from 'telegraf'
import  { getWeather }  from './src/getWeather'
require('dotenv').config()

const bot = new Telegraf(process.env.TELEGRAM_KEY)

bot.start(ctx => ctx.reply(
    `Привет <b>${ctx.from.first_name}</b>! \r\nВведите название города на английском языке.`,
    {parse_mode: "HTML"})
)

bot.on('text', async (ctx) => {
    try {
        const userText = ctx.message.text
        const weatherData = await getWeather(userText, process.env.OPENWEATHERMAP_KEY.toString())
        const formatData = `Погода в городе <b>${weatherData.name}</b>:
                            Температура: <b>${weatherData.main.temp} °С</b>
                            Давление: <b>${weatherData.main.pressure} гПа</b>
                            Влажность: <b>${weatherData.main.humidity} %</b>
                            Ветер: <b>${weatherData.wind.speed} м/с</b>
                            Облачность: <b>${weatherData.clouds.all} %</b>`

        ctx.reply(formatData, {parse_mode: "HTML"})
            .catch(console.error)
    } catch (e) {
        ctx.reply('Такого города не существует. Введите корректное название города на английском языке.')
            .catch(console.error)
    }
})

bot.launch()
    .catch(console.error)


