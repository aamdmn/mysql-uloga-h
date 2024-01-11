import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  email: string;
  phone: string;
  message: string;
  person: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  email,
  phone,
  message,
  person,
}) => (
  <div>
    <h1 className="">Ahoj, {firstName}!</h1>
    <p>tvoj email: {email}</p>
    <p>Tel. cislo: {phone}</p>
    <p>Sprava: {message}</p>
    <p>Si clovek?: {person}</p>
  </div>
);
