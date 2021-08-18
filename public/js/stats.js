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
      borderColor: 'black',
      borderWidth: 2,
      pointStyle: 'cross',
      tension:0.1,
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      x:{
        ticks:{
          callback: function(value){
            return this.getLabelForValue(value).substr(0,8)
          }
        }
      },
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
  const label1 = data.data1.map((x) => x.id)
  const data1 = data.data1.map((x) => x.outputs[1].amount)

  datalabel=label1;
  datadata=data1;
}

const myaddress = document.getElementById('MYaddress')

fetch("/address")
.then(now=>now.json())
.then(res =>{
	myaddress.innerText = res.url
})
.catch(err=>console.error(err))


const alladdress = document.getElementById('ALLaddress')
const urlarray = ["\n"];
fetch("/all")
.then(now=>now.json())
.then(res =>{
  console.log(res);
  res.forEach(data=>  urlarray.push(data.url+"\n"))
  // urlarray.push("\n")
})

.then(()=>{
  alladdress.innerText =  urlarray;
})
.catch(err=>console.error(err))