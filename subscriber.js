const solace = require("solclientjs");

// Creating a solace configuration variable which can be used to establish connection
const solaceConfig = {
  hostURL: "wss://mr-connection-pb33f7bh79v.messaging.solace.cloud:443",
  vpnName: "node-app-service",
  userName: "solace-cloud-client",
  password: "lpensu4glj2a6rlcnfit32f0g5",
};

let factoryProps = new solace.SolclientFactoryProperties();
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

const subscribeToTopic = (session) => {
  try {
    session.subscribe(
      solace.SolclientFactory.createTopicDestination("test/topic"),
      true,
      "Demo Key",
      10000
    );
    console.log("Subscribed to test/topic");
  } catch (err) {
    console.log("Subscription failed:", err);
  }
};

session.on(solace.SessionEventCode.MESSAGE, (message) => {
  console.log("Message received", message.getBinaryAttachment());
});

session.on(solace.SessionEventCode.UP_NOTICE, () => {
  console.log("Subscriber connected to Solace.");
  subscribeToTopic(session);
});

session.on(solace.SessionEventCode.DISCONNECTED, () => {
  console.log("Subscriber disconnected from Solace.");
});

session.connect();
