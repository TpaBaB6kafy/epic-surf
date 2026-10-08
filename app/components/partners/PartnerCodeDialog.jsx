"use client";

import { useRef, useState } from 'react';
import { Action, Dialog, Field, FormStatus } from '../design-system';
import { getStoredAttribution, trackEvent } from '../../utils/tracking';

const copy = {
  ru: { title: 'Получить партнёрский код', description: 'Оставьте email. Команда Epic Surf свяжется с вами и пришлёт партнёрский код на этот адрес.', email: 'Ваш email', submit: 'Запросить код', sending: 'Отправляем…', close: 'Закрыть форму', invalid: 'Проверьте email — например, name@example.com.', error: 'Не удалось отправить заявку. Попробуйте ещё раз или обсудите партнёрство в мессенджере.', limited: 'Слишком много попыток. Попробуйте немного позже.', success: 'Заявка отправлена. Команда Epic Surf пришлёт партнёрский код на указанный email.', done: 'Готово', contact: 'Обсудить партнёрство' },
  en: { title: 'Get your partner code', description: 'Leave your email. The Epic Surf team will contact you and send your partner code to this address.', email: 'Your email', submit: 'Request code', sending: 'Sending…', close: 'Close form', invalid: 'Check your email — for example, name@example.com.', error: 'We could not send your request. Try again or discuss your partnership in the messenger.', limited: 'Too many attempts. Please try again later.', success: 'Request sent. The Epic Surf team will send your partner code to the email you provided.', done: 'Done', contact: 'Discuss partnership' },
};

export default function PartnerCodeDialog({ open, onClose, locale, contact }) {
  const t = copy[locale];
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [emailError, setEmailError] = useState('');
  const pending = useRef(false);
  const submit = async event => {
    event.preventDefault();
    if (pending.current || state === 'success') return;
    const value = email.trim();
    const input = event.currentTarget.elements.email;
    if (!value || !input.validity.valid) { setEmailError(t.invalid); input.focus(); return; }
    setEmailError(''); pending.current = true; setState('sending');
    const website = event.currentTarget.elements.website.value;
    try {
      const response = await fetch('/api/partner-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: value, language: locale, website, attribution: getStoredAttribution() }), signal: AbortSignal.timeout(15000) });
      const result = await response.json();
      if (!response.ok || result.ok !== true) { setState(response.status === 429 ? 'limited' : 'error'); return; }
      setState('success');
      // Keep personal data out of analytics. The server sends the email only to the bot.
      trackEvent('partner_code_request', { language: locale, service_type: 'partnership', cta_location: 'partners_page', cta_label: 'email_request' });
    } catch { setState('error'); } finally { pending.current = false; }
  };
  return <Dialog open={open} onClose={onClose} title={t.title} closeLabel={t.close} className="partner-code-dialog">
    {state === 'success' ? <><FormStatus kind="success">{t.success}</FormStatus><Action onClick={onClose}>{t.done}</Action></> : <>
      <p>{t.description}</p>
      <form onSubmit={submit} noValidate aria-busy={state === 'sending'}>
        <Field label={t.email} name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} required data-autofocus value={email} error={emailError} disabled={state === 'sending'} onChange={event => { setEmail(event.target.value); if (emailError) setEmailError(''); }} />
        <div hidden aria-hidden="true"><label htmlFor="partner-website">Website</label><input id="partner-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        {(state === 'error' || state === 'limited') && <FormStatus kind="error">{state === 'limited' ? t.limited : t.error}</FormStatus>}
        <Action type="submit" loading={state === 'sending'}>{state === 'sending' ? t.sending : t.submit}</Action>
        {state === 'error' && <a className="partner-form-contact" href={contact.href} target="_blank" rel="noopener noreferrer" onClick={event => { event.currentTarget.href = contact.buildHref(); trackEvent(contact.eventName, { language: locale, service_type: 'partnership', cta_location: 'partner_code_form', cta_label: 'discuss_partnership' }); }}>{t.contact}</a>}
      </form>
    </>}
  </Dialog>;
}
