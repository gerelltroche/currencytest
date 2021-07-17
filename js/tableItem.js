const tableItem = (name, histrate, rate) => {

// Generating something like this.
// <div class="row">
//     <div>${name}</div><div>Percent Change</div><div>${rate}</div>
// </div>

  const row = document.createElement('div')
  const percentChange = (rate - histrate) / histrate * 100
  let modifyer = '^'
  if (percentChange <= 0) {
    modifyer = 'V'
  }

  row.innerHTML = `
  <div>${name}</div>
  <div>${modifyer} ${percentChange.toFixed(2)}</div>
  <div>${rate}</div>
  `
  row.className = 'row'
  return row
}

export default tableItem
