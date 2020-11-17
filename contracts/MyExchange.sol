pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MyToken.sol";

contract MyExchange is Ownable {
    constructor() public Ownable() {}

    mapping(address => address) private _basepair;
    mapping(address => address) private _quotepair;

    // 注册可以交换的代币
    function registerToken(address baseTokenAddress, address quoteTokenAddress)
        public
        onlyOwner
    {
        //判断是否已经存在?
        require(
            _basepair[baseTokenAddress] == address(0),
            "the baseTokenAddress has exist"
        );
        require(
            _quotepair[quoteTokenAddress] == address(0),
            "the quoteTokenAddress has exist"
        );
        _basepair[baseTokenAddress] = quoteTokenAddress;
        _quotepair[quoteTokenAddress] = baseTokenAddress;
        MyToken quoteToken = MyToken(quoteTokenAddress);
        quoteToken.Mint(100);
        quoteToken.Burn(100);
    }

    //外部代币兑换本位币
    function depositBase(address baseTokenAddress, uint256 amount) public {
        address quoteTokenAddress = _basepair[baseTokenAddress];
        require(
            quoteTokenAddress != address(0),
            "base coin do not register for exchange"
        );

        MyToken quoteToken = MyToken(quoteTokenAddress);
        ERC20 baseToken = ERC20(baseTokenAddress);
        bool succ = baseToken.transferFrom(_msgSender(), address(this), amount);
        assert(succ);

        quoteToken.Mint(amount);

        succ = quoteToken.transfer(_msgSender(), amount);
        assert(succ);
    }

    //本位币兑换外部代币
    function claim(address quoteTokenAddress, uint256 amount) public {
        address baseTokenAddress = _quotepair[quoteTokenAddress];
        require(
            baseTokenAddress != address(0),
            "quote coin do not register for exchange"
        );
        MyToken quoteToken = MyToken(quoteTokenAddress);
        ERC20 baseToken = ERC20(baseTokenAddress);

        bool succ = quoteToken.transferFrom(
            _msgSender(),
            address(this),
            amount
        );
        assert(succ);

        succ = baseToken.transfer(_msgSender(), amount);
        assert(succ);

        quoteToken.Burn(amount);
    }
}
