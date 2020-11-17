const MyToken = artifacts.require("MyToken");
const SimpleToken = artifacts.require("SimpleToken");
const MyExchange = artifacts.require("MyExchange");
const Call = artifacts.require("Call");

contract('MyToken', (accounts) => {
    it('should be success', async () => {
        //      const myCoinInstance = await MyToken.deployed("xuyapeng", "XYP");
        const simpleCoinInstance = await SimpleToken.deployed("simpletoken", "ST");
        const ExchangeInstance = await MyExchange.deployed();
        const CallInstance = await Call.deployed();

        const accountOne = accounts[0];
        const accountTwo = accounts[1];
        await ExchangeInstance.transferCoin(CallInstance.address, accountTwo, { from: accountOne });
        console.log(`accountOne ${accountOne}`)
        console.log(`accountTwo ${accountTwo}`)
        console.log(`ExchangeInstance ${ExchangeInstance.address}`)
        console.log(`simpleCoinInstance ${CallInstance.address}`)
        const lastSender = await CallInstance.GetLastSender();
        const lastRecipient = await CallInstance.GetLastRecipient();

        console.log(`lastSender ${lastSender}`)
        console.log(`lastRecipient ${lastRecipient}`)

        assert.equal(accountOne, accountTwo, "100000000000000 wasn't in the first account");
    });
});