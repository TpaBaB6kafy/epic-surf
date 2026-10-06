"use client";

import { useEffect, useId, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { cx, IconControl, SectionHeading } from './primitives';

export function FAQItem({ question, children, open: controlledOpen, onOpenChange, defaultOpen = false }) {
  const id = useId();
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? localOpen;
  const toggle = () => { if (controlledOpen === undefined) setLocalOpen(!open); onOpenChange?.(!open); };
  return <div className="ds-faq-item">
    <button type="button" id={`${id}-question`} aria-expanded={open} aria-controls={`${id}-answer`} onClick={toggle}><span>{question}</span><span className="ds-faq-symbol" aria-hidden="true"><Plus /></span></button>
    <div id={`${id}-answer`} role="region" aria-labelledby={`${id}-question`} hidden={!open} className="ds-faq-answer">{children}</div>
  </div>;
}
export function FAQList({ items }) {
  const [active, setActive] = useState(null);
  return <div className="ds-faq-list">{items.map((item, index) => <FAQItem key={item.id || item.q} question={item.q} open={active === index} onOpenChange={open => setActive(open ? index : null)}><p>{item.a}</p></FAQItem>)}</div>;
}

export function Field({ label, help, error, as: Tag = 'input', className, id: suppliedId, ...props }) {
  const generatedId = useId(), id = suppliedId || generatedId;
  const descriptions = [help && `${id}-help`, error && `${id}-error`, props['aria-describedby']].filter(Boolean).join(' ');
  return <div className={cx('ds-field', className)}>
    <label htmlFor={id}>{label}{props.required && <span aria-hidden="true"> *</span>}</label>
    <Tag {...props} id={id} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={descriptions || undefined} />
    {help && <p id={`${id}-help`} className="ds-field-help">{help}</p>}
    {error && <p id={`${id}-error`} className="ds-field-error">{error}</p>}
  </div>;
}
export function FormStatus({ children, kind = 'info', className }) {
  return <p className={cx('ds-form-status', `ds-status-${kind}`, className)} role={kind === 'error' ? 'alert' : 'status'}>{children}</p>;
}

export function Dialog({ open, onClose, title, children, closeLabel = 'Close dialog', className }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.querySelector('[data-autofocus]')?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [open]);
  return <dialog ref={dialogRef} className={cx('ds-dialog', className)} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) { const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose(); } }} onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const targets = [...event.currentTarget.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')].filter(node => node.getClientRects().length);
    const first = targets[0], last = targets.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }}>
    <header className="ds-dialog-header"><SectionHeading as="h2" recipe="utility" align="left" id={titleId}>{title}</SectionHeading><IconControl label={closeLabel} tone="paper" size="small" onClick={onClose} /></header>
    <div className="ds-dialog-body">{children}</div>
  </dialog>;
}
