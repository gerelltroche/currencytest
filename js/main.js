import tableItem from "./tableItem"
import {getCurrencyList, getCurrencyPrices} from "./plugins"


let itemslist = []
let priceslist = {}

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

    const row = tableItem(currency, 25)
    table.appendChild(row)

  }
}

const onCurrencyChangeHandler = (selection) => {

  tableUpdateHandler(selection, itemslist)

}

getCurrencyList()
  .then(
    (e) => {
      const itemsJSON = JSON.parse(e.target.response).symbols
      createCurrencyItems(itemsJSON)
      itemslist = Object.keys(itemsJSON)
    },
    (e) => console.log('handle error')
  )
getCurrencyPrices()
  .then(
    (e) => {
      const pricesJSON = JSON.parse(e.target.response)
      console.log(pricesJSON)
    },
    (e) => console.log('handle error')
  )

// Injecting Change Handlers
injectOnCurrencyChangeHandler()

