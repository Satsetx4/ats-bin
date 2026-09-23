import React, { useMemo } from 'react';

const allowedTags = new Set([
  'div', 'p', 'h5', 'ul', 'ol', 'li', 'span', 'strong', 'em', 'br',
]);
const blockedTags = new Set(['script', 'style', 'iframe', 'object', 'embed', 'svg', 'math']);

function renderNode(node: Node, key: string): React.ReactNode {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const element = node as HTMLElement;
  const tag = element.tagName.toLowerCase();
  if (blockedTags.has(tag)) return null;

  const children = Array.from(element.childNodes).map((child, index) => renderNode(child, `${key}-${index}`));
  if (!allowedTags.has(tag)) {
    return <React.Fragment key={key}>{children}</React.Fragment>;
  }

  const className = element.getAttribute('class') ?? undefined;
  return React.createElement(tag, { key, className }, ...children);
}

/** Render the app's static learning markup using a small element and attribute allowlist. */
export const RichText: React.FC<{ markup: string }> = ({ markup }) => {
  const content = useMemo(() => {
    const parsed = new DOMParser().parseFromString(markup, 'text/html');
    return Array.from(parsed.body.childNodes).map((node, index) => renderNode(node, String(index)));
  }, [markup]);

  return <>{content}</>;
};
