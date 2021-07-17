import tableItem from "./tableItem"
import {getCurrencyList, getCurrencyPrices, getHistoricalPrices, parseYesterday, parseToday} from "./plugins"


let itemslist = []
let pricesdict = {}
let historicaldict = {}

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
    table.appendChild(row)

  }
}

const onCurrencyChangeHandler = (currencySelection) => {

  const dateSelection = document.getElementById('date').value

  getCurrencyPrices(currencySelection)
    .then(
      (e) => {
        pricesdict = JSON.parse(e.target.response).rates
      },
      (e) => console.log('handle error')
    )

  getHistoricalPrices(parseYesterday(dateSelection), currencySelection)
    .then(
      (e) => {
        historicaldict = JSON.parse(e.target.response).rates
      },
      (e) => console.log('handle error')
    )

  tableUpdateHandler(currencySelection, itemslist)

}

const onDateChangeHandler = (dateSelection) => {

  const currencySelection = document.getElementById('selected-currency')

  if (!currencySelection.value) {
    for (let i = 0; i < currencySelection.options.length; i++) {
      if (currencySelection.options[i].text === 'EUR') {
        currencySelection.options[i].selected = true
      }
    }
  }


  getHistoricalPrices(parseToday(dateSelection), currencySelection.value)
    .then(
      (e) => {
        pricesdict = JSON.parse(e.target.response).rates
      },
      (e) => console.log('handle error')
    )

  getHistoricalPrices(parseYesterday(dateSelection), currencySelection.value)
    .then(
      (e) => {
        historicaldict = JSON.parse(e.target.response).rates
      },
      (e) => console.log('handle error')
    )

  tableUpdateHandler(currencySelection.value, itemslist)

}

getCurrencyList()
  .then(
    (e) => {
      const itemsJSON = JSON.parse(e.target.response).symbols
      itemslist = Object.keys(itemsJSON)
      createCurrencyItems(itemsJSON)
    },
    (e) => console.log('handle error')
  )
getCurrencyPrices('USD')
  .then(
    (e) => {
      pricesdict = JSON.parse(e.target.response).rates
    },
    (e) => console.log('handle error')
  )
getHistoricalPrices('2021-07-15', 'USD')
  .then(
    (e) => {
      historicaldict = JSON.parse(e.target.response).rates
    },
    (e) => console.log('handle error')
  )


// Injecting Change Handlers
injectOnCurrencyChangeHandler()
injectOnDateChangeHandler()
