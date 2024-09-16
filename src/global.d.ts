import 'react';
import { AriaAttributes, DOMAttributes } from 'react';

declare module 'react' {
  interface PointerEvent<T> {
    pointerId: number;
    pointerType: string;
  }

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    onPointerEnterCapture?: (e: PointerEvent<T>) => void;
    onPointerLeaveCapture?: (e: PointerEvent<T>) => void;
  }

  interface RefAttributes<T> {
    onPointerEnterCapture?: (e: PointerEvent<T>) => void;
    onPointerLeaveCapture?: (e: PointerEvent<T>) => void;
  }
}
