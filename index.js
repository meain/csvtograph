import Chart from "chart.js";

const chartTypes = ["bar", "horizontalBar", "line"];
let currentChartType = "bar";

var ctx = document.getElementById("chart").getContext("2d");
function makeChart(input, kind) {
  let labels = input.map(d => d[Object.keys(d)[0]]);
  let data = input.map(d => parseFloat(d[Object.keys(d)[1]]));
  let llabel = Object.keys(input[0])[1];
  var chart = new Chart(ctx, {
    type: kind,
    data: {
      responsive: true,
      labels: labels,
      datasets: [
        {
          label: llabel,
          data: data
        }
      ]
    }
  });
}

// Request data using D3
const urlParams = new URLSearchParams(window.location.search);
function plotChart(kind) {
  const url = urlParams.get("url");
  d3.csv(url).then(d => makeChart(d, kind));
}

let kind = urlParams.get("kind") || "bar";
plotChart(kind);

// buttons
function createButton(context, func, label) {
  var button = document.createElement("input");
  button.type = "button";
  button.value = label;
  button.onclick = func;
  context.appendChild(button);
}
const buttons = document.getElementById("buttons");
chartTypes.forEach(ct => {
  createButton(buttons, () => plotChart(ct), ct);
});
