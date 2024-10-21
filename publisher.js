const solace = require("solclientjs");

// Creating a solace configuration variable which can be used to establish connection
const solaceConfig = {
  hostURL: "wss://mr-connection-pb33f7bh79v.messaging.solace.cloud:443",
  vpnName: "default",
  userName: "solace-cloud-client",
  password: "lpensu4glj2a6rlcnfit32f0g5",
};

var factoryProps = new solace.SolclientFactoryProperties();
factoryProps.profile = solace.SolclientFactoryProfiles.version10;
solace.SolclientFactory.init(factoryProps);

solace.SolclientFactory.setLogLevel(solace.LogLevel.DEBUG);

// Intialize a solace session
const session = solace.SolclientFactory.createSession({
  url: solaceConfig.hostURL,
  vpnName: solaceConfig.vpnName,
  userName: solaceConfig.userName,
  password: solaceConfig.password,
});

try {
  session.connect();
  console.log("Connection successful");
} catch (error) {
  console.log(error);
}
