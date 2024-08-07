import amqp from 'amqplib/callback_api';
import { PORT_RABBIT, USERNAME_RABBITMQ, PASSWORD_RABBITMQ, HOSTNAME_RABBITMQ, QUEUE } from '../config';

const rabbitSettings = {
	protocol: 'amqp',
	hostname: HOSTNAME_RABBITMQ,
	port: PORT_RABBIT,
	username: USERNAME_RABBITMQ,
	password: PASSWORD_RABBITMQ,
	authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
};

export default rabbitSettings;