import CanvasJS from './vendor/canvasjs.min'

const chartFillHandler = (chartContainerId, title, datapoints) => {

  const chart = new CanvasJS.Chart(chartContainerId, {
    animationEnabled: true,
    theme: "dark1",
    backgroundColor: "#1b2a33",
    title:{
      text: title
    },
    axisY:{
      includeZero: false
    },
    data: [{
      type: "line",
      dataPoints: datapoints
    }]
  });

  chart.render();
}

const chartItem = (chartContainerID) => {
  const chart = document.createElement('div')
  chart.id = chartContainerID
  chart.className = 'chart'

  return chart
}

export { chartFillHandler, chartItem }

// <div id="chartContainer" style="height: 370px; max-width: 920px; margin: 0px auto;"></div>
// <script src="../../canvasjs.min.js"></script>
