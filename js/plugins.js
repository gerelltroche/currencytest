// API Access Key
const APIKEY = 'bc1700a6f55ceddca216ff121c8db0df'
const BASEURL = 'http://api.exchangeratesapi.io/v1/'

// const getCurrencyList = (callback) => {
//
//   // Get's list of all the currency's available from the API
//   // input a callback function to run with parameters (err, response)
//
//   // returns
//
//   const xhttp = new XMLHttpRequest();
//   xhttp.open('get', `${BASEURL}symbols?access_key=${APIKEY}`)
//   xhttp.onload = () => {
//     return callback(null, JSON.parse(xhttp.response))
//   }
//   xhttp.onerror = () => {
//     return callback(xhttp.response)
//   }
//   xhttp.send()
// }

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


export { getCurrencyList, getCurrencyPrices }
