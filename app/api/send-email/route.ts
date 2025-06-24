import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validácia
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Všetky polia sú povinné' },
        { status: 400 }
      );
    }

    // Validácia emailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Neplatný email formát' },
        { status: 400 }
      );
    }

    // Odoslanie emailu
    const data = await resend.emails.send({
      from: 'Lemhauz <info@lemhauz.sk>',
      to: ['lukas.vilim@lemhauz.sk'],
      subject: `Nová správa od ${name}: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nová správa z kontaktného formulára</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Meno:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Predmet:</strong> ${subject}</p>
          </div>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #333; margin-top: 0;">Správa:</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json(
      { message: 'Email bol úspešne odoslaný', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Chyba pri odosielaní emailu:', error);
    return NextResponse.json(
      { error: 'Chyba pri odosielaní emailu' },
      { status: 500 }
    );
  }
} 