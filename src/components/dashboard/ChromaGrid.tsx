'use client';
import { useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Item {
  image: string;
  title: string;
  subtitle: string;
  handle: string;
  borderColor: string;
  gradient: string;
  url: string;
}

interface ChromaGridProps {
  items: Item[];
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

const ChromaGrid = ({ items, radius = 200, damping = 0.3, fadeOut = 0.5 }: ChromaGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={gridRef} className="relative w-full h-full">
      {items.map((item, i) => (
        <GridItem
          key={i}
          containerRef={gridRef}
          item={item}
          radius={radius}
          damping={damping}
          fadeOut={fadeOut}
        />
      ))}
    </div>
  );
};

const GridItem = ({ containerRef, item, radius, damping, fadeOut }: { containerRef: React.RefObject<HTMLDivElement>, item: Item, radius: number, damping: number, fadeOut: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const itemRect = (e.target as HTMLElement).getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2 - rect.left;
      const itemCenterY = itemRect.top + itemRect.height / 2 - rect.top;
      
      const dx = mouseX - itemCenterX;
      const dy = mouseY - itemCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius) {
        const force = (1 - distance / radius) * -radius * damping;
        const angle = Math.atan2(dy, dx);
        x.set(force * Math.cos(angle));
        y.set(force * Math.sin(angle));
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    }
    
    const currentContainer = containerRef.current
    currentContainer?.addEventListener('mousemove', handleMouseMove);
    currentContainer?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      currentContainer?.removeEventListener('mousemove', handleMouseMove);
      currentContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, radius, damping, x, y]);

  const opacity = useTransform(
    [springX, springY],
    ([newX, newY]) => {
      const distance = Math.sqrt(newX * newX + newY * newY);
      return Math.max(0, 1 - (distance / (radius * fadeOut)));
    }
  );

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        position: 'absolute',
        left: `${Math.random() * 80}%`,
        top: `${Math.random() * 80}%`,
      }}
      animate={controls}
    >
      <motion.a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        style={{ opacity }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <div 
          className="relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden border-2" 
          style={{ 
            borderColor: item.borderColor,
            background: item.gradient
          }}
        >
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <p className="text-xs font-bold">{item.title}</p>
            <p className="text-[10px]">{item.subtitle}</p>
            <p className="text-[9px] text-gray-300">{item.handle}</p>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default ChromaGrid;
