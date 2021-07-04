// const socket=io()
// socket.on("new-transaction",transaction=>{
//     console.log(transaction)
// })

$(function(){
    var scroll= $(document).scrollTop();
    var navHeight = $('.navbar').outerHeight();

    $(window).scroll(function(){

        var scrolled= $(document).scrollTop();

        if(scrolled > navHeight){
            $('.navbar').addClass('animate');
        }else{
            $('.navbar').removeClass('animate');
        }

        if(scrolled > scroll){
             $('.navbar').removeClass('sticky');

        }else{
            $('.navbar').addClass('sticky');
        }
        
        scroll = $(document).scrollTop();
    })

});


const displayTransaction = (transaction) => {
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
    <div class="height">${transaction.height}</div>
    <div class="mined">${transaction.mined}</div>
    <div class="miner">${transaction.miner}</div>
    <div class="size">${transaction.size}</div>`;
    rows1.appendChild(row);
}
const displayTransaction = (transaction) => {
    const rows1 = document.getElementById("rows-2");
    const row1 = document.createElement('div');
    row1.classList.add("row1");
    row1.innerHTML = `
    <div class="hash">${transaction.hash}</div>
    <div class="time">${transaction.time}</div>
    <div class="amount">${transaction.amount}</div>
    <div class="nounce">${transaction.nounce}</div>`;
    rows1.appendChild(row1);
}