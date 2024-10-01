import Chart from 'react-google-charts'

function LineChart() {

  const data = [
    ["x", "Gasto"],
    ["janeiro", 0],
    ["fevereiro", 1000],
    // [2, 0],
    // [3, 0],
    // [4, 0],
    // [5, 0],
    // [6, 0],
    // [7, 0],
    // [8, 0],
    // [9, 0],
    // [10, 0],
    // [11, 0],
    // [12, 0],
  ];
  
  const options = {
    hAxis: {
      title: "Mesês",
    },
    vAxis: {
      title: "Valor",
    },
    series: {
      // 1: { curveType: "function" },
      0: { curveType: "function" }
    },
  };

  return (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </div>
  )
}

export default LineChart