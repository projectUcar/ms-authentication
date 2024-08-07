import amqp from 'amqplib/callback_api';
import rabbitSettings from './rabbitmqSettings';
import { EMAIL_UCAR, QUEUE } from '../config';
import { sendMail } from './emailService';

amqp.connect(rabbitSettings, (error0, connection) => {
  console.log("Consumiendo servicio RabbitMQ...");
    if (error0) {
      throw error0;
    }
  
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
  
      channel.assertQueue(QUEUE, { durable: false });
  
      channel.consume(QUEUE, async (msg) => {
        if (msg !== null) {
          const { userId, firstName, lastName, gender, phoneNumber, email, carrer, documentType, documentNumber, brand, model, line, plate } = JSON.parse(msg.content.toString());

          console.log(userId, firstName, lastName, gender, phoneNumber, email, carrer, documentType, documentNumber, brand, model, line, plate,);
  
          try {
            const changeRolUrl = "http://localhost:4000/api/change-role/driver-role/" + userId;
            const to = 'andrey.hernandez.2018@upb.edu.co';
            const subject = 'UCAR - Nueva solicitud de modo conductor';
            const template = 'changeRol/changeRolDriver';
            const context = { 
                userId,
                firstName,
                lastName,
                gender,
                phoneNumber,
                email,
                carrer,
                documentType,
                documentNumber,
                brand,
                model,
                line,
                plate,
                changeRolUrl
            }
  
            await sendMail(to, subject, template, context);
  
            console.log('Notification email sent');
            channel.ack(msg);
          } catch (error) {
            console.error('Error processing vehicle request:', error);
             channel.ack(msg);
          }
        }
      }, { noAck: false });
    });
  });