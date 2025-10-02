import type { SVGProps } from 'react';

const LoginIllustration = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
    {...props}
  >
    <rect width="500" height="500" fill="#0F1822"/>
    <g transform="translate(100 100)">
      <path d="M150 300L75 250L150 200L225 250Z" fill="#182531" stroke="hsl(var(--primary))" strokeWidth="4"/>
      <path d="M75 250L0 200L75 150L150 200Z" fill="#182531" stroke="hsl(var(--primary))" strokeWidth="4"/>
      <path d="M150 200L75 150L150 100L225 150Z" fill="#182531" stroke="hsl(var(--primary))" strokeWidth="4"/>
      <path d="M225 250L150 200L225 150L300 200Z" fill="#182531" stroke="hsl(var(--primary))" strokeWidth="4"/>
      <path d="M150 200L150 100" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"/>
      <path d="M75 150L75 50" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="75" cy="40" r="10" fill="hsl(var(--primary))" />
      <path d="M225 150L225 50" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="225" cy="40" r="10" fill="hsl(var(--primary))" />
      <path d="M150 300L150 250" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"/>
      <rect x="135" y="235" width="30" height="30" rx="5" fill="hsl(var(--primary) / 0.5)" stroke="hsl(var(--primary))" strokeWidth="2"/>
       <path d="M142 250L158 250" stroke="hsl(var(--foreground))" strokeWidth="2" />
       <path d="M150 242L150 258" stroke="hsl(var(--foreground))" strokeWidth="2" />
    </g>
  </svg>
);

export default LoginIllustration;
