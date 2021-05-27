const path = require("path");
const NETWORK_ID = "5777";
const GASLIMIT = "1000000";

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      from: "0xEd1067cf8cc8a721a3CcD18423756978C43D3d65",
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null
    }
  },
  compilers: {
    solc: {
      version: "0.5.6"
    }
  }
};
