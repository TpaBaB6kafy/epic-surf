import '../globals.css';

export const metadata = {
  title: 'EPIC — Design System',
  description: 'EPIC Surf visual foundations, reusable components and composition recipes.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};
export default function DesignSystemLayout({ children }) {
  return <html lang="ru"><body>{children}</body></html>;
}
