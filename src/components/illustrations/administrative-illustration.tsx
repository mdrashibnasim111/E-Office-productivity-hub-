import type { SVGProps } from 'react';

const AdministrativeIllustration = (props: SVGProps<SVGSVGElement>) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://wwwemns.org/2000/svg" {...props}>
        <path d="M12 52V20L32 8L52 20V52H12Z" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary) / 0.1)" strokeLinejoin="round"/>
        <rect x="24" y="36" width="16" height="16" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary) / 0.2)"/>
        <path d="M28 24h8" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 28h8" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export default AdministrativeIllustration;
