import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, product, quantity, formType } = body;

    console.log('Received form data:', body);

    let subject = formType === 'quote' 
      ? `Árajánlatkérés - ${product}`
      : 'Új kapcsolatfelvételi kérés';

    let emailContent = formType === 'quote'
      ? `
        <h2>Árajánlatkérés</h2>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Termék:</strong> ${product}</p>
        <p><strong>Mennyiség:</strong> ${quantity}</p>
        <p><strong>Megjegyzés:</strong></p>
        <p>${message}</p>
      `
      : `
        <h2>Új kapcsolatfelvételi kérés</h2>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Üzenet:</strong></p>
        <p>${message}</p>
      `;

    console.log('Attempting to send email with config:', {
      from: 'JetPack <onboarding@resend.dev>',
      to: ['danielszerencses.private@gmail.com'],
      subject,
      html: emailContent,
    });

    const data = await resend.emails.send({
      from: 'JetPack <onboarding@resend.dev>',
      to: ['danielszerencses.private@gmail.com'],
      replyTo: email,
      subject: subject,
      html: emailContent,
    });

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Detailed email sending error:', {
      message: error.message,
      name: error.name,
      code: error.code,
      response: error.response,
    });
    
    return NextResponse.json({ 
      error: 'Hiba történt az email küldése során',
      details: error.message,
      code: error.code
    }, { status: 500 });
  }
} 