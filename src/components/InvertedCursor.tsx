import { useEffect } from 'react';

const InvertedCursor = () => {
  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const cursor = document.createElement('div');
    cursor.className = 'inverted-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    const hide = () => {
      cursor.style.opacity = '0';
      document.documentElement.classList.remove('custom-cursor-active', 'custom-cursor-pointer');
      cursor.classList.remove('is-interactive');
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== 'mouse') {
        hide();
        return;
      }
      // Native dialogs occupy the top layer, so render the cursor inside them.
      const target = event.target instanceof Element ? event.target : null;
      const container = target?.closest('dialog[open]') ?? document.body;
      if (cursor.parentElement !== container) container.appendChild(cursor);
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      const control = target?.closest('a[href], button, [role="button"], [role="link"], input[type="button"], input[type="submit"], input[type="reset"], summary');
      const interactive = !!control && !control.matches(':disabled, [aria-disabled="true"]');
      cursor.classList.toggle('is-interactive', interactive);
      document.documentElement.classList.toggle('custom-cursor-pointer', interactive);
      cursor.style.opacity = interactive ? '0' : '1';
      document.documentElement.classList.add('custom-cursor-active');
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    pointer.addEventListener('change', hide);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      pointer.removeEventListener('change', hide);
      cursor.remove();
      document.documentElement.classList.remove('custom-cursor-active', 'custom-cursor-pointer');
      cursor.classList.remove('is-interactive');
    };
  }, []);
  return null;
};

export default InvertedCursor;
