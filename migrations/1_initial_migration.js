const Migrations = artifacts.require("Migrations");
const MyToken = artifacts.require("MyToken");
const SimpleToken = artifacts.require("SimpleToken");
const MyExchange = artifacts.require("MyExchange");
const call = artifacts.require("Call");

//const ExchangeMyToken = artifacts.require("ExchangeMyToken");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MyToken, "xuyapeng", "XYP");
  deployer.deploy(SimpleToken, "SimpleToken", "ST");
  deployer.deploy(MyExchange);
  deployer.deploy(call);
  //deployer.deploy(ExchangeMyToken);
};
