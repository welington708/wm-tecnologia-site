type BrandConfig = {
  brandName: string;
  consultantName: string | null;
  siteUrl: string | null;
  contactEmail: string | null;
  contactFormEndpoint: string | null;
  showPublicPrices: boolean;
  releaseScope: 'landing-contact-form-v2';
};

export const brandConfig: BrandConfig = {
  brandName: 'WM Tecnologia',
  consultantName: null,
  siteUrl: null,
  contactEmail: null,
  // Use um endpoint HTTPS verificado de Formspree, Web3Forms ou serviço equivalente.
  // Nunca coloque senha, token secreto ou credencial privada no frontend.
  contactFormEndpoint: null,
  showPublicPrices: false,
  releaseScope: 'landing-contact-form-v2',
};
