import type { SVGProps } from 'react';

const ManagerialIllustration = (props: SVGProps<SVGSVGElement>) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="8" y="18" width="48" height="34" rx="4" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--primary) / 0.1)"/>
        <path d="M24 18V12C24 10.8954 24.8954 10 26 10H38C39.1046 10 40 10.8954 40 12V18" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 30L36 38" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <path d="M36 30L28 38" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="34" r="10" stroke="hsl(var(--primary))" strokeWidth="2" fill="none"/>
    </svg>
);

export default ManagerialIllustration;
