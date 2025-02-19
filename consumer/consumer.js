require('dotenv').config();
const amqp = require('amqplib');

async function receiveMessage() {
    try {
        // Connect to RabbitMQ
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        // Define queue name
        const queue = process.env.QUEUE_NAME;
        await channel.assertQueue(queue, { durable: false });

        console.log(`Waiting for messages in ${queue}...`);

        // Receive messages
        channel.consume(queue, (msg) => {
            console.log(`Received: ${msg.content.toString()}`);
            channel.ack(msg);

        }, { noAck: false });


    } catch (error) {
        console.error("Error:", error);
    }
}

receiveMessage();
