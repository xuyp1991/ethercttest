const MyToken = artifacts.require("MyToken");
const SimpleToken = artifacts.require("SimpleToken");
const MyExchange = artifacts.require("MyExchange");

contract('MyToken', (accounts) => {
    it('should be success', async () => {
        const myCoinInstance = await MyToken.deployed("xuyapeng", "XYP");
        const simpleCoinInstance = await SimpleToken.deployed("simpletoken", "ST");
        const ExchangeInstance = await MyExchange.deployed();
        const accountOne = accounts[0];
        const accountTwo = accounts[1];
        await myCoinInstance.transferOwnership(ExchangeInstance.address, { from: accountOne });
        await ExchangeInstance.registerToken(simpleCoinInstance.address, myCoinInstance.address, { from: accountOne });
        await simpleCoinInstance.transfer(accountTwo, 10000, { from: accountOne })
        var balance = await simpleCoinInstance.balanceOf.call(accountTwo);
        console.log(`account two   ${accountTwo}     balance  ${balance}`)
        assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
        await simpleCoinInstance.approve(ExchangeInstance.address, 100, { from: accountTwo })
        await ExchangeInstance.depositBase(simpleCoinInstance.address, 100, { from: accountTwo })
        balance = await simpleCoinInstance.balanceOf.call(accountTwo);
        console.log(`accountTwo  balance  ${balance}`)
        balance = await simpleCoinInstance.balanceOf.call(ExchangeInstance.address);
        console.log(`ExchangeInstance  balance  ${balance}`)
        balance = await myCoinInstance.balanceOf.call(accountTwo);
        console.log(`accountTwo  balance  ${balance}`)

        await myCoinInstance.approve(ExchangeInstance.address, 100, { from: accountTwo })
        await ExchangeInstance.claim(myCoinInstance.address, 100, { from: accountTwo })
        balance = await simpleCoinInstance.balanceOf.call(accountTwo);
        console.log(`accountTwo  balance  ${balance}`)
    });
});