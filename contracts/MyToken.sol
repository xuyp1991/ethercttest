pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol)
        public
        ERC20(name, symbol)
    {}

    event MsgMint(address indexed sender, uint256 indexed amount);
    event MsgBurn(uint256 indexed amount);

    function Mint(uint256 amount) public onlyOwner {
        emit MsgMint(msg.sender, amount);
        _mint(msg.sender, amount);
    }

    function Burn(uint256 amount) public onlyOwner {
        emit MsgBurn(amount);
        _burn(msg.sender, amount);
    }
}
