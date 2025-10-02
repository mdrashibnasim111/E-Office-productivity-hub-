import type { SVGProps } from 'react';

const ClericalIllustration = (props: SVGProps<SVGSVGElement>) => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="10" y="12" width="44" height="40" rx="4" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary) / 0.1)" />
    <path d="M18 20H46" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 28H46" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 36H34" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 44H40" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
    <path d="M26 4V12" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
    <path d="M38 4V12" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default ClericalIllustration;
