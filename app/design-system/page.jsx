import DesignSystemCatalog, { DesignSystemPreview } from './DesignSystemCatalog';

export default async function DesignSystemPage({ searchParams }) {
  const params = await searchParams;
  const locale = params.lang === 'en' ? 'en' : 'ru';
  return params.preview === '1' ? <DesignSystemPreview locale={locale} /> : <DesignSystemCatalog initialLocale={locale} />;
}
