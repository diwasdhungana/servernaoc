const ChainUtil = require('../chain-util');
const { DIFFICULTY,MINE_RATE } = require('../config.js');
const fs = require('fs');
const glob = require('glob');

class Block{
    constructor(timestamp,lastHash,hash,data,nonce,difficulty, noOfTransactions , miner){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
        this.noOftransactions = noOfTransactions;
        this.miner = miner;
    }

    /**
     * returns what the object looks like
     * substring is used to make it look nice
     * hashes are too big to printed on command line 
     */

    toString(){
        return `Block - 
        Timestamp : ${this.timestamp}
        Last Hash : ${this.lastHash.substring(0,10)}
        Number of Transacions : ${this.noOftransactions}
        Hash      : ${this.hash.substring(0,10)}
        Nonce     : ${this.nonce}
        Data      : ${this.data}
        Difficulty: ${this.difficulty}`;
    }

    /**
     * function to create the first block or the genesis block
     */

    static genesis(){
        var firstblock = new this('Genesis time','0000','f1574-h4gh',[],0,DIFFICULTY, 1 , 'developer' );
        const firstblockjson = JSON.stringify(firstblock, 0 , 2 );
        fs.writeFile("./CHAIN/BLOCKS/naoc.json", firstblockjson, 'utf8' , (err , file) =>console.log('genesis block creater in file.'));
        
        return firstblock;
    }

    /**
     * function to create new blocks or to mine new blocks
     */

    static mineBlock(lastBlock,data , lengthofchain){

        let hash;
        let timestamp;
        const lastHash = lastBlock.hash;

        let { difficulty } = lastBlock;
        let numberoftransactions = data.length; 
        let miner = data[data.length-1].outputs[0].address;
        let nonce = 0;
        //generate the hash of the block
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lengthofchain);
            hash = Block.hash(timestamp,lastHash,data,nonce,difficulty);
            // checking if we have the required no of leading number of zeros
        } while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));
        
        return new this(timestamp,lastHash,hash,data,nonce,difficulty, numberoftransactions , miner );
    }

    /**
     * function to create the hash value of the block data
     */

    static hash(timestamp,lastHash,data,nonce,difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    /**
     * return the hash value of the passed block
     */

    static blockHash(block){
        //destructuring
        const { timestamp, lastHash, data, nonce,difficulty } = block;
        return Block.hash(timestamp,lastHash,data,nonce,difficulty);
    }

    /**
     * utility function to adjust difficulty
     */

     static adjustDifficulty(lengthofchain){
         let adddiff = Math.floor(lengthofchain/200) 
        let  difficulty = DIFFICULTY + adddiff;
         return difficulty; 
     }

}

// share this class by exporting it

module.exports = Block;