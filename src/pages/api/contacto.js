// src/pages/api/contacto.js
export const prerender = false;

import { Resend } from "resend";
import { RESEND_API_KEY } from "astro:env/server"; // 👈 viene tipado desde el schema

const resend = new Resend(RESEND_API_KEY);

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { nombre, email, tipo, mensaje } = body;

    // console.log("[CONTACTO] Datos recibidos:", body);

    const { data, error } = await resend.emails.send({
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
      // console.error("[CONTACTO] Error Resend:", error);
      return new Response(
        JSON.stringify({ success: false, source: "resend", error }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // console.log("[CONTACTO] Email enviado:", data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // console.error("[CONTACTO] Error servidor:", err);
    return new Response(
      JSON.stringify({
        success: false,
        source: "handler",
        message: err?.message ?? "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
