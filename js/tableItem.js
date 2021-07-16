const tableItem = (name, rate) => {

// Generating something like this.
// <div class="row">
//     <div>${name}</div><div>Percent Change</div><div>${rate}</div>
// </div>

  const row = document.createElement('div')

  row.innerHTML = `
  <div>${name}</div>
  <div>Percent Change</div>
  <div>${rate}</div>
  `
  row.className = 'row'
  return row
}

export default tableItem
