const uuidV1 = require('uuidv1');
const crypto = require('crypto');
const SHA256 = require('crypto-js/sha256');
//const fs = require('fs');
const Base58 = require("base-58");


class ChainUtil{

    static id(){
        return uuidV1();
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }
    /**
     * verify the transaction signature to 
     * check its validity using the method provided
     * in EC module
     */

    static verifySignature(publicKey,signature,dataHash)
    {

        var decodedString = Base58.decode(publicKey);
        var buff = new Buffer(decodedString);
        const address = buff.toString('utf8')

        const verify = crypto.createVerify('SHA256');
        verify.write(dataHash);
        verify.end();
        const verified = verify.verify(address, signature, 'hex')
        console.log(verified);
        return verified;
    }

}
module.exports = ChainUtil;