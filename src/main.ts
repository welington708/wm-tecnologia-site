import './styles.css';
import { brandConfig } from './config/brand';

const contactForm = document.querySelector<HTMLFormElement>('[data-contact-form]');
const formStatus = document.querySelector<HTMLElement>('[data-form-status]');
const formPending = document.querySelector<HTMLElement>('[data-form-pending]');
const submitButton = contactForm?.querySelector<HTMLButtonElement>('button[type="submit"]');
const endpoint = brandConfig.contactFormEndpoint;

function setFormStatus(message: string, state: 'idle' | 'loading' | 'success' | 'error'): void {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.dataset.state = state;
}

if (contactForm && submitButton) {
  if (!endpoint) {
    submitButton.disabled = true;
    submitButton.title = 'O canal de recebimento ainda não foi configurado.';
    setFormStatus('Envio desativado nesta prévia.', 'idle');
  } else {
    formPending?.remove();
    contactForm.action = endpoint;

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      if (String(formData.get('website') ?? '').trim()) {
        contactForm.reset();
        setFormStatus('Mensagem recebida.', 'success');
        return;
      }

      submitButton.disabled = true;
      submitButton.dataset.label = submitButton.textContent ?? 'Enviar solicitação';
      submitButton.textContent = 'Enviando…';
      contactForm.setAttribute('aria-busy', 'true');
      setFormStatus('Enviando sua solicitação com segurança…', 'loading');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });

        if (!response.ok) throw new Error(`Falha no envio: ${response.status}`);

        contactForm.reset();
        setFormStatus(
          'Solicitação enviada. Obrigado! O retorno será feito pelos dados informados.',
          'success',
        );
      } catch {
        setFormStatus(
          'Não foi possível enviar agora. Revise sua conexão e tente novamente em alguns instantes.',
          'error',
        );
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.label ?? 'Enviar solicitação';
        contactForm.removeAttribute('aria-busy');
      }
    });
  }
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
