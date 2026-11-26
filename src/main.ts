import './styles.css';
import { brandConfig, whatsappMessage } from './config/brand';
import { buildMailtoLink, buildWhatsAppLink } from './lib/contact-links';

const contactStatus = document.querySelector<HTMLElement>('[data-contact-status]');
const whatsappTargets = document.querySelectorAll<HTMLAnchorElement>('[data-whatsapp]');
const emailTargets = document.querySelectorAll<HTMLElement>('[data-email-wrap]');

if (brandConfig.whatsappNumber) {
  const href = buildWhatsAppLink(brandConfig.whatsappNumber, whatsappMessage);
  whatsappTargets.forEach((target) => {
    target.href = href;
    target.target = '_blank';
    target.rel = 'noreferrer';
  });
  contactStatus?.remove();
} else {
  whatsappTargets.forEach((target) => {
    target.removeAttribute('href');
    target.setAttribute('aria-disabled', 'true');
    target.addEventListener('click', (event) => event.preventDefault());
  });
}

const contactEmail = brandConfig.contactEmail;
if (contactEmail) {
  emailTargets.forEach((wrap) => {
    wrap.hidden = false;
    const link = wrap.querySelector<HTMLAnchorElement>('[data-email]');
    const copy = wrap.querySelector<HTMLButtonElement>('[data-copy-email]');
    if (link) {
      link.href = buildMailtoLink(contactEmail);
      link.textContent = contactEmail;
    }
    copy?.addEventListener('click', async () => {
      await navigator.clipboard.writeText(contactEmail);
      copy.textContent = 'E-mail copiado';
    });
  });
}

const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const siteNav = document.querySelector<HTMLElement>('[data-site-nav]');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  siteNav?.toggleAttribute('data-open', !open);
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    siteNav.removeAttribute('data-open');
  });
});

document.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll<HTMLDetailsElement>('.faq-item[open]').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

document.querySelectorAll<HTMLElement>('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
