type BrandConfig = {
  brandName: string;
  consultantName: string | null;
  siteUrl: string | null;
  whatsappNumber: string | null;
  contactEmail: string | null;
  showPublicPrices: boolean;
  releaseScope: 'landing-whatsapp-v1';
};

export const brandConfig: BrandConfig = {
  brandName: 'WM Tecnologia',
  consultantName: null,
  siteUrl: null,
  whatsappNumber: null,
  contactEmail: null,
  showPublicPrices: false,
  releaseScope: 'landing-whatsapp-v1',
};

export const whatsappMessage =
  'Olá! Vim pelo site da WM Tecnologia e gostaria de conversar sobre uma demanda de Salesforce.';
