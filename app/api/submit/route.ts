import { config } from "@/app/config";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";

const transporter = nodemailer.createTransport({
  host: config.env.emailHost,
  port: 465,
  secure: true,
  auth: {
    user: config.env.emailUser,
    pass: config.env.emailPass,
  },
});

transporter.verify().catch((error) => {
  console.error("Error configuring email transporter:", error);
});

export async function POST(request: NextRequest) {
  try {
    const { typeOfUser, AP, Student, other, Query } = await request.json();

    const validUserTypes = ["Student", "AP", "other"];
    if (!validUserTypes.includes(typeOfUser)) {
      return new Response(JSON.stringify({ error: "Invalid user type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let userDetails;
    switch (typeOfUser) {
      case "Student":
        userDetails = {
          fullName: Student.fullName,
          email: Student.email,
          contactNumber: Student.contactNumber,
          accommodation: Student.accommodation,
          idNumber: Student.idNumber,
          institution: Student.institution,
          campus: Student.campus,
        };
        break;

      case "AP":
        userDetails = {
          fullName: AP.fullName,
          email: AP.email,
          contactNumber: AP.contactNumber,
          idNumber: AP.idNumber,
          propertyName: AP.propertyName,
        };
        break;

      case "other":
        userDetails = {
          fullName: other.fullName,
          email: other.email,
          idNumber: other.idNumber,
          contactNumber: other.contactNumber,
        };
        break;
    }

    if (!userDetails) {
      return new Response(JSON.stringify({ error: "User details missing" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const generateUserDetailsHTML = (details: any) => {
      let html = `
          <p><strong>Name:</strong> ${sanitizeHtml(details.fullName)}</p>
          <p><strong>Email:</strong> ${sanitizeHtml(details.email)}</p>
          <p><strong>ID Number:</strong> ${sanitizeHtml(details.idNumber)}</p>
          <p><strong>Contact Number:</strong> ${sanitizeHtml(
            details.contactNumber
          )}</p>
        `;

      if (typeOfUser === "Student") {
        html += `
            <p><strong>Accommodation:</strong> ${sanitizeHtml(
              details.accommodation
            )}</p>
            <p><strong>Institution:</strong> ${sanitizeHtml(
              details.institution
            )}</p>
            <p><strong>Campus:</strong> ${sanitizeHtml(details.campus)}</p>
          `;
      }

      if (typeOfUser === "AP") {
        html += `<p><strong>Property Name:</strong> ${sanitizeHtml(
          details.propertyName
        )}</p>`;
      }

      return html;
    };

    const emailHTMLContent = `
        <h1>Query from ${sanitizeHtml(typeOfUser)}</h1>
        ${generateUserDetailsHTML(userDetails)}
        <p><strong>Query:</strong> ${sanitizeHtml(Query.query)}</p>
        <p><strong>Description:</strong> ${sanitizeHtml(
          Query.describeQuery
        )}</p>
      `;

    const emailOptions = {
      from: config.env.emailUser,
      to: config.env.helpdeskEmail,
      subject: `New Query from a/an ${
        typeOfUser === "other" ? "Unknown user" : typeOfUser
      }`,
      html: emailHTMLContent,
    };

    await transporter.sendMail(emailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
