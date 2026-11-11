import React, { useState } from 'react';
import { Check, Clock, ShieldCheck, Signal, Wifi } from 'lucide-react';
import { M, kes, palette, providers, slots, takenSlots } from '../../data/meridian.js';
import { Avatar, Stars, Verified } from './MeridianReplica.jsx';

// Meridian's concept design system, laid out as a spec sheet in its own style.

function Label({ children }) {
    return <p className="mr-mono mb-3 text-[11px] tracking-[.2em] text-[#6B6A64]">{children}</p>;
}

function Block({ label, title, children, className = '' }) {
    return (
        <section className={`border-t border-[#E4DCCB] py-10 ${className}`}>
            <Label>{label}</Label>
            <h2 className="mr-display mb-6 text-[30px] font-semibold tracking-[-0.02em]">{title}</h2>
            {children}
        </section>
    );
}

function Card({ children, className = '' }) {
    return <div className={`rounded-3xl border border-[#E4DCCB] bg-[#FFFDF8] p-6 ${className}`}>{children}</div>;
}

function Spec({ children }) {
    return <p className="mr-mono mt-3 text-[10.5px] leading-relaxed text-[#6B6A64]">{children}</p>;
}

function Swatch({ c }) {
    const [copied, setCopied] = useState(false);
    const dark = ['ink', 'forest', 'muted', 'sun', 'mint'].includes(c.name);
    return (
        <button
            type="button"
            onClick={() => {
                navigator.clipboard?.writeText(c.hex).catch(() => {});
                setCopied(true);
                setTimeout(() => setCopied(false), 1100);
            }}
            aria-label={`Copy ${c.name} ${c.hex}`}
            className="group text-left"
        >
            <span className="flex h-[84px] items-end rounded-2xl border border-[#E4DCCB] p-2.5 transition-transform group-hover:-translate-y-0.5" style={{ background: c.hex }}>
                <span className={`mr-mono text-[10px] ${dark ? 'text-white/75' : 'text-black/55'}`}>{copied ? 'copied ✓' : 'copy'}</span>
            </span>
            <span className="mt-2 block text-[13px] font-semibold">{c.name}</span>
            <span className="mr-mono block text-[10.5px] text-[#6B6A64]">
                {c.hex} · {c.role}
            </span>
        </button>
    );
}

const PRINCIPLES = [
    ['Light on data', 'No photos in lists, maps drawn as vectors, initials instead of portraits. Screens should load on a slow 3G connection.'],
    ['Trust in every row', 'ID check, jobs done and reply time sit next to the name, so people never need to open a profile just to feel safe.'],
    ['Mobile money first', 'M-Pesa is the default way to pay, and the money is held until the customer says the job is done.'],
    ['Talk like a neighbour', 'Short, warm copy with a Swahili greeting. Prices always in KES, places named by estate, never coordinates.'],
];

function MiniPhone({ dark, title, children }) {
    return (
        <div className={`w-[200px] overflow-hidden rounded-[32px] border-[6px] border-[#16181D] ${dark ? 'bg-[#0E3B2E] text-white' : 'bg-[#F5EFE4]'}`}>
            <div className="flex justify-between px-5 pb-1 pt-2.5 text-[10px] font-semibold">
                9:41
                <span className="flex gap-1">
                    <Signal size={10} />
                    <Wifi size={10} />
                </span>
            </div>
            <div className="px-4 pb-5">
                <p className="mr-display mt-2 text-[17px] font-semibold">{title}</p>
                <span className="mt-2 block h-[2px] w-7 rounded-full bg-[#E8693A]" />
                {children}
            </div>
        </div>
    );
}

function MeridianDesign({ compact }) {
    const [slot, setSlot] = useState('14:00');
    const [chips, setChips] = useState(['Verified']);
    const p = providers[0];
    const cols = compact ? 'grid-cols-1' : 'grid-cols-2';

    return (
        <div className={`min-h-full bg-[#F5EFE4] text-[#16181D] ${compact ? 'px-5 py-10' : 'px-12 py-14'}`}>
            <header className="pb-10">
                <Label>MERIDIAN — DESIGN SYSTEM · CONCEPT</Label>
                <h1 className={`mr-display font-semibold leading-[1] tracking-[-0.03em] ${compact ? 'text-[42px]' : 'text-[68px]'}`}>
                    Find someone good,
                    <br />
                    <span className="italic text-[#0E3B2E]">close by.</span>
                </h1>
                <span className="mt-5 block h-[4px] w-16 rounded-full bg-[#E8693A]" />
                <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[#3B3D42]">
                    Meridian is a local-services marketplace starting in Nairobi. This is an original design direction, not a shipped product:
                    warm paper tones in place of tech-blue, a soft serif to make it feel friendly and human, and a single sunset-orange line, the
                    meridian, that marks what matters on each screen.
                </p>
            </header>

            <Block label="01 — PRINCIPLES" title="Principles.">
                <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-4'}`}>
                    {PRINCIPLES.map(([h, b], i) => (
                        <Card key={h} className="p-5">
                            <span className="mr-mono text-[11px] text-[#E8693A]">0{i + 1}</span>
                            <p className="mr-display mt-2 text-[18px] font-semibold leading-snug">{h}</p>
                            <p className="mt-2 text-[13px] leading-relaxed text-[#3B3D42]">{b}</p>
                        </Card>
                    ))}
                </div>
            </Block>

            <Block label="02 — TYPE" title="Typography.">
                <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    <Card>
                        <p className="mr-display text-[46px] font-semibold leading-none tracking-[-0.02em]">Habari.</p>
                        <Spec>Fraunces · 600 · −0.02em<br />greetings, titles, prices you should notice</Spec>
                    </Card>
                    <Card>
                        <p className="text-[30px] font-semibold leading-tight">Plumber · Kilimani</p>
                        <p className="mt-1 text-[15px] text-[#6B6A64]">1.2 km · replies ~10 min</p>
                        <Spec>DM Sans · 400–700<br />everything you read and tap</Spec>
                    </Card>
                    <Card>
                        <p className="mr-mono text-[28px] font-semibold">KES 1,575</p>
                        <p className="mr-mono mt-1 text-[15px] text-[#6B6A64]">SKL4H2X9QP · 14:00</p>
                        <Spec>JetBrains Mono · 400/600<br />money, times, M-Pesa codes</Spec>
                    </Card>
                </div>
            </Block>

            <Block label="03 — COLOUR" title="Colour.">
                <div className={`grid gap-4 ${compact ? 'grid-cols-2' : 'grid-cols-4'}`}>
                    {palette.map((c) => (
                        <Swatch key={c.name} c={c} />
                    ))}
                </div>
                <p className="mt-5 flex items-center gap-3 text-[13px] text-[#3B3D42]">
                    <span className="rounded-lg px-2 py-1 text-[10px] font-black text-white" style={{ background: M.mpesa }}>M-PESA</span>
                    The M-Pesa green appears only on the pay button, where people expect to see it.
                </p>
            </Block>

            <Block label="04 — COMPONENTS" title="Components.">
                <div className={`grid gap-4 ${cols}`}>
                    <Card>
                        <div className="space-y-2.5">
                            <span className="flex h-[52px] items-center justify-center rounded-2xl bg-[#0E3B2E] text-[16px] font-semibold text-white">Book Wanjiru</span>
                            <span className="flex h-[52px] items-center justify-center rounded-2xl text-[16px] font-semibold text-white" style={{ background: M.mpesa }}>
                                Pay KES 1,575 with M-PESA
                            </span>
                            <span className="flex h-[52px] items-center justify-center rounded-2xl border border-[#E4DCCB] text-[16px] font-semibold">Chat</span>
                        </div>
                        <Spec>52px buttons · radius 16 · tap targets never under 44px</Spec>
                    </Card>
                    <Card>
                        <div className="flex flex-wrap gap-2">
                            {['Verified', 'Available today', 'Within 3 km', '4.8★ +'].map((c) => {
                                const on = chips.includes(c);
                                return (
                                    <button
                                        key={c}
                                        type="button"
                                        aria-pressed={on}
                                        onClick={() => setChips(on ? chips.filter((x) => x !== c) : [...chips, c])}
                                        className={`flex items-center gap-1 rounded-full border px-3.5 py-2 text-[13px] font-medium ${on ? 'border-[#0E3B2E] bg-[#0E3B2E] text-white' : 'border-[#E4DCCB] bg-[#F5EFE4]'}`}
                                    >
                                        {on && <Check size={13} />} {c}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-[13px]">
                            <Verified />
                            <Stars value={4.9} />
                            <span className="rounded-full bg-[#2F9E6E]/[.12] px-2 py-0.5 text-[11px] font-semibold text-[#2F9E6E]">Today</span>
                        </div>
                        <Spec>filter chips (try them) · trust badges · availability tag</Spec>
                    </Card>
                    <Card>
                        <div className="flex gap-3 rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] p-3.5">
                            <Avatar name={p.name} size={48} />
                            <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-1.5 text-[15px] font-semibold">
                                    {p.name} <Verified small />
                                </span>
                                <span className="block text-[13px] text-[#6B6A64]">{p.trade} · {p.area} · {p.km} km</span>
                                <span className="mt-1.5 flex items-center gap-3 text-[12px]">
                                    <Stars value={p.rating} />
                                    <span className="flex items-center gap-1 text-[#6B6A64]"><Clock size={11} /> {p.reply}</span>
                                </span>
                            </span>
                            <span className="mr-mono self-start text-[13px] font-semibold">{kes(p.rate)}</span>
                        </div>
                        <Spec>provider row · trust signals inline · price on the right</Spec>
                    </Card>
                    <Card>
                        <div className="grid grid-cols-3 gap-2">
                            {slots.map((s) => {
                                const taken = takenSlots.includes(s);
                                return (
                                    <button
                                        key={s}
                                        type="button"
                                        disabled={taken}
                                        onClick={() => setSlot(s)}
                                        className={`mr-mono h-11 rounded-xl border text-[14px] font-semibold disabled:border-dashed disabled:text-[#B9B2A4] disabled:line-through ${slot === s ? 'border-[#E8693A] bg-[#E8693A] text-white' : 'border-[#E4DCCB]'}`}
                                    >
                                        {s}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="mt-4 flex items-start gap-2 text-[12px] text-[#3B3D42]">
                            <ShieldCheck size={14} className="mt-px shrink-0 text-[#0E3B2E]" /> KES 1,575 held by Meridian until you confirm.
                        </p>
                        <Spec>slot picker (sun = your choice) · escrow note</Spec>
                    </Card>
                </div>
            </Block>

            <Block label="05 — MODES" title="Customer & Pro.">
                <div className={`flex flex-wrap gap-8 ${compact ? 'justify-center' : ''}`}>
                    <MiniPhone title="Habari, Achieng.">
                        <span className="mt-4 block h-8 rounded-xl border border-[#E4DCCB] bg-[#FFFDF8]" />
                        <span className="mt-3 grid grid-cols-4 gap-1.5">
                            {Array.from({ length: 8 }, (_, i) => (
                                <span key={i} className="h-7 rounded-lg border border-[#E4DCCB] bg-[#FFFDF8]" />
                            ))}
                        </span>
                    </MiniPhone>
                    <MiniPhone dark title="Habari, Wanjiru.">
                        <span className="mr-mono mt-4 block text-[15px] font-semibold">KES 18,400</span>
                        <span className="mt-2 flex h-10 items-end gap-1">
                            {[0.4, 0.65, 0.5, 0.8, 0.95, 0.7, 0.3].map((v, i) => (
                                <span key={i} className="flex-1 rounded-sm" style={{ height: `${v * 100}%`, background: i === 4 ? M.sun : 'rgba(255,255,255,.25)' }} />
                            ))}
                        </span>
                        <span className="mt-3 block h-9 rounded-xl border-2 border-[#E8693A] bg-[#FFFDF8]" />
                    </MiniPhone>
                    <p className="max-w-[34ch] self-center text-[14px] leading-relaxed text-[#3B3D42]">
                        One app, two modes. Providers switch into <b>Pro</b>, which turns the whole screen deep forest green, so nobody
                        mixes up &ldquo;I&apos;m hiring&rdquo; with &ldquo;I&apos;m working&rdquo;. The meridian line carries across both modes.
                    </p>
                </div>
            </Block>

            <Block label="06 — SHAPE" title="Shape & space." className="pb-2">
                <div className="flex flex-wrap items-end gap-6">
                    {[
                        ['12', 'slots, inputs'],
                        ['16', 'buttons, cards'],
                        ['24', 'sheets'],
                        ['999', 'chips, avatars'],
                    ].map(([r, use]) => (
                        <div key={r} className="text-center">
                            <span className="block h-16 w-16 border-2 border-[#0E3B2E]/40 bg-[#FFFDF8]" style={{ borderRadius: Math.min(Number(r), 32) }} />
                            <span className="mr-mono mt-2 block text-[10.5px] text-[#6B6A64]">{r}px</span>
                            <span className="block text-[11px]">{use}</span>
                        </div>
                    ))}
                    <div className="text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-[#E8693A] text-[11px] font-semibold text-[#E8693A]">44</span>
                        <span className="mr-mono mt-2 block text-[10.5px] text-[#6B6A64]">44px</span>
                        <span className="block text-[11px]">min tap target</span>
                    </div>
                </div>
            </Block>
        </div>
    );
}

export default MeridianDesign;
