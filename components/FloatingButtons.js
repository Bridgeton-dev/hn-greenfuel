"use client";
import Link from "next/link";
import { BRAND, waLink } from "../lib/brand";

export default function FloatingButtons() {
  const hasPhoneHref = Boolean(BRAND.phoneHref);

  return (
    <div className="fab-wrap" aria-label="Quick contact actions">
      <a
        href={waLink(`Hello ${BRAND.name}, I'd like to enquire about biomass briquettes & pellets.`)}
        className="fab fab-wa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp us"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.1.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2c-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.3.1-.4l.4-.5c.1-.1.2-.2.3-.4s.1-.3 0-.4c-.1-.1-.5-1.2-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.3c.1.2 1.7 2.6 4.1 3.6.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.2-.3-.2-.5-.3Z" />
        </svg>
      </a>
      {hasPhoneHref ? (
        <a href={BRAND.phoneHref} className="fab fab-call" aria-label={`Call ${BRAND.phone}`} title={`Call ${BRAND.phone}`}>
          <PhoneIcon />
        </a>
      ) : (
        <Link href="/contact" className="fab fab-call" aria-label="Request a call back" title="Contact / Request callback">
          <PhoneIcon />
        </Link>
      )}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
