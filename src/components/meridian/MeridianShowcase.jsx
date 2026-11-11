import React from 'react';
import Showcase from '../showcase/Showcase.jsx';
import MeridianReplica from './MeridianReplica.jsx';
import MeridianDesign from './MeridianDesign.jsx';
import { M, MERIDIAN_FONT_HREF, fonts, meridianUrl } from '../../data/meridian.js';

const TOUR = [
    {
        id: 'home',
        short: 'home',
        title: 'Home',
        caption: 'Pick a trade or search. A greeting in Swahili, and categories come first.',
        route: { name: 'home' },
        notes: ['Most people know the trade they need, not a name, so trades lead', 'Location is the estate ("Kilimani"), not a GPS pin', 'No photos above the fold, so it loads fast on slow 3G'],
    },
    {
        id: 'search',
        short: 'search',
        title: 'Search & filter',
        caption: 'Filter chips and a list/map toggle. Try typing "electrician" or switching to the map.',
        route: { name: 'search', q: 'plumber' },
        notes: ['Trust signals inline: ID check, jobs done, reply time', 'Distance shown in km plus the estate name', 'One-tap chips instead of a separate filter screen'],
    },
    {
        id: 'provider',
        short: 'provider',
        title: 'Provider profile',
        caption: 'Prices up front, reviews that name the job, and chat before you book.',
        route: { name: 'provider', id: 'wanjiru' },
        notes: ['"From KES" prices, so nobody has to ask', 'Each review names the job, not just the stars', 'Chat for jobs that need a quote first'],
    },
    {
        id: 'book',
        short: 'book',
        title: 'Book a slot',
        caption: 'Job type, a date strip and time slots — then a clear estimate.',
        route: { name: 'book', id: 'wanjiru' },
        notes: ['Date strip + slots instead of a calendar picker', 'The job-type chips give the provider a clear brief', 'Estimate before paying; extras agreed on site'],
    },
    {
        id: 'pay',
        short: 'm-pesa',
        title: 'Pay with M-Pesa',
        caption: 'An M-Pesa prompt pops up on the phone (STK push) — no card form. Money is held until the job is done.',
        route: { name: 'pay', id: 'wanjiru', day: 1, slot: '14:00', job: 'Leaking tap' },
        notes: ['STK push: confirm with your PIN, nothing to type', 'Held by Meridian until the customer confirms', 'Receipt shows the M-Pesa code people already trust'],
    },
    {
        id: 'track',
        short: 'track',
        title: 'Live tracking',
        caption: 'Watch the provider arrive, then release payment and rate in one step.',
        route: { name: 'track', id: 'wanjiru' },
        notes: ['Live status replaces "are you coming?" phone calls', 'Call and chat stay one tap away', 'Release payment and leave a rating together'],
    },
    {
        id: 'pro',
        short: 'pro',
        title: 'Provider dashboard',
        caption: 'Pro mode: earnings, a request that expires, and withdrawals straight to M-Pesa.',
        route: { name: 'pro' },
        notes: ['Same app; Pro mode turns deep green so the two modes never get confused', 'Requests expire, so customers aren’t left waiting', 'Withdraw earnings straight to M-Pesa'],
    },
];

const CSS = `
.mr-root{font-family:${fonts.ui};color:${M.ink};background:${M.sand}}
.mr-display{font-family:${fonts.display};font-optical-sizing:auto}
.mr-mono{font-family:${fonts.mono};font-variant-numeric:tabular-nums}
`;

function MeridianShowcase(props) {
    return (
        <Showcase
            {...props}
            tour={TOUR}
            frame="phone"
            renderDemo={(p) => <MeridianReplica {...p} />}
            renderDesign={(p) => <MeridianDesign {...p} />}
            urlFor={meridianUrl}
            designLabel="meridian — design system (concept)"
            fontId="meridian-fonts"
            fontHref={MERIDIAN_FONT_HREF}
            css={CSS}
            rootClass="mr-root"
            accent={M.sun}
            stageBg={M.sand}
            chromeNote="concept · demo data"
            designNote="Meridian has no shipped UI yet. This is an original concept direction for it; click a swatch to copy it."
        />
    );
}

export default MeridianShowcase;
