pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ExchangeMyToken is Ownable {
    constructor() public Ownable() {}

    address _mytokenAddress;
    event MsgGetMyToken(address indexed sender, uint256 indexed amount);

    // 先做固定的转换    系统主代币换XYP代币
    function setMyToken(address mytokenAddress) public onlyOwner {
        _mytokenAddress = mytokenAddress;
    }

    //主代币不在本合约里面,所以不用这个合约来查
    function GetMytoken() public payable {
        emit MsgGetMyToken(_msgSender(), msg.value);
        _mytokenAddress.call(
            abi.encodeWithSignature("Mint(uint256)", msg.value)
        );
        _mytokenAddress.call(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                _msgSender(),
                msg.value
            )
        );
    }

    function CallMintMyToken(uint256 amount) public {
        _mytokenAddress.call(
            abi.encodePacked(keccak256("Mint(uint256)"), amount)
        );
    }

    function DelegateCallMintMyToken(uint256 amount) public {
        _mytokenAddress.delegatecall(
            abi.encodePacked(keccak256("Mint(uint256)"), amount)
        );
    }
}
