require('dotenv').config();
const amqp = require('amqplib');

async function sendMessage() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Define queue name
    const queue = process.env.QUEUE_NAME;
    await channel.assertQueue(queue, { durable: false });

    // Message to send
    const message = "Hello from the Producer!";
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`Sent: ${message} on queue.`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error("Error:", error);
  }
}

sendMessage();
