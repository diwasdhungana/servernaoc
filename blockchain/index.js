const Block = require('./block');
const fs = require('fs');
const glob = require('glob');
const {MongoClient} = require('mongodb');

class Blockchain{
    constructor(){
        

        //
        if (fs.existsSync("./CHAIN/BLOCKS/naoc.json")) {
            fs.readFile('./CHAIN/BLOCKS/naoc.json', 'utf8', (err, file) => 
            {if (err)
                {console.log(err) }
            else 
            {
                 try
                     {
                        this.chain = JSON.parse(file);

                        // console.log(this.chain);
                        this.chain.forEach(data =>{
                            let dbcblocks = {block1:data}
                            MongoClient.connect("mongodb://127.0.0.1:27017",
                            {useNewUrlParser:true,useUnifiedTopology:true},async(err,client)=>{
                                if(err)throw err;
                                const db=client.db("blockChain")
                                db.collection("dbblocks").insertOne(dbcblocks)
                                }
                        )})
                   
        
                     }
                     catch(err){
                            console.error(err);
                    }
            } }); }
        else {
         this.chain = [Block.genesis() ,];
          }
    };
        //
    
    /**
     * utility function to add block to the blockchain
     * returns the added block
     */

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1],data , this.chain.length);
        this.chain.push(block);
        let TOTALblockjson = JSON.stringify(this.chain, 0 ,2);
        fs.writeFile("./CHAIN/BLOCKS/naoc.json", TOTALblockjson, 'utf8' , (err , file) =>console.log('updated successsfully to file.'));
        
        
        const dbblocks = {block1:this.chain[this.chain.length-1]}
        MongoClient.connect("mongodb://127.0.0.1:27017",
        {useNewUrlParser:true,useUnifiedTopology:true},async(err,client)=>{
            if(err)throw err;
            const db=client.db("blockChain")
            db.collection("dbblocks").insertOne(dbblocks)
            
        })
        console.log("Blocks have been inserted in database")

        return block;
    }

    /**
     * checks if the chain recieved from another miner is valid or not
     */

    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false;

        for(let i = 1 ; i<chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];
            if((block.lastHash !== lastBlock.hash) || (
                block.hash !== Block.blockHash(block)))
            return false;
        }

        return true;

    }
    /**
     * replace the chain if the chain recieved from another miner
     * is longer and valid
     */

    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log("!!SAME SIZE CHAIN RECEIVED!! (no changes done)");
            return;
        }else if(!this.isValidChain(newChain)){
            console.log("Recieved chain is invalid");
            return;
        }
        
        console.log("!!<CHAIN REPLACED WITH NEW AND LONGER CHAIN>!!");
        this.chain = newChain; 
        const TOTALblockjson = JSON.stringify(this.chain, 0 ,2);
        fs.writeFile("./CHAIN/BLOCKS/naoc.json", TOTALblockjson, 'utf8' , (err , file) =>console.log('updated successsfully to file.'));

    }


    datainline(){
        //console.log(this.chain[0]);
        const datainoneline = [];
        for( let i = this.chain.length ; i > 0 ; i-- ){
            datainoneline.push({
            height : i-1 ,
            miner : this.chain[i - 1].miner ,
            nounce : this.chain[i - 1].nonce,
            nooftransactions : this.chain[i - 1].noOftransactions
            });
            
        };
        //console.log(datainoneline);

        return datainoneline;
    }
}


module.exports = Blockchain;