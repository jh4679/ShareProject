pragma solidity ^0.4.11;

contract Shopping{
  address Creator;
  
  mapping (address => uint256) public balanceOf;
  address public clientAddress;
  string public name;
  string public symbol;
  uint256 public totalSupply;

  modifier onlyCreator(){
    if(msg.sender != Creator){
     throw;
   }
    _;
  }
    
  function Shopping(uint256 initialSupply, string tokenName, string tokenSymbol){
    Creator = msg.sender;
    balanceOf[msg.sender] = initialSupply;
    name = tokenName;
    symbol = tokenSymbol;
    totalSupply = initialSupply;
  }

  function() payable {}    // fallback
 
  function withdraw(uint money) onlyCreator {
    Creator.transfer(money);
  }

  function getBalance() onlyCreator constant returns (uint) {
    return this.balance;
  }
  
  function getPoint() constant returns (uint) {
    return balanceOf[msg.sender];
  }
  
  function addPoint(address target, uint256 mintedAmount) onlyCreator {
    balanceOf[target] += mintedAmount;
    totalSupply += mintedAmount;

  }// owner 만이 target address 의 token의 개수를 늘려줄 수 있다.
  
  function transferPoint(uint256 _value) {
    if (balanceOf[Creator] < _value) throw;          
    balanceOf[msg.sender] += _value;                    
    balanceOf[Creator] -= _value;                       
  }
  function payBack(uint256 _payback_value){

    msg.sender.transfer( (_payback_value*1000000000000000000) );   

    balanceOf[msg.sender]-= _payback_value*100000;

  }

}