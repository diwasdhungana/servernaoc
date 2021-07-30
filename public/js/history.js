// const socket=io()
// socket.on("new-transaction",transaction=>{
//     console.log(transaction)
// })


const displayTransaction = (block) => {
    
    const rows1 = document.getElementById("rows-1");
    const row = document.createElement('div');

    // row = <div class="row">
    // <div class="height">13412359879</div>
    // <div class="mined">35 min</div>
    // <div class="miner">Bijen</div>
    // <div class="size">10000000</div>
    // </div>;
    row.classList.add("row");
    row.innerHTML = `
    <div class="longest height">${block.block1.noOftransactions}</div>
    <div class="nonce">${block.block1.nonce}</div>
    <div class="longest miner">${block.block1.miner}</div>
    <div class="longest size">${block.block1.timestamp}</div>`;
    rows1.appendChild(row);
}
const displayTransaction1 = (transaction) => {
    const rows = document.getElementById("rows-2");
    const row = document.createElement('div');
    row.classList.add("row");
    row.innerHTML = `
    <div class="longest hash">${transaction.input.signature}</div>
    <div class="time">${transaction.input.timestamp}</div>
    <div class="amount">${transaction.outputs[1].amount}</div>
    <div class="balance">${transaction.input.amount}</div>`;
    rows.appendChild(row);
}

fetch("/xyz")
  .then((resp) => resp.json())
  .then((response) => {
      
      response.data.forEach(x=>displayTransaction1(x));
      response.data1.forEach(x=>displayTransaction(x));
}) 
    .catch((err) => console.error(err));
 

  
  
