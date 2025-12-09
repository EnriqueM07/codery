// src/pages/api/contacto.js
export const prerender = false; // necesario para permitir POST en Astro (output: "static")

import { Resend } from "resend";

const apiKey = import.meta.env.RESEND_API_KEY;
const resend = new Resend(apiKey);

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { nombre, email, tipo, mensaje } = body;

    console.log("[CONTACTO] Datos recibidos:", body);

    const { data, error } = await resend.emails.send({
      // ✅ YA EN PRODUCCIÓN: usar tu dominio verificado
      from: "Codery.mx <no-reply@codery.mx>",
      to: ["info@codery.mx"],

      subject: "Nueva solicitud de cotización",
      html: `
        <h2>Nuevo contacto desde Codery.mx</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo de proyecto:</strong> ${tipo}</p>
        <p><strong>Mensaje:</strong><br/>${mensaje}</p>
      `,
    });

    if (error) {
      console.error("[CONTACTO] Error Resend:", error);

      return new Response(
        JSON.stringify({
          success: false,
          source: "resend",
          error,
        }),
        { status: 500 }
      );
    }

    console.log("[CONTACTO] Email enviado:", data);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("[CONTACTO] Error servidor:", err);

    return new Response(
      JSON.stringify({
        success: false,
        source: "handler",
        message: err?.message ?? "Unknown error",
      }),
      { status: 500 }
    );
  }
}
