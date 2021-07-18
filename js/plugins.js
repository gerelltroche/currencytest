// API Access Key
const APIKEY = 'bc1700a6f55ceddca216ff121c8db0df'
const BASEURL = 'http://api.exchangeratesapi.io/v1/'

const getCurrencyList = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', `${BASEURL}symbols?access_key=${APIKEY}`)
    xhr.onload = resolve
    xhr.onerror = reject;
    xhr.send()
  })
}

const getCurrencyPrices = (base) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', `${BASEURL}latest?access_key=${APIKEY}&base=${base}`)
    xhr.onload = resolve
    xhr.onerror = reject;
    xhr.send()
  })
}

const getHistoricalPrices = (date, base) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', `${BASEURL}${date}?access_key=${APIKEY}&base=${base}`)
    xhr.onload = resolve
    xhr.onerror = reject;
    xhr.send()
  })
}

const parseYesterday = (dateAsString) => {

  // Takes Date in MM-DD-YYYY format and returns
  // the day before in YYYY-MM-DD format
  const inputDate = new Date(dateAsString)
  const yesterday = new Date(inputDate.getTime() - 24*60*60*1000)

  return yesterday.toISOString().substring(0,10)

}

const parseToday = (dateAsString) => {

  // Takes Date in MM-DD-YYYY format and returns
  // the day before in YYYY-MM-DD format
  const inputDate = new Date(dateAsString)
  const today = new Date(inputDate.getTime())

  return today.toISOString().substring(0,10)

}

const getPast30Days = (todaysDate, base, target) => {

  let today = parseToday(todaysDate)
  const promiseArray = []
  const resultArray = []
  const dates = []

    for (let i = 0; i < 30; i++) {
      promiseArray.push(getHistoricalPrices(today, base))
      dates.push(today)
      today = parseYesterday(today)
    }
    return Promise.all(promiseArray).then(
      (promise) => {
        for (let i in promise) {
          let result = JSON.parse(promise[i].target.response)
          resultArray.push({
            x: new Date(dates[i]),
            y: result.rates[target]
          })
        }
        return resultArray
      },
      (e) => console.log('handle error') // need to handle this error
    )
}


export { getCurrencyList, getCurrencyPrices, getHistoricalPrices, parseYesterday, parseToday, getPast30Days }
