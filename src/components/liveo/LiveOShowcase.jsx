import React from 'react';
import Showcase from '../showcase/Showcase.jsx';
import LiveOReplica from './LiveOReplica.jsx';
import LiveODesign from './LiveODesign.jsx';
import { AMBER, FONT_HREF, LIVEO_ORIGIN, routeUrl, tokens } from '../../data/liveo.js';

const KNYA_ORDER = { handle: 'knya', serviceId: 'mix-master', tier: 'standard' };

const TOUR = [
    { id: 'home', short: 'landing', title: 'Landing page', caption: 'Editorial type, studio footage and the rotating amber headline word.', route: { name: 'home' } },
    { id: 'discover', short: 'discover', title: 'Discover talent', caption: 'Search and filter creators by role and experience level. Try typing "bass".', route: { name: 'discover' } },
    { id: 'profile', short: 'profile', title: 'Creator profile', caption: 'Demo reels up front (press play), stats, reviews and services.', route: { name: 'profile', handle: 'knya' } },
    { id: 'service', short: 'tiers', title: 'Tiered services', caption: 'Basic, Standard or Premium — scope, delivery and revisions in writing.', route: { name: 'service', handle: 'knya', serviceId: 'mix-master' } },
    { id: 'checkout', short: 'checkout', title: 'Stripe checkout', caption: 'Pay once; the money sits in escrow until the work is approved.', route: { name: 'checkout', ...KNYA_ORDER } },
    { id: 'order', short: 'order', title: 'Order & delivery', caption: 'Live thread, deliverables, revisions — then approve & release.', route: { name: 'order', ...KNYA_ORDER } },
    { id: 'calls', short: 'calls', title: 'Open calls', caption: 'Briefs from studios and labels; creators pitch straight in.', route: { name: 'calls' } },
];

const { fonts } = tokens;
const CSS = `
.lo-root{font-family:${fonts.app};color:#fafafa}
.lo-display{font-family:${fonts.display}}
.lo-serif{font-family:${fonts.serif}}
.lo-mono{font-family:${fonts.mono}}
@keyframes lo-word{from{opacity:0;filter:blur(8px);transform:translateY(.25em)}to{opacity:1;filter:blur(0);transform:none}}
.lo-word-in{animation:lo-word .6s ease-out both}
@media (prefers-reduced-motion:reduce){.lo-word-in{animation:none}}
`;

function LiveOShowcase(props) {
    return (
        <Showcase
            {...props}
            tour={TOUR}
            renderDemo={(p) => <LiveOReplica {...p} />}
            renderDesign={(p) => <LiveODesign {...p} />}
            urlFor={(r) => `liveo.space${routeUrl(r)}`}
            designLabel="live.o! — design system"
            liveUrl={LIVEO_ORIGIN}
            fontId="liveo-fonts"
            fontHref={FONT_HREF}
            css={CSS}
            rootClass="lo-root"
            accent={AMBER}
            designNote="Type, colour and components taken from liveo.space's production CSS. Click a swatch to copy it."
        />
    );
}

export default LiveOShowcase;
