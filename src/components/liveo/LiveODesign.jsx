import React, { useState } from 'react';
import { ArrowRight, Clock, RotateCcw, Search, Star } from 'lucide-react';
import { AMBER, creators, heroWords, placeholder, tokens } from '../../data/liveo.js';
import { LevelBadge, SkillChip } from './LiveOReplica.jsx';

// The live.o design system, laid out as a spec sheet in the product's own style.
// Every value here is taken from liveo.space's production CSS.

function Label({ children }) {
    return <p className="lo-mono mb-4 text-[11px] tracking-[.22em] text-white/45">{children}</p>;
}

function Block({ title, label, children, className = '' }) {
    return (
        <section className={`border-t border-white/[.08] py-10 ${className}`}>
            <Label>{label}</Label>
            <h2 className="mb-7 text-[30px] font-black tracking-[-0.045em]">{title}</h2>
            {children}
        </section>
    );
}

function Spec({ children }) {
    return <p className="lo-mono mt-3 text-[10.5px] leading-relaxed text-white/45">{children}</p>;
}

function Swatch({ c }) {
    const [copied, setCopied] = useState(false);
    const light = ['#fafafa', '#8f8f8f', '#C88937', '#ff6568'].includes(c.hex);
    return (
        <button
            type="button"
            onClick={() => {
                navigator.clipboard?.writeText(c.hex).catch(() => {});
                setCopied(true);
                setTimeout(() => setCopied(false), 1100);
            }}
            className="group text-left"
            aria-label={`Copy ${c.name} ${c.hex}`}
        >
            <span
                className="flex h-[88px] items-end rounded-xl border border-white/10 p-2.5 transition-transform group-hover:-translate-y-0.5"
                style={{ background: c.hex }}
            >
                <span className={`lo-mono text-[10px] ${light ? 'text-black/70' : 'text-white/60'}`}>{copied ? 'copied ✓' : 'copy'}</span>
            </span>
            <span className="mt-2 block text-[13px] font-semibold">{c.name}</span>
            <span className="lo-mono block text-[10.5px] text-white/45">
                {c.hex} · {c.token}
            </span>
        </button>
    );
}

function LiveODesign({ compact }) {
    const [word, setWord] = useState(0);
    const knya = creators[0];
    const service = knya.services[0];
    const cols = compact ? 'grid-cols-1' : 'grid-cols-2';

    return (
        <div className={`bg-[#030303] ${compact ? 'px-5 py-10' : 'px-12 py-14'}`}>
            <header className="pb-10">
                <Label>LIVE.O! — DESIGN SYSTEM · V2</Label>
                <h1 className={`lo-display font-extrabold leading-[.92] tracking-[-0.04em] ${compact ? 'text-[44px]' : 'text-[76px]'}`}>
                    two surfaces,
                    <br />
                    <span className="lo-serif font-normal italic tracking-[-0.02em]" style={{ color: AMBER }}>one record.</span>
                </h1>
                <p className="lo-display mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/60">
                    Marketing pages speak like a record sleeve — editorial type, warm studio photography, a single amber accent. The product
                    stays quiet and dense: Poppins, near-black cards, lowercase headings that end with a full stop.
                </p>
            </header>

            <Block label="01 — TYPE" title="typography.">
                <div className={`grid gap-5 ${cols}`}>
                    <div className="rounded-2xl border border-white/[.08] bg-[#060606] p-6">
                        <p className="lo-display text-[54px] font-extrabold leading-none tracking-[-0.038em]">Aa where</p>
                        <Spec>Bricolage Grotesque · 800 · −0.038em<br />marketing headlines, nav, buttons</Spec>
                    </div>
                    <div className="rounded-2xl border border-white/[.08] bg-[#060606] p-6">
                        <p className="lo-serif text-[58px] italic leading-none tracking-[-0.02em]" style={{ color: AMBER }}>made.</p>
                        <Spec>Instrument Serif · italic 400 · amber<br />the one accent word per headline</Spec>
                    </div>
                    <div className="rounded-2xl border border-white/[.08] bg-[#060606] p-6">
                        <p className="text-[48px] font-black leading-none tracking-[-0.05em]">discover.</p>
                        <Spec>Poppins · 900 · −0.05em · lowercase + full stop<br />product page titles and section heads</Spec>
                    </div>
                    <div className="rounded-2xl border border-white/[.08] bg-[#060606] p-6">
                        <p className="lo-mono text-[13px] tracking-[.22em]">SIDE A — FOR THE ONES HIRING</p>
                        <p className="lo-mono mt-3 text-[13px]" style={{ color: AMBER }}>A1 · A2 · A3</p>
                        <Spec>Space Mono · 400/700 · +0.22em<br />eyebrows, step numbers, small print</Spec>
                    </div>
                </div>
            </Block>

            <Block label="02 — COLOUR" title="colour.">
                <div className={`grid gap-4 ${compact ? 'grid-cols-2' : 'grid-cols-4'}`}>
                    {tokens.colors.map((c) => (
                        <Swatch key={c.hex} c={c} />
                    ))}
                </div>
                <Spec>Dark theme tokens (.dark). Amber is the only hue in the chrome; status colours live in badges.</Spec>
            </Block>

            <Block label="03 — COMPONENTS" title="components.">
                <div className={`grid gap-5 ${cols}`}>
                    <div className="rounded-2xl border border-white/[.08] bg-[#060606] p-6">
                        <div className="lo-display flex flex-wrap items-center gap-3 text-[14px]">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#fafafa] px-5 py-3 font-semibold text-black">
                                Start collaborating <ArrowRight size={14} />
                            </span>
                            <span className="rounded-full border border-white/20 px-5 py-3 font-medium">Browse talent</span>
                        </div>
                        <Spec>pill · radius 999px · primary #fafafa on #030303 · ghost white/20 border</Spec>
                    </div>
                    <div className="rounded-2xl border border-white/[.08] bg-[#060606] p-6">
                        <span className="lo-mono inline-block px-2.5 py-1 text-[10px] font-bold tracking-[.22em] text-black" style={{ background: AMBER }}>
                            THE MARKETPLACE FOR MUSIC TALENT
                        </span>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <LevelBadge level="Beginner" />
                            <LevelBadge level="Hobbyist" />
                            <LevelBadge level="Pro" />
                            <SkillChip>Producer</SkillChip>
                            <SkillChip>hip hop</SkillChip>
                        </div>
                        <Spec>eyebrow tag · level badges (10px / 600 / 30% tint) · skill chips</Spec>
                    </div>
                    <div className="rounded-2xl border border-white/[.08] bg-[#060606] p-6">
                        <label className="relative block">
                            <span className="sr-only">Search specimen</span>
                            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                            <input
                                placeholder='try "hip hop producer"'
                                className="h-11 w-full rounded-full border border-white/[.08] bg-white/[.04] pl-11 pr-4 text-[13px] placeholder:text-white/40 focus:border-white/30 focus:outline-none"
                            />
                        </label>
                        <div className="mt-4 grid grid-cols-3 rounded-full bg-white/[.05] p-1 text-center text-[12px] font-semibold">
                            <span className="py-2 text-white/60">Basic</span>
                            <span className="rounded-full bg-[#fafafa] py-2 text-black">Standard</span>
                            <span className="py-2 text-white/60">Premium</span>
                        </div>
                        <Spec>search · white/4 fill, white/8 border · tier switcher (segmented pill)</Spec>
                    </div>
                    <div className="rounded-2xl border border-white/[.08] bg-[#060606] p-4">
                        <div className="overflow-hidden rounded-2xl border border-white/[.06] bg-[#060606]">
                            <div className="relative h-[90px] bg-[#141210]">
                                <img src={service.cover} alt="" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                <span className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060606]" />
                                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[13px] font-bold">$40.0</span>
                            </div>
                            <div className="px-4 pb-3 pt-1">
                                <p className="text-[15px] font-bold">{service.title}</p>
                                <p className="mt-3 flex justify-between text-[11px] text-[#8f8f8f]">
                                    <span className="flex items-center gap-1.5"><Clock size={11} /> 1 days</span>
                                    <span className="flex items-center gap-1.5"><RotateCcw size={11} /> 2 Revisions</span>
                                </p>
                            </div>
                        </div>
                        <Spec>service card · radius 16 · cover fades into card · price chip black/70</Spec>
                    </div>
                </div>
            </Block>

            <Block label="04 — MOTION" title="motion.">
                <div className="rounded-2xl border border-white/[.08] bg-[#060606] p-6">
                    <p className={`lo-display font-extrabold leading-[.95] tracking-[-0.038em] ${compact ? 'text-[34px]' : 'text-[54px]'}`}>
                        where music gets{' '}
                        <span key={word} className="lo-serif lo-word-in inline-block font-normal italic tracking-[-0.02em]" style={{ color: AMBER }}>
                            {heroWords[word]}
                        </span>
                    </p>
                    <button
                        type="button"
                        onClick={() => setWord((w) => (w + 1) % heroWords.length)}
                        className="lo-mono mt-5 rounded-full border border-white/15 px-4 py-2 text-[11px] tracking-[.12em] hover:border-white/40"
                    >
                        NEXT WORD →
                    </button>
                    <Spec>hero word swaps every 2.2s · blur + rise in, 600ms ease-out · paused for reduced motion</Spec>
                </div>
            </Block>

            <Block label="05 — PHOTOGRAPHY" title="imagery.">
                <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-4'}`}>
                    {['studio-01', 'studio-03', 'keys-01', 'keys-04'].map((n) => (
                        <div key={n} className="aspect-[4/5] overflow-hidden rounded-xl bg-[#141210]">
                            <img src={placeholder(n)} alt="" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                        </div>
                    ))}
                </div>
                <Spec>warm, low-light studio photography · gear over faces · always under a dark gradient</Spec>
            </Block>

            <Block label="06 — SPACE" title="shape & space." className="pb-2">
                <div className="flex flex-wrap items-end gap-5">
                    {[
                        ['6', 'buttons'],
                        ['12', 'creator card'],
                        ['16', 'service card'],
                        ['24', 'panels'],
                        ['999', 'pills'],
                    ].map(([r, use]) => (
                        <div key={r} className="text-center">
                            <span className="block h-16 w-16 border border-white/25 bg-white/[.04]" style={{ borderRadius: Math.min(Number(r), 32) }} />
                            <span className="lo-mono mt-2 block text-[10.5px] text-white/45">{r}px</span>
                            <span className="block text-[11px] text-white/70">{use}</span>
                        </div>
                    ))}
                </div>
                <p className="mt-8 flex items-center gap-2 text-[12px] text-[#8f8f8f]">
                    <Star size={12} className="fill-amber-400 text-amber-400" /> ratings are the only other warm colour in the product.
                </p>
            </Block>
        </div>
    );
}

export default LiveODesign;
