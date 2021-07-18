import tableItem from "./tableItem"
import {
  chartFillHandler,
  chartItem } from './chartItem'
import {
  getCurrencyList,
  getCurrencyPrices,
  getHistoricalPrices,
  parseYesterday,
  parseToday,
  getPast30Days } from "./plugins"


let itemslist = []
let pricesdict = {}
let historicaldict = {}

const setErrorMessageHandler = (message) => document.getElementById('message').innerText = message

const createCurrencyItems = (currencyResponse) => {

  // Populate all the options in selected-currency
  const currencyArray = Object.keys(currencyResponse)
  const container = document.getElementById('selected-currency')

  for (const currency of currencyArray) {

    // create each option

    const selection = document.createElement('option')
    selection.innerText = currency
    selection.id = currency

    container.appendChild(selection)

  }
}

const injectOnCurrencyChangeHandler = () => {

  const options = document.getElementById('selected-currency')
  options.addEventListener('change', (e) => {
    onCurrencyChangeHandler(e.target.value)
  })
}

const injectOnDateChangeHandler = () => {

  const dateInput = document.getElementById('date')
  dateInput.addEventListener('change', (e) => {
    onDateChangeHandler(e.target.value)
  })

}

const tableUpdateHandler = (selection, currencylist) => {

  const table = document.getElementById('table')
  const today = document.getElementById('date').value


  table.innerHTML = `
    <div id="firstrow" class="row">
        <div>Currency</div>
        <div>History (Yesterday)</div>
        <div>Exchange Rate</div>
    </div>
  `

  const list = currencylist.filter((el) => {
    return selection !== el
  })

  for (const currency of list) {

    const row = tableItem(currency, historicaldict[currency].toFixed(2), pricesdict[currency].toFixed(2))
    const chart = chartItem(`chart-${currency}`)

    row.addEventListener('click', (e) => {
      console.log('clicked')
      getPast30Days(today, selection, currency).then(
        (data) => {
          chartFillHandler(`chart-${currency}`, `30 days of ${currency}`, data)
      })
    })

    table.appendChild(row)
    table.appendChild(chart)

  }
}

const onCurrencyChangeHandler = (currencySelection) => {

  const dateSelection = document.getElementById('date').value
  let errorState = false

  getCurrencyPrices(currencySelection)
    .then(
      (e) => {
        if (e.target.response) {
          pricesdict = JSON.parse(e.target.response).rates
        } else {
          setErrorMessageHandler(`Error: ${currencySelection} could not be loaded. Please refresh the page`)
          errorState = true
        }
      },
      (e) => {
        setErrorMessageHandler(`Error: ${currencySelection} could not be loaded. Please refresh the page.`)
        errorState = true
      }
    )

  getHistoricalPrices(parseYesterday(dateSelection), currencySelection)
    .then(
      (e) => {
        if (e.target.response) {
          historicaldict = JSON.parse(e.target.response).rates
        } else {
          setErrorMessageHandler(`Error: Historical prices could not be retrieved. Please refresh the page.`)
          errorState = true
        }
      },
      (e) => {
        setErrorMessageHandler(`Error: Historical prices could not be retrieved. Please refresh the page.`)
        errorState = true
      }
    )

  if (!errorState) {
    tableUpdateHandler(currencySelection, itemslist)
  }
  errorState = false
}

const onDateChangeHandler = (dateSelection) => {

  const currencySelection = document.getElementById('selected-currency')
  let errorState = false

  // Default value is EUR
  if (!currencySelection.value) {
    for (let i = 0; i < currencySelection.options.length; i++) {
      if (currencySelection.options[i].text === 'EUR') {
        currencySelection.options[i].selected = true
      }}}

  getHistoricalPrices(parseToday(dateSelection), currencySelection.value)
    .then(
      (e) => {
        if (e.target.response) {
          pricesdict = JSON.parse(e.target.response).rates
        } else {
          setErrorMessageHandler(`Error: ${currencySelection} could not be loaded. Please refresh the page`)
          errorState = true
        }
      },
      (e) => {
        setErrorMessageHandler(`Error: ${currencySelection} could not be loaded. Please refresh the page`)
        errorState = true
      }
    )

  getHistoricalPrices(parseYesterday(dateSelection), currencySelection.value)
    .then(
      (e) => {
        if (e.target.response) {
          historicaldict = JSON.parse(e.target.response).rates
        } else {
          setErrorMessageHandler(`Error: Historical prices could not be retrieved. Please refresh the page.`)
          errorState = true
        }
      },
      (e) => {
        setErrorMessageHandler(`Error: Historical prices could not be retrieved. Please refresh the page.`)
        errorState = true
      }
    )

  if (!errorState) {
    tableUpdateHandler(currencySelection.value, itemslist)
  }
  errorState = false
}

getCurrencyList()
  .then(
    (e) => {
      if (e.target.response) {
        const itemsJSON = JSON.parse(e.target.response).symbols
        itemslist = Object.keys(itemsJSON)
        createCurrencyItems(itemsJSON)
      } else {
        setErrorMessageHandler('Error: Currencies could not be loaded. Please refresh the page.')
      }
    },
    (e) => setErrorMessageHandler('Error: Currencies could not be loaded. Please refresh the page.')
  )

getCurrencyPrices('USD')
  .then(
    (e) => {
      if (e.target.response) {
        pricesdict = JSON.parse(e.target.response).rates
      } else {
        setErrorMessageHandler('Error: Currency Prices were not received. Please refresh the page.')
      }
    },
    (e) => setErrorMessageHandler('Error: Server could not be reached. Please refresh the page.')
  )

getHistoricalPrices('2021-07-15', 'USD')
  .then(
    (e) => {
      if (e.target.response) {
        historicaldict = JSON.parse(e.target.response).rates
      } else {
        setErrorMessageHandler('Error: Did not receive prices. Please refresh the page.')
      }
    },
    (e) => setErrorMessageHandler('Error: Server could not be reached. Please refresh the page.')
  )


// Injecting Change Handlers/Listeners
injectOnCurrencyChangeHandler()
injectOnDateChangeHandler()


// getPast30Days('07/16/2020', 'USD', 'EUR').then(
//   (data) => {
//     chartItem('chartContainer', 'yes', data)
//   }
// )

