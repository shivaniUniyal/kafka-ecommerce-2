
const consumer = require("../../gateway/kafka/consumer");
const showMessage = async () => {
    try {
        await consumer.subscribe({ topic: 'test-topic-new', fromBeginning: true })
        console.log("consumer subscribed")
        await consumer.run({
            eachMessage: ({ message }) => {
                console.log(`received message: `, JSON.parse(message.value));
            },
        })
    } catch (err) {
        return 401;
    }
};

showMessage();