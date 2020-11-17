const MyToken = artifacts.require("MyToken");
const ExchangeMyToken = artifacts.require("ExchangeMyToken");

contract('MyToken', (accounts) => {
    // it('should put 100000000000000 MetaCoin in the first account', async () => {
    //     const myCoinInstance = await MyToken.deployed();
    //     const balance = await myCoinInstance.balanceOf.call(accounts[0]);
    //     console.log(`balance  ${balance}`)
    //     assert.equal(balance.valueOf(), 100000000000000, "100000000000000 wasn't in the first account");
    // });
    it('with  call', async () => {
        const myCoinInstance = await MyToken.deployed();
        const ExchangeInstance = await ExchangeMyToken.deployed();
        const accountOne = accounts[0];
        await myCoinInstance.transferOwnership(ExchangeInstance.address, { from: accountOne });
        await ExchangeInstance.setMyToken(myCoinInstance.address, { from: accountOne });
        console.log(`set some address`)
        const accountTwo = accounts[1];
        await ExchangeInstance.CallMintMyToken(1000000000, { from: accountTwo });
    });
    it('with delegate call', async () => {
        const myCoinInstance = await MyToken.deployed();
        const ExchangeInstance = await ExchangeMyToken.deployed();
        const accountOne = accounts[0];
        //       await myCoinInstance.transferOwnership(ExchangeInstance.address, { from: accountOne });
        await ExchangeInstance.setMyToken(myCoinInstance.address, { from: accountOne });
        console.log(`set some address`)
        const accountTwo = accounts[1];
        await ExchangeInstance.DelegateCallMintMyToken(1000000000, { from: accountTwo });
    });
    it('with token func  call', async () => {
        const myCoinInstance = await MyToken.deployed();
        const ExchangeInstance = await ExchangeMyToken.deployed();
        const accountOne = accounts[0];
        //  await myCoinInstance.transferOwnership(ExchangeInstance.address, { from: accountOne });
        await ExchangeInstance.setMyToken(myCoinInstance.address, { from: accountOne });
        console.log(`set some address`)
        const accountTwo = accounts[2];
        await ExchangeInstance.GetMytoken({ from: accountTwo, value: 10000 });
        const balance = await myCoinInstance.balanceOf.call(accountTwo);
        console.log(`balance  ${balance}      accountTwo   ${accountTwo}      addressExchange     ${ExchangeInstance.address}      addressToken    ${myCoinInstance.address}`)
        console.log(`accountOne  ${accountOne} `)
        assert.equal(balance.valueOf(), 10000, "10000 wasn't in the second account");
    });
});
