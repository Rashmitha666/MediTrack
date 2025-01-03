const twilio = require('twilio');
async function sendSMS(toPhoneNumber, date) 
{
    const accountSid = 'AC3a1de7d8054b8ea8c7f54cb5c9861ec4';    
    const authToken = 'b135be79ac0c679fc09ab3c2df8f8c35';     
    const fromPhoneNumber = '+12183079671';              
    const client = twilio(accountSid, authToken);

    try 
    {
        const message = await client.messages.create({
            body: `Your appointment is confirmed for ${date}.`,
            from: fromPhoneNumber,
            to: toPhoneNumber
        });
        console.log('SMS Sent:', message.sid);
    } 
    catch (error) 
    {
        console.error('Error sending SMS:', error);
    }
}

export {sendSMS}