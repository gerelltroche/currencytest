const tableItem = (name, histrate, rate) => {

// Generating something like this.
// <div class="row">
//     <div>${name}</div><div>Percent Change</div><div>${rate}</div>
// </div>

  const numberhistrate = parseFloat(histrate)

  const row = document.createElement('div')
  let percentChange = 0

  if (numberhistrate !== 0) {
    percentChange = (rate - histrate) / histrate * 100
  }

  row.innerHTML = `
  <div>${name}</div>
  <div>${percentChange.toFixed(2)}</div>
  <div>${rate}</div>
  `
  row.className = 'row'
  return row
}

export default tableItem
