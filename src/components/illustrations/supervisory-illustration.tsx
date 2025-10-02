import type { SVGProps } from 'react';

const SupervisoryIllustration = (props: SVGProps<SVGSVGElement>) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="22" cy="24" r="6" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary) / 0.2)"/>
        <path d="M22 30V40" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 50L22 40L28 50" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 42H30" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>

        <circle cx="42" cy="24" r="5" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary) / 0.1)"/>
        <path d="M42 29V37" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 45L42 37L46 45" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>

        <path d="M12 12L52 12L52 52L12 52L12 12Z" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 2" fill="none"/>
    </svg>
);

export default SupervisoryIllustration;
