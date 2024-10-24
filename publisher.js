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

const publishMessage = (session) => {
  const messageTxt = "Hello from the publisher!!!";
  const message = solace.SolclientFactory.createMessage();
  message.setDestination(
    solace.SolclientFactory.createTopicDestination("test/topic")
  );
  message.setBinaryAttachment(messageTxt);
  message.setDeliveryMode(solace.MessageDeliveryModeType.DIRECT);

  try {
    session.send(message);
    console.log("Message published:", messageTxt);
  } catch (err) {
    console.log("Error while sending the message", err);
  }
};

session.on(solace.SessionEventCode.UP_NOTICE, () => {
  console.log("Publisher connected to Solace.");
  publishMessage(session);
});

session.on(solace.SessionEventCode.DISCONNECTED, () => {
  console.log("Publisher disconnect from Solace");
});

session.connect();
