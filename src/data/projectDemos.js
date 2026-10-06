// Scripted walkthroughs for the "run demo" previews in the projects section.
// Each step renders one screen; the screen `type` picks a renderer in
// components/DemoScreen.jsx, which animates it over the step's progress (0 → 1).

export const STEP_MS = 5200;
export const TICK_MS = 100;

export const projectDemos = {
    meridian: [
        {
            short: 'search',
            title: 'Search for a service',
            caption: 'Browse local professionals by trade and neighbourhood.',
            screen: {
                type: 'search',
                app: 'meridian',
                url: '/search',
                query: 'plumber in Kilimani',
                pick: 0,
                results: [
                    { name: 'Wanjiru K.', meta: 'Plumber · Kilimani · 1.2 km', tag: '★ 4.9' },
                    { name: 'Baraka Services', meta: 'Plumber · Hurlingham · 2.0 km', tag: '★ 4.8' },
                    { name: 'Otieno Plumbing', meta: 'Plumber · Lavington · 3.1 km', tag: '★ 4.7' },
                    { name: 'J. Mutua', meta: 'Plumber · Kileleshwa · 4.0 km', tag: '★ 4.6' },
                ],
            },
        },
        {
            short: 'compare',
            title: 'Compare providers',
            caption: 'Reviews, past work and pricing, side by side.',
            screen: {
                type: 'compare',
                app: 'meridian',
                url: '/compare',
                pick: 0,
                cta: 'View profile',
                cards: [
                    { name: 'Wanjiru K.', badge: '★ 4.9', lines: ['ID verified', '112 jobs done', 'replies ~10 min'], price: 'KES 1,500 / hr' },
                    { name: 'Baraka', badge: '★ 4.8', lines: ['ID verified', '64 jobs done', 'replies ~1 hr'], price: 'KES 1,300 / hr' },
                    { name: 'Otieno', badge: '★ 4.7', lines: ['ID pending', '38 jobs done', 'replies ~2 hr'], price: 'KES 1,200 / hr' },
                ],
            },
        },
        {
            short: 'book',
            title: 'Book and pay',
            caption: 'Pick a slot and confirm the job in a few taps.',
            screen: {
                type: 'book',
                app: 'meridian',
                url: '/book',
                label: 'Wanjiru K. · leaking tap',
                sub: 'Thursday 9 October',
                slots: ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'],
                pick: 3,
                cta: 'Confirm · KES 1,500',
                done: '✓ Booked — Thu 9 Oct, 14:00',
            },
        },
        {
            short: 'provider',
            title: 'Provider dashboard',
            caption: 'Professionals manage jobs and grow repeat business.',
            screen: {
                type: 'dash',
                app: 'meridian pro',
                url: '/dashboard',
                tiles: [
                    { k: 'jobs this week', v: '14' },
                    { k: 'repeat clients', v: '6' },
                    { k: 'rating', v: '4.9' },
                ],
                bars: [['mon', 0.4], ['tue', 0.65], ['wed', 0.5], ['thu', 0.8], ['fri', 0.95], ['sat', 0.7], ['sun', 0.3]],
                feed: [
                    'New request — leaking tap',
                    'Payment received — KES 3,000',
                    'New review — ★★★★★',
                    'Repeat booking — Fri 10:00',
                ],
            },
        },
    ],
    'live-o': [
        {
            short: 'portfolio',
            title: 'Build a portfolio',
            caption: 'Creatives showcase their work in one place.',
            screen: {
                type: 'grid',
                app: 'live.o',
                url: '/amara',
                tileH: '6.4em',
                profile: { name: 'Amara Okafor', role: 'photographer, London', chips: ['editorial', 'portrait', 'brand'] },
                rows: [
                    {
                        heading: 'selected work',
                        tiles: ['editorial / 01', 'portrait / 02', 'brand / 03', 'editorial / 04', 'portrait / 05', 'brand / 06'],
                    },
                ],
            },
        },
        {
            short: 'match',
            title: 'Get matched',
            caption: 'Clients are matched with creatives who fit the brief.',
            screen: {
                type: 'compare',
                app: 'live.o',
                url: '/matches',
                brief: 'brief: brand shoot · 2 days · London · Nov',
                pick: 0,
                cta: 'Send brief',
                cards: [
                    { name: 'Amara O.', badge: 'best fit', lines: ['photographer', 'brand, editorial', 'available Nov'], price: 'from £600 / day' },
                    { name: 'Leo H.', badge: 'good fit', lines: ['photographer', 'brand, product', 'available Dec'], price: 'from £450 / day' },
                    { name: 'Sana I.', badge: 'good fit', lines: ['photo + video', 'brand, events', 'available Nov'], price: 'from £700 / day' },
                ],
            },
        },
        {
            short: 'pay',
            title: 'Tiered payments',
            caption: 'Agree a tier and pay securely through the platform.',
            screen: {
                type: 'compare',
                app: 'live.o',
                url: '/checkout',
                brief: 'Amara O. · brand shoot',
                pick: 1,
                cta: 'Pay & start',
                done: '✓ Payment held securely — project started',
                cards: [
                    { name: 'basic', lines: ['1 day', '20 edited images', '1 revision'], price: '£600' },
                    { name: 'standard', lines: ['2 days', '50 edited images', '2 revisions'], price: '£1,100' },
                    { name: 'premium', lines: ['2 days + video', '80 edited images', 'unlimited revisions'], price: '£1,800' },
                ],
            },
        },
    ],
    'publication-summarizer': [
        {
            short: 'upload',
            title: 'Upload a publication',
            caption: 'Drop in a report or paper from an economic publisher.',
            screen: {
                type: 'upload',
                app: 'summarizer',
                url: '/new',
                file: 'monetary-policy-report.pdf',
                size: '2.4 MB',
                parsed: '✓ parsed — 48 pages, 12 charts',
            },
        },
        {
            short: 'extract',
            title: 'Extract key insights',
            caption: 'Findings, figures and implications pulled out automatically.',
            screen: {
                type: 'extract',
                app: 'summarizer',
                url: '/report/insights',
                file: 'monetary-policy-report.pdf',
                highlights: [2, 5, 9, 12],
                insights: [
                    'Inflation projected to return to target by late 2027',
                    'Expected rate path revised lower than the prior report',
                    'Labour market loosening as wage growth slows',
                    'Main upside risk: energy price volatility',
                ],
            },
        },
        {
            short: 'ask',
            title: 'Ask follow-ups',
            caption: 'Query the document in plain language.',
            screen: {
                type: 'chat',
                app: 'summarizer',
                url: '/report/ask',
                question: { who: 'you', text: 'What changed since the last report?' },
                answer: {
                    who: 'summarizer',
                    text: 'The expected rate path is lower and the inflation outlook has improved, mainly because wage growth is slowing. See section 2.3.',
                },
            },
        },
    ],
    skilldeck: [
        {
            short: 'scaffold',
            title: 'Scaffold a skill',
            caption: 'Generate a production-ready agent skill as a Ruby gem.',
            screen: {
                type: 'term',
                app: 'skilldeck',
                url: '~/code',
                lines: [
                    { cmd: 'gem install skilldeck' },
                    { out: 'Successfully installed skilldeck' },
                    { cmd: 'skilldeck new pdf-extractor' },
                    { out: '  create  pdf-extractor/SKILL.md' },
                    { out: '  create  pdf-extractor/lib/pdf_extractor.rb' },
                    { out: '  create  pdf-extractor/test/' },
                    { out: '✓ skill scaffolded' },
                ],
            },
        },
        {
            short: 'build',
            title: 'Build and test',
            caption: 'Iterate locally with a consistent project structure.',
            screen: {
                type: 'term',
                app: 'skilldeck',
                url: '~/code/pdf-extractor',
                lines: [
                    { cmd: 'skilldeck validate' },
                    { out: '✓ SKILL.md frontmatter valid' },
                    { out: '✓ entrypoint found' },
                    { cmd: 'bundle exec rake test' },
                    { out: '4 runs, 12 assertions, 0 failures' },
                    { out: '✓ ready to publish' },
                ],
            },
        },
        {
            short: 'share',
            title: 'Share to the registry',
            caption: 'Publish to the community registry (in development).',
            screen: {
                type: 'term',
                app: 'skilldeck',
                url: '~/code/pdf-extractor',
                lines: [
                    { cmd: 'skilldeck publish' },
                    { out: 'packaging pdf-extractor v0.1.0' },
                    { out: 'uploading to registry...' },
                    { out: '✓ published — pdf-extractor v0.1.0' },
                    { cmd: 'skilldeck search pdf' },
                    { out: '  pdf-extractor  0.1.0  extract text and tables from PDFs' },
                ],
            },
        },
    ],
    filmslate: [
        {
            short: 'taste',
            title: 'Pick your taste',
            caption: 'A short, visual onboarding instead of a blank catalogue.',
            screen: {
                type: 'chips',
                app: 'filmslate',
                url: '/welcome',
                heading: 'What do you like to watch?',
                sub: 'pick three or more',
                chips: ['documentary', 'world cinema', 'thriller', 'slow cinema', 'animation', 'shorts', 'drama', 'experimental', 'comedy', 'coming of age'],
                picks: [0, 1, 7, 3],
                cta: 'Continue',
            },
        },
        {
            short: 'home',
            title: 'Personalised home',
            caption: 'Rows tuned to the films you picked.',
            screen: {
                type: 'grid',
                app: 'filmslate',
                url: '/home',
                tileH: '6.8em',
                rows: [
                    { heading: 'because you like documentary', tiles: ['film / 01', 'film / 02', 'film / 03'] },
                    { heading: 'world cinema for you', tiles: ['film / 04', 'film / 05', 'film / 06'] },
                ],
            },
        },
        {
            short: 'watch',
            title: 'First watch',
            caption: 'From sign-up to a film playing in a few taps.',
            screen: { type: 'player', app: 'filmslate', url: '/watch', title: 'Selected film', meta: 'documentary · 1h 32m', mins: 92 },
        },
    ],
};
