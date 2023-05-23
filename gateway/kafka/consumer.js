const {Kafka}  = require("kafkajs")

const kafka = new Kafka({
  clientId: 'new-client',
  brokers: ['localhost:9092',],
});

const consumer = kafka.consumer({ groupId: 'test-group-new' })

consumer.connect().then(console.log('consumer connected!'))

module.exports = consumer;
