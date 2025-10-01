'use client';
// Component inspired by @BalintFerenczy on X: https://codepen.io/BalintFerenczy/pen/KwdoyEN
import React, { useRef, useMemo, useEffect, ReactNode, useState } from 'react';

type ElectricBorderProps = {
  children: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  style?: React.CSSProperties;
  className?: string;
};

const map = (
  value: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
): number => {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export function ElectricBorder({
  children,
  color = '#7df9ff',
  speed = 1,
  chaos = 0.5,
  thickness = 2,
  style = {},
  className = '',
}: ElectricBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const uniqueId = useMemo(() => `electric-border-${Math.random().toString(36).substr(2, 9)}`, []);

  const chaosValue = useMemo(() => Math.max(0.1, Math.min(1, chaos)), [chaos]);
  const speedValue = useMemo(() => map(speed, 0, 1, 3, 0.5), [speed]);
  const thicknessValue = useMemo(() => map(thickness, 1, 5, 0.005, 0.02), [thickness]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const path = container.querySelector('path');
    const svg = container.querySelector('svg');
    if (!path || !svg) return;

    const updatePath = () => {
      if (!container || !path) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const points = [
        [thicknessValue * width, thicknessValue * height],
        [width - thicknessValue * width, thicknessValue * height],
        [width - thicknessValue * width, height - thicknessValue * height],
        [thicknessValue * width, height - thicknessValue * height],
      ];

      const chaoticPoints = points.map((p) => [
        p[0] + (Math.random() - 0.5) * chaosValue * width * 0.1,
        p[1] + (Math.random() - 0.5) * chaosValue * height * 0.1,
      ]);

      path.setAttribute(
        'd',
        `M ${chaoticPoints[0][0]},${chaoticPoints[0][1]} 
         L ${chaoticPoints[1][0]},${chaoticPoints[1][1]} 
         L ${chaoticPoints[2][0]},${chaoticPoints[2][1]} 
         L ${chaoticPoints[3][0]},${chaoticPoints[3][1]} Z`
      );
      const length = path.getTotalLength();
      setPathLength(length);
      path.style.strokeDasharray = `${length}`;
    };

    updatePath();

    const resizeObserver = new ResizeObserver(() => updatePath());
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [chaosValue, thicknessValue]);

  const borderStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    ...style,
  };

  const svgStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };

  const pathStyle: React.CSSProperties = {
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    animation: `draw ${speedValue}s linear infinite`,
  };

  const keyframes = `
    @keyframes draw {
      to {
        stroke-dashoffset: -${pathLength * 2};
      }
    }
  `;

  return (
    <div ref={containerRef} style={borderStyle} className={className}>
      {pathLength > 0 && <style>{keyframes}</style>}
      <svg style={svgStyle}>
        <filter id={uniqueId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={chaosValue}
            numOctaves="1"
            result="warp"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale={chaosValue * 30}
            in="SourceGraphic"
            in2="warp"
          />
        </filter>
        <path filter={`url(#${uniqueId})`} style={pathStyle}></path>
      </svg>
      {children}
    </div>
  );
}
