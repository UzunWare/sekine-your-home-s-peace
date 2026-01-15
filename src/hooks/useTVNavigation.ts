import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseTVNavigationOptions {
  onBack?: () => void;
  onSelect?: () => void;
  onPlayPause?: () => void;
  preventBackNavigation?: boolean;
}

export function useTVNavigation(options: UseTVNavigationOptions = {}) {
  const navigate = useNavigate();
  const { onBack, onSelect, onPlayPause, preventBackNavigation } = options;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Backspace':
        case 'Escape':
          if (!preventBackNavigation) {
            e.preventDefault();
            if (onBack) {
              onBack();
            } else {
              navigate(-1);
            }
          }
          break;
        case 'Enter':
        case ' ':
          if (onSelect) {
            onSelect();
          }
          break;
        case 'MediaPlayPause':
        case 'p':
          if (onPlayPause) {
            e.preventDefault();
            onPlayPause();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, onBack, onSelect, onPlayPause, preventBackNavigation]);
}

// Hook for managing focusable elements
export function useFocusManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const focusedIndexRef = useRef(0);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        '[data-focusable="true"]:not([disabled])'
      )
    );
  }, []);

  const focusElement = useCallback((index: number) => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;
    
    const clampedIndex = Math.max(0, Math.min(index, elements.length - 1));
    focusedIndexRef.current = clampedIndex;
    elements[clampedIndex]?.focus();
  }, [getFocusableElements]);

  const moveFocus = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;

    let newIndex = focusedIndexRef.current;
    
    switch (direction) {
      case 'up':
      case 'left':
        newIndex = Math.max(0, newIndex - 1);
        break;
      case 'down':
      case 'right':
        newIndex = Math.min(elements.length - 1, newIndex + 1);
        break;
    }

    focusElement(newIndex);
  }, [getFocusableElements, focusElement]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          moveFocus('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveFocus('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          moveFocus('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveFocus('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveFocus]);

  // Focus first element on mount
  useEffect(() => {
    const timer = setTimeout(() => focusElement(0), 100);
    return () => clearTimeout(timer);
  }, [focusElement]);

  return { containerRef, focusElement, moveFocus };
}
