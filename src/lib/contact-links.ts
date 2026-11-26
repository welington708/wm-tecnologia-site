export function buildWhatsAppLink(number: string, message: string): string {
  const normalized = number.replace(/\D/g, '');
  if (!normalized) throw new Error('Informe um número de WhatsApp real.');
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoLink(email: string): string {
  return `mailto:${email}`;
}
