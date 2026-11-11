// Content and design tokens for the live.o replica in the projects section.
// Tokens are read from liveo.space's production CSS; creators and briefs are
// demo data (KNYA's services mirror the real profile at liveo.space/@knya).

export const LIVEO_ORIGIN = 'https://liveo.space';

export const placeholder = (name) => `${LIVEO_ORIGIN}/placeholders/${name}.webp`;
export const landing = (file) => `${LIVEO_ORIGIN}/landing/${file}`;

export const tokens = {
    colors: [
        { name: 'background', token: '--background', hex: '#030303' },
        { name: 'card', token: '--card', hex: '#060606' },
        { name: 'muted', token: '--muted', hex: '#121212' },
        { name: 'border', token: '--border', hex: '#161616' },
        { name: 'muted fg', token: '--muted-foreground', hex: '#8f8f8f' },
        { name: 'foreground', token: '--foreground', hex: '#fafafa' },
        { name: 'amber', token: 'brand accent', hex: '#C88937' },
        { name: 'destructive', token: '--destructive', hex: '#ff6568' },
    ],
    fonts: {
        display: '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif',
        serif: '"Instrument Serif", ui-serif, Georgia, serif',
        mono: '"Space Mono", ui-monospace, monospace',
        app: 'Poppins, ui-sans-serif, system-ui, sans-serif',
    },
};

export const AMBER = '#C88937';

export const FONT_HREF =
    'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=Poppins:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap';

export const heroWords = ['made.', 'mixed.', 'mastered.', 'heard.', 'released.', 'shared.'];

export const categories = ['Producers', 'Vocalists', 'Mixing & Mastering', 'Session Musicians'];
export const levels = ['Beginner', 'Hobbyist', 'Pro'];

const tiers = (base, { days = [2, 4, 6], revisions = [1, 2, 'Unlimited'], features }) => [
    { id: 'basic', name: 'Basic', price: base[0], days: days[0], revisions: revisions[0], features: features[0] },
    { id: 'standard', name: 'Standard', price: base[1], days: days[1], revisions: revisions[1], features: features[1] },
    { id: 'premium', name: 'Premium', price: base[2], days: days[2], revisions: revisions[2], features: features[2] },
];

export const creators = [
    {
        handle: 'knya',
        name: 'KNYA',
        role: 'Musician',
        category: 'Producers',
        level: 'Pro',
        location: 'Remote',
        response: '1 hr',
        rating: 5.0,
        reviews: 3,
        bio: 'Producer and engineer. Piano-led hip hop, tight low end, stems on request.',
        skills: ['Producer', 'engineer', 'piano', 'hip hop'],
        cover: placeholder('studio-03'),
        banner: landing('side-a.jpg'),
        tracks: [
            { title: 'late night keys', meta: 'beat · 92 bpm', len: '2:41' },
            { title: 'north circular', meta: 'mix · 140 bpm', len: '3:12' },
            { title: 'kilimani dusk', meta: 'production · 86 bpm', len: '2:58' },
        ],
        reviewList: [
            { who: 'Nia R.', stars: 5, text: 'Turned my voice memo into a full record. Stems were spotless.' },
            { who: 'Joss O.', stars: 5, text: 'Fast, clear, and the low end finally sits right.' },
        ],
        services: [
            {
                id: 'mix-master',
                title: 'Mix & Master your track',
                blurb: 'Full mix & master',
                cover: placeholder('keys-05'),
                tiers: tiers([40, 70, 110], {
                    days: [1, 3, 5],
                    revisions: [2, 3, 'Unlimited'],
                    features: [
                        ['Up to 16 stems', 'Streaming master', 'WAV + MP3'],
                        ['Up to 32 stems', 'Streaming + club master', 'Vocal tuning', 'WAV + MP3'],
                        ['Unlimited stems', 'Stem mastering', 'Vocal tuning + comping', 'Instrumental + a cappella'],
                    ],
                }),
            },
            {
                id: 'production',
                title: 'Music Production',
                blurb: 'Will produce a track based on your brief',
                cover: placeholder('keys-04'),
                tiers: tiers([45, 85, 140], {
                    days: [1, 3, 6],
                    revisions: [2, 3, 'Unlimited'],
                    features: [
                        ['1 original beat', 'MP3 lease', 'Tagged preview'],
                        ['1 original beat', 'WAV + trackouts', 'Arrangement for your vocal'],
                        ['Full production', 'Live keys', 'Trackouts + session file', 'Exclusive rights'],
                    ],
                }),
            },
            {
                id: 'advanced-production',
                title: 'Advanced Music Production',
                blurb: 'Full track out and stems as required of any production choice',
                cover: placeholder('keys-01'),
                tiers: tiers([65, 120, 200], {
                    days: [2, 4, 7],
                    revisions: [2, 3, 'Unlimited'],
                    features: [
                        ['Full track out', 'Stems', 'WAV master'],
                        ['Full track out', 'Stems', 'Mix included', 'Session file'],
                        ['Full track out', 'Stems', 'Mix + master', 'Session file', 'Priority delivery'],
                    ],
                }),
            },
        ],
    },
    {
        handle: 'amani.wav',
        name: 'Amani Wekesa',
        role: 'Producer',
        category: 'Producers',
        level: 'Pro',
        location: 'Nairobi · London',
        response: '2 hr',
        rating: 4.9,
        reviews: 41,
        bio: 'Afrobeats and amapiano producer. Drums first, everything else earns its place.',
        skills: ['afrobeats', 'amapiano', 'drums', 'arrangement', 'Ableton'],
        cover: placeholder('studio-01'),
        banner: landing('hero-frame.jpg'),
        tracks: [
            { title: 'sunday in westlands', meta: 'amapiano · 112 bpm', len: '3:40' },
            { title: 'shuffle 04', meta: 'afrobeats · 104 bpm', len: '2:52' },
        ],
        reviewList: [{ who: 'Theo M.', stars: 5, text: 'The groove on this is unreal. Booking again.' }],
        services: [
            {
                id: 'afro-beat',
                title: 'Custom Afrobeats production',
                blurb: 'A full beat built around your topline',
                cover: placeholder('studio-02'),
                tiers: tiers([120, 220, 380], {
                    features: [
                        ['1 beat', 'MP3 + WAV'],
                        ['1 beat', 'Trackouts', 'Arrangement notes'],
                        ['Full production', 'Live percussion', 'Trackouts', 'Exclusive rights'],
                    ],
                }),
            },
        ],
    },
    {
        handle: 'niarose',
        name: 'Nia Rose',
        role: 'Vocalist',
        category: 'Vocalists',
        level: 'Hobbyist',
        location: 'Manchester',
        response: '3 hr',
        rating: 4.8,
        reviews: 12,
        bio: 'Topliner and session vocalist. R&B, neo-soul, the odd house hook.',
        skills: ['topline', 'R&B', 'harmonies', 'songwriting'],
        cover: placeholder('keys-02'),
        banner: landing('side-b.jpg'),
        tracks: [{ title: 'slow burn (demo)', meta: 'topline · 78 bpm', len: '2:20' }],
        reviewList: [{ who: 'Amani W.', stars: 5, text: 'Wrote the hook in a day and stacked twelve harmonies.' }],
        services: [
            {
                id: 'topline',
                title: 'Topline + lead vocal',
                blurb: 'Melody, lyrics and a lead vocal on your beat',
                cover: placeholder('keys-03'),
                tiers: tiers([80, 150, 260], {
                    features: [
                        ['Hook only', 'Dry lead vocal'],
                        ['Full song', 'Lead + doubles'],
                        ['Full song', 'Lead, doubles, harmonies', 'Ad-libs', 'Writing split sheet'],
                    ],
                }),
            },
        ],
    },
    {
        handle: 'theomixes',
        name: 'Theo Marsh',
        role: 'Engineer',
        category: 'Mixing & Mastering',
        level: 'Pro',
        location: 'Bristol',
        response: '45 min',
        rating: 5.0,
        reviews: 87,
        bio: 'Mix engineer. Analog summing, honest loudness, quick turnarounds.',
        skills: ['mixing', 'mastering', 'analog', 'Pro Tools'],
        cover: placeholder('keys-05'),
        banner: landing('band-frame.jpg'),
        tracks: [{ title: 'before / after — "glass"', meta: 'mix · 120 bpm', len: '3:05' }],
        reviewList: [{ who: 'KNYA', stars: 5, text: 'Master hit target first time. Notes were thoughtful.' }],
        services: [
            {
                id: 'mix',
                title: 'Analog mix',
                blurb: 'A full mix through the console',
                cover: placeholder('studio-03'),
                tiers: tiers([90, 160, 260], {
                    features: [['Up to 24 stems'], ['Up to 48 stems', 'Vocal production'], ['Unlimited stems', 'Stem master', 'Recall for 30 days']],
                }),
            },
        ],
    },
    {
        handle: 'jossbass',
        name: 'Joss Okoro',
        role: 'Session Musician',
        category: 'Session Musicians',
        level: 'Pro',
        location: 'London',
        response: '4 hr',
        rating: 4.9,
        reviews: 29,
        bio: 'Session bassist. Electric, synth and upright. Remote sessions in 24h.',
        skills: ['bass', 'synth bass', 'upright', 'funk'],
        cover: placeholder('studio-02'),
        banner: landing('side-a.jpg'),
        tracks: [{ title: 'pocket study', meta: 'bass · 96 bpm', len: '1:48' }],
        reviewList: [],
        services: [
            {
                id: 'bass',
                title: 'Remote bass session',
                blurb: 'Bass recorded to your track',
                cover: placeholder('keys-02'),
                tiers: tiers([60, 110, 180], {
                    features: [['1 take, DI'], ['2 passes', 'DI + amp'], ['Full arrangement', 'DI + amp', 'Synth layer']],
                }),
            },
        ],
    },
    {
        handle: 'lilakeys',
        name: 'Lila Chen',
        role: 'Session Musician',
        category: 'Session Musicians',
        level: 'Beginner',
        location: 'Leeds',
        response: '6 hr',
        rating: 4.7,
        reviews: 4,
        bio: 'Keys and Rhodes. Jazz-trained, gospel-leaning.',
        skills: ['keys', 'Rhodes', 'gospel', 'jazz'],
        cover: placeholder('keys-01'),
        banner: landing('side-b.jpg'),
        tracks: [{ title: 'rhodes sketch 2', meta: 'keys · 70 bpm', len: '1:55' }],
        reviewList: [],
        services: [
            {
                id: 'keys',
                title: 'Keys & Rhodes parts',
                blurb: 'Chords, pads and fills for your record',
                cover: placeholder('keys-03'),
                tiers: tiers([35, 65, 110], {
                    features: [['1 part'], ['2 parts', 'MIDI + audio'], ['Full keys arrangement', 'MIDI + audio', 'Rhodes + piano']],
                }),
            },
        ],
    },
];

export const calls = [
    {
        id: 'c1',
        category: 'Film & TV',
        title: 'Tense synth cue for a short film',
        who: 'Northlight Pictures',
        budget: '$400 – $700',
        closes: '3 days',
        refs: 'ref: Trent Reznor-style pulses, 90s',
        pitches: 7,
    },
    {
        id: 'c2',
        category: 'Records',
        title: 'Female vocalist for an R&B single',
        who: 'Kinship Records',
        budget: '$250 – $450',
        closes: '6 days',
        refs: 'ref: warm, breathy, stacked harmonies',
        pitches: 12,
    },
    {
        id: 'c3',
        category: 'Ads & Sync',
        title: '30s upbeat afrobeats bed',
        who: 'Studio Juno',
        budget: '$600',
        closes: '9 days',
        refs: 'ref: bright percussion, no vocals',
        pitches: 4,
    },
    {
        id: 'c4',
        category: 'Games',
        title: 'Lo-fi loop pack for a cosy game',
        who: 'Pocket Moth',
        budget: '$300 – $500',
        closes: '12 days',
        refs: 'ref: tape hiss, mellow keys',
        pitches: 9,
    },
];

export const callCategories = ['All', 'Film & TV', 'Games', 'Records', 'Ads & Sync', 'Live'];

export const orderStages = [
    { id: 'pending', label: 'Pending' },
    { id: 'paid', label: 'Paid' },
    { id: 'in_progress', label: 'In progress' },
    { id: 'in_review', label: 'In review' },
    { id: 'completed', label: 'Completed' },
];

export const findCreator = (handle) => creators.find((c) => c.handle === handle);

// Deterministic pseudo-waveform for the reel player.
export const waveform = (seed, n = 56) => {
    let x = seed * 9301 + 49297;
    return Array.from({ length: n }, (_, i) => {
        x = (x * 9301 + 49297) % 233280;
        const env = 0.45 + 0.55 * Math.sin((i / n) * Math.PI);
        return 0.18 + (x / 233280) * 0.82 * env;
    });
};

export const routeUrl = (r) => {
    switch (r.name) {
        case 'home':
            return '/';
        case 'discover':
            return '/discover';
        case 'calls':
            return '/calls';
        case 'profile':
            return `/@${r.handle}`;
        case 'service':
            return `/@${r.handle}/services/${r.serviceId}`;
        case 'checkout':
            return `/checkout/${r.serviceId}?tier=${r.tier}`;
        case 'order':
            return '/orders/LO-2611';
        default:
            return '/';
    }
};
