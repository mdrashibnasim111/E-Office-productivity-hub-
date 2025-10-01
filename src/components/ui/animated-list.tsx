'use client';

import React, { useState, useEffect, useRef } from 'react';
import './animated-list.css';

interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onItemSelect?: (item: T, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  displayScrollbar?: boolean;
  className?: string;
}

export default function AnimatedList<T>({
  items,
  renderItem,
  onItemSelect,
  showGradients = false,
  enableArrowNavigation = false,
  displayScrollbar = false,
  className = '',
}: AnimatedListProps<T>) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!enableArrowNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => {
          const newIndex = Math.min(prev + 1, items.length - 1);
          scrollToItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => {
          const newIndex = Math.max(prev - 1, 0);
          scrollToItem(newIndex);
          return newIndex;
        });
      } else if (e.key === 'Enter' && activeIndex !== -1) {
        onItemSelect?.(items[activeIndex], activeIndex);
      }
    };

    const scrollToItem = (index: number) => {
      const itemElement = listRef.current?.children[index] as HTMLElement;
      if (itemElement) {
        itemElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [items, activeIndex, enableArrowNavigation, onItemSelect]);

  const scrollbarClass = displayScrollbar ? '' : 'no-scrollbar';

  return (
    <div className={`animated-list-container ${scrollbarClass} ${className}`}>
      {showGradients && <div className="top-gradient" />}
      <ul ref={listRef} className="animated-list">
        {items.map((item, index) => (
          <li
            key={index}
            className={`list-item ${index === activeIndex ? 'active' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => onItemSelect?.(item, index)}
            onMouseEnter={() => enableArrowNavigation && setActiveIndex(index)}
          >
            {renderItem(item, index)}
          </li>
        ))}
      </ul>
      {showGradients && <div className="bottom-gradient" />}
    </div>
  );
}
