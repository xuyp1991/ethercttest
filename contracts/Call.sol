pragma solidity >=0.4.22 <0.8.0;

contract Call {
    constructor() public {}

    event MsgSender(address sender);

    address lastsender;
    address lastrecipient;

    function test(address recipient) public virtual returns (bool) {
        // emit MsgSender(recipient);
        // emit MsgSender(msg.sender);
        lastsender = msg.sender;
        lastrecipient = recipient;
        return true;
    }

    function GetLastSender() public view returns (address) {
        return lastsender;
    }

    function GetLastRecipient() public view returns (address) {
        return lastrecipient;
    }
}
