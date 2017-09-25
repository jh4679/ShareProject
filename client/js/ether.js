import { Meteor } from 'meteor/meteor';





var contractAddress = '0xdb81dbce4b3b4b5c4b31c41da4a43d91069ff508';
var abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "clientAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "money", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getPoint", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_payback_value", "type": "uint256" }], "name": "payBack", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "transferPoint", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }, { "name": "mintedAmount", "type": "uint256" }], "name": "addPoint", "outputs": [], "payable": false, "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" }], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }]
var myAccountAddress;



/*
var forge = require('node-forge');
var rsa = forge.pki.rsa;

var pair = forge.pki.rsa.generateKeyPair(1024, 0x10001);

var pk = forge.asn1.toDer(forge.pki.privateKeyToAsn1(pair.privateKey)).getBytes();
var privateKey = forge.pki.privateKeyFromAsn1(forge.asn1.fromDer(pk));
var publicKey = forge.pki.rsa.setPublicKey(privateKey.n, privateKey.e);

console.log(privateKey);
console.log(publicKey);


var message = 'The quick brown fox jumps over the lazy dog';
console.log('PlainText : ' + message)

var md = forge.md.sha256.create(); //message digest (sha256 format 의 digest 객체 생성)
md.update(message); //message를 sha256으로 hash화 하겠다.
console.log('PlainText sha256 hash : ' + md.digest().toHex()); //md.digest()를 hex로 보여달라.
signiture = privateKey.sign(md) //개인키를 이용하여 digest를 서명한다. 
verifyValue = publicKey.verify(md.digest().bytes(), signiture) //공개키를 이용하여 verify 해준다. (byte형식, signiture)
console.log('Is A create this Message? :' + verifyValue);




encrypted = publicKey.encrypt(forge.util.encodeUtf8(message))
console.log('CipherText : ' + encrypted);
decrypted = forge.util.decodeUtf8(privateKey.decrypt(encrypted));
console.log('DecryptedText : ' + decrypted);
///////////////////////////////////////////////////////////////////////////////////////////////////////////

var pair = forge.pki.rsa.generateKeyPair(1024, 0x10001);

// pair.privateKey has n, e, d, p, q, dP, qQ, qInv
// pair.publicKey has n, e
// Note that the private key contains the components of
// the public key.

// public key as PEM (typical storage)
console.log(forge.pki.publicKeyToPem(pair.publicKey));

// private key as PEM (typical unprotected storage)
console.log(forge.pki.privateKeyToPem(pair.privateKey));

// password protected private key as PEM (typical protected storage)
console.log(forge.pki.encryptRsaPrivateKey(pair.privateKey, 'password'));

// raw private key DER bytes
var pk = forge.asn1.toDer(forge.pki.privateKeyToAsn1(pair.privateKey)).getBytes();

// converting pk back from DER bytes
var privateKey = forge.pki.privateKeyFromAsn1(forge.asn1.fromDer(pk));

// getting public key from private key
var publicKey = forge.pki.rsa.setPublicKey(privateKey.n, privateKey.e);

// prints same public key as above
console.log(forge.pki.publicKeyToPem(publicKey));
*/




Meteor.startup(function() {
    startApp();
});

Template.ether.onRendered(function() {

    web3.setProvider(new Web3(web3.currentProvider));
    startApp();

});

function getLink(addr) {
    return '<a target="_blank" href=https://ropsten.etherscan.io/address/' + addr + '>' + addr + '</a>';
}

function startApp() {

    ///////////////////////Contract를 객체화 하는 작업///////////////////////
    ShoppingContract = web3.eth.contract(abi); // contract interface 를 이용해 contract를 사용할 수 있도록 한다. 
    Shopping = ShoppingContract.at(contractAddress); // contract 주소 변수에 저장


    web3.eth.getAccounts(function(e, r) { //web3.eth.getAccounts는 현재 사용하고있는 계정을 불러온다.
        
        document.getElementById('accountAddr').innerHTML = getLink(r[0]);
        document.getElementById('contractAddr').innerHTML = getLink(contractAddress);

    });

}