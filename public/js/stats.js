var datalabel=[], datadata=[];

async function Chartdiagram(){
  await getdata();
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: datalabel,
    datasets: [{
      label: 'amount',
      data: datadata,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: 'white',
      borderWidth: 2
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

}

Chartdiagram();

async function getdata() {
  const url = "/chart"
  const response = await fetch(url)
  const data = await response.json()
  
  console.log(data.data1[0].outputs[1])
  const label1 = data.data1.map((x) => x.outputs[1].address)
  const data1 = data.data1.map((x) => x.outputs[1].amount)

  datalabel=label1;
  datadata=data1;
}