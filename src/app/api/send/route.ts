import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const emailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JetPack Üzenet</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .email-wrapper {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent);
      background-size: 64px 64px;
      opacity: 0.2;
    }
    .content {
      background: #ffffff;
      padding: 40px 30px;
      border: 1px solid #e5e7eb;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 10px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .subtitle {
      font-size: 16px;
      opacity: 0.9;
    }
    .field {
      margin-bottom: 24px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
    }
    .field:hover {
      border-color: #3b82f6;
      box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
    }
    .label {
      font-weight: 600;
      color: #4b5563;
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .value {
      color: #1f2937;
      font-size: 16px;
    }
    .message-box {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin-top: 10px;
      border-left: 4px solid #3b82f6;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
    .contact-info {
      margin-top: 20px;
      padding: 15px;
      background: #f0f9ff;
      border-radius: 8px;
      font-size: 13px;
      color: #3b82f6;
    }
    .highlight {
      color: #2563eb;
      font-weight: 500;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin-top: 20px;
      text-align: center;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    .button:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="email-wrapper">
      <div class="header">
        <div class="logo">JetPack Hungary</div>
        <div class="subtitle">Műanyag rekeszek és ládák</div>
      </div>
      <div class="content">
        ${content}
        <div class="contact-info">
          📍 6787 Zákányszék, Külterület 419.<br>
          📞 +36 70 422 5834<br>
          ✉️ muanyagrekesz@gmail.com
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} JetPack Hungary - Minden jog fenntartva<br>
          <small>Ez egy automatikusan generált üzenet, kérjük ne válaszoljon rá.</small>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, product, quantity, formType, very_secret } = body;

    if (very_secret && very_secret.trim() !== '') {
      console.warn('Honeypot triggered, possible bot submission.');
      return NextResponse.json({ success: true });
    }

    console.log('Received form data:', body);

    let subject = formType === 'quote' 
      ? `Árajánlatkérés - ${product}`
      : 'Új kapcsolatfelvételi kérés';

    let emailContent = formType === 'quote'
      ? `
        <h2 style="color: #2563eb; margin-bottom: 25px; font-size: 24px; text-align: center;">📦 Új árajánlatkérés érkezett 📦</h2>
        <div style="text-align: center; color: #4b5563; margin-bottom: 30px; font-size: 16px;">
          Az alábbi ügyfél árajánlatot kér termékeinkre. Kérjük, mielőbb vegye fel vele a kapcsolatot!
        </div>
        <div class="field">
          <div class="label">Ügyfél neve</div>
          <div class="value">${name}</div>
        </div>
        <div class="field">
          <div class="label">Email címe</div>
          <div class="value">${email}</div>
        </div>
        <div class="field">
          <div class="label">Telefonszáma</div>
          <div class="value">${phone}</div>
        </div>
        <div class="field">
          <div class="label">Igényelt termék</div>
          <div class="value">${product === 'M30 rekesz' ? 'M30 rekesz (600 x 400 x 300 mm)' :
                              product === 'M5 rekesz' ? 'M5 rekesz (600 x 400 x 100 mm)' :
                              product === 'Export egyutas rekesz' ? 'Export egyutas rekesz (400 x 300 x 150 mm)' :
                              product === 'M10 rekesz' ? 'M10 rekesz (600 x 400 x 150 mm)' :
                              product === 'Műanyag konténer perforált JET785E' ? 'Műanyag konténer perforált JET785E (1000 x 1200 x 785 mm)' :
                              product === 'Műanyag konténer perforált JET580' ? 'Műanyag konténer perforált JET580 (1000 x 1200 x 580 mm)' :
                              product === 'Műanyag konténer zárt JET785Z' ? 'Műanyag konténer zárt JET785Z (1000 x 1200 x 785 mm)' :
                              product}</div>
        </div>
        <div class="field">
          <div class="label">Igényelt mennyiség</div>
          <div class="value"><span class="highlight">${quantity} db</span></div>
        </div>
        <div class="field">
          <div class="label">Ügyféltől érkezett megjegyzés</div>
          <div class="message-box">${message}</div>
        </div>
        <div style="text-align: center;">
          <a href="mailto:${email}" class="button" style="color: white !important;">Kapcsolatfelvétel az ügyféllel</a>
        </div>
      `
      : `
        <h2 style="color: #2563eb; margin-bottom: 25px; font-size: 24px; text-align: center;">📬 Új kapcsolatfelvételi igény érkezett 📬</h2>
        <div style="text-align: center; color: #4b5563; margin-bottom: 30px; font-size: 16px;">
          Az alábbi ügyfél kapcsolatba szeretne lépni velünk. Kérjük, mielőbb vegye fel vele a kapcsolatot!
        </div>
        <div class="field">
          <div class="label">Ügyfél neve</div>
          <div class="value">${name}</div>
        </div>
        <div class="field">
          <div class="label">Email címe</div>
          <div class="value">${email}</div>
        </div>
        <div class="field">
          <div class="label">Telefonszáma</div>
          <div class="value">${phone}</div>
        </div>
        <div class="field">
          <div class="label">Ügyféltől érkezett üzenet</div>
          <div class="message-box">${message}</div>
        </div>
        <div style="text-align: center;">
          <a href="mailto:${email}" class="button" style="color: white !important;">Kapcsolatfelvétel az ügyféllel</a>
        </div>
      `;

    console.log('Attempting to send email with config:', {
      from: 'JetPack Hungary <post@jet-pack.hu>',
      to: 'muanyagrekesz@gmail.com',
      replyTo: email,
      subject,
      html: emailTemplate(emailContent),
    });

    const mailOptions = {
      from: 'JetPack Hungary <post@jet-pack.hu>',
      to: 'muanyagrekesz@gmail.com',
      replyTo: email,
      subject: subject,
      html: emailTemplate(emailContent),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
    return NextResponse.json({ success: true, info });
  } catch (error: any) {
    console.error('Detailed email sending error:', {
      message: error.message,
      name: error.name,
      code: error.code,
    });
    
    return NextResponse.json({ 
      error: 'Hiba történt az email küldése során',
      details: error.message,
      code: error.code
    }, { status: 500 });
  }
} 