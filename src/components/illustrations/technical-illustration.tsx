import type { SVGProps } from 'react';

const TechnicalIllustration = (props: SVGProps<SVGSVGElement>) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="32" cy="32" r="22" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary) / 0.1)"/>
        <path d="M32 10V21" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 43V54" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M54 32H43" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M21 32H10" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M47.4142 16.5858L39.5355 24.4645" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24.4645 39.5355L16.5858 47.4142" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M47.4142 47.4142L39.5355 39.5355" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24.4645 24.4645L16.5858 16.5858" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="6" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary) / 0.3)"/>
    </svg>
);

export default TechnicalIllustration;
