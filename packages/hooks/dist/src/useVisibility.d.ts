/// <reference types="react" />
/**
 * Check if an element is in viewport
 * @param {number} offset - Number of pixels up to the observable element from the top
 */
export default function useVisibility<T extends HTMLElement>(offset?: number): [boolean, React.RefObject<T>];
export declare function useVisibilityOnce<T extends HTMLElement>(offset?: number): [boolean, React.RefObject<T>];
//# sourceMappingURL=useVisibility.d.ts.map