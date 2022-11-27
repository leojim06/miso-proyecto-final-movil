import { PubSub } from '@google-cloud/pubsub'

const pubSubClient = new PubSub()
const pubSubTopicId = 'projects/sportapp-miso-grupo6/topics/sensors'

export async function publishMessage(data: string) {
    const message = Buffer.from(data);

    try {
        const messageId = await pubSubClient
            .topic(pubSubTopicId)
            .publishMessage({ data: message })
        console.log(`Message ${messageId} published`)
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
    }
}