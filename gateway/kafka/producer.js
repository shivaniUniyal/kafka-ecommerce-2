const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'new-client',
  brokers: ['localhost:9092',],
});

const producer = kafka.producer()
 producer.connect().then(console.log("Producer up and ready."))

module.exports = producer;