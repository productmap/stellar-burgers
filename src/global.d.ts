import 'react';
import { AriaAttributes } from 'react';

declare module 'react' {
  interface PointerEvent<T> {
    // Add properties of PointerEvent here
    pointerId: number;
    pointerType: string;
    // ...
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
