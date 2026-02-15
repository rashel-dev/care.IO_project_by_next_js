import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendInvoiceEmail = async (to: string, bookingData: any) => {
  const { serviceName, duration, totalCost, location, _id } = bookingData;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <div style="text-align: center; border-bottom: 2px solid #00cfd5; padding-bottom: 10px;">
        <h1 style="color: #333; margin: 0;">Care.io Invoice</h1>
        <p style="color: #666;">Empowering Families Through Exceptional Care</p>
      </div>
      
      <div style="padding: 20px 0;">
        <p><strong>Booking ID:</strong> ${_id}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Duration:</strong> ${duration.value} ${duration.type}</p>
        <p><strong>Total Cost:</strong> $${totalCost}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Location:</strong><br/>
           ${location.address}<br/>
           ${location.area}, ${location.city}<br/>
           ${location.district}, ${location.division}
        </p>
      </div>

      <div style="background-color: #00cfd5; color: white; text-align: center; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p style="margin: 0;">Thank you for choosing Care.io!</p>
      </div>
      
      <div style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
        <p>&copy; 2024 Care.io. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Care.io Team" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Invoice for your ${serviceName} booking - Care.io`,
      html: htmlContent,
    });
    console.log('Invoice email sent successfully');
  } catch (error) {
    console.error('Error sending invoice email:', error);
  }
};
