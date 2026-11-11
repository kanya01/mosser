// Concept design + demo data for the Meridian showcase. Meridian has no shipped
// UI yet, so this is an original design direction: a mobile-first local-services
// marketplace starting in Nairobi. Providers, prices and receipts are fictional.

export const M = {
    sand: '#F5EFE4',
    paper: '#FFFDF8',
    ink: '#16181D',
    muted: '#6B6A64',
    line: '#E4DCCB',
    forest: '#0E3B2E',
    forest2: '#175C47',
    sun: '#E8693A',
    mint: '#2F9E6E',
    mpesa: '#39B54A',
};

export const MERIDIAN_FONT_HREF =
    'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..700&family=Fraunces:opsz,wght@9..144,400..700&family=JetBrains+Mono:wght@400;600&display=swap';

export const fonts = {
    display: 'Fraunces, ui-serif, Georgia, serif',
    ui: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
};

export const palette = [
    { name: 'sand', hex: M.sand, role: 'app background' },
    { name: 'paper', hex: M.paper, role: 'cards, sheets' },
    { name: 'line', hex: M.line, role: 'dividers, outlines' },
    { name: 'muted', hex: M.muted, role: 'secondary text' },
    { name: 'ink', hex: M.ink, role: 'primary text' },
    { name: 'forest', hex: M.forest, role: 'primary, Pro mode' },
    { name: 'sun', hex: M.sun, role: 'accent, the meridian line' },
    { name: 'mint', hex: M.mint, role: 'verified, success' },
];

export const customer = { name: 'Achieng', area: 'Kilimani, Nairobi', phone: '0712 345 678' };

export const categories = [
    { id: 'plumbing', label: 'Plumbing', trade: 'Plumber' },
    { id: 'electrical', label: 'Electrical', trade: 'Electrician' },
    { id: 'cleaning', label: 'Cleaning', trade: 'Cleaner' },
    { id: 'salon', label: 'Salon', trade: 'Hair & beauty' },
    { id: 'mechanic', label: 'Mechanic', trade: 'Mechanic' },
    { id: 'tutoring', label: 'Tutoring', trade: 'Tutor' },
    { id: 'carpentry', label: 'Carpentry', trade: 'Carpenter' },
    { id: 'moving', label: 'Moving', trade: 'Movers' },
];

export const providers = [
    {
        id: 'wanjiru',
        name: 'Wanjiru Kamau',
        trade: 'Plumber',
        category: 'plumbing',
        area: 'Kilimani',
        km: 1.2,
        rating: 4.9,
        jobs: 112,
        verified: true,
        today: true,
        reply: '~10 min',
        since: 2019,
        rate: 1500,
        bio: 'Licensed plumber for nine years. Leaks, drains, water heaters and tanks. I bring parts, so most jobs are finished in one visit.',
        services: [
            { name: 'Leaking tap or pipe', price: 1500, time: '~1 hr' },
            { name: 'Blocked drain or toilet', price: 2500, time: '1–2 hrs' },
            { name: 'Water heater install', price: 4500, time: '2–3 hrs' },
            { name: 'Tank cleaning', price: 3500, time: '3 hrs' },
        ],
        work: ['kitchen sink', 'shower valve', 'roof tank'],
        reviews: [
            { who: 'Brian O.', job: 'Blocked drain', stars: 5, text: 'Came within the hour and explained what caused it. Fair price.' },
            { who: 'Mercy A.', job: 'Water heater', stars: 5, text: 'Neat work, cleaned up after. Booking again for the tank.' },
            { who: 'Daniel K.', job: 'Leaking tap', stars: 4, text: 'Fixed fast. Arrived 15 minutes late but messaged ahead.' },
        ],
    },
    {
        id: 'baraka',
        name: 'Baraka Services',
        trade: 'Plumber',
        category: 'plumbing',
        area: 'Hurlingham',
        km: 2.0,
        rating: 4.8,
        jobs: 64,
        verified: true,
        today: true,
        reply: '~1 hr',
        since: 2021,
        rate: 1300,
        bio: 'Two-person team for plumbing and small renovations. Weekend slots available.',
        services: [
            { name: 'Leaking tap or pipe', price: 1300, time: '~1 hr' },
            { name: 'Bathroom fitting', price: 6000, time: '1 day' },
        ],
        work: ['bathroom', 'kitchen'],
        reviews: [{ who: 'Joy M.', job: 'Bathroom fitting', stars: 5, text: 'Finished a day early.' }],
    },
    {
        id: 'otieno',
        name: 'Peter Otieno',
        trade: 'Plumber',
        category: 'plumbing',
        area: 'Lavington',
        km: 3.1,
        rating: 4.7,
        jobs: 38,
        verified: false,
        today: false,
        reply: '~2 hr',
        since: 2022,
        rate: 1200,
        bio: 'Plumbing and borehole pumps.',
        services: [{ name: 'Pump repair', price: 3000, time: '2 hrs' }],
        work: ['pump'],
        reviews: [],
    },
    {
        id: 'mutua',
        name: 'James Mutua',
        trade: 'Plumber & electrician',
        category: 'plumbing',
        area: 'Kileleshwa',
        km: 4.0,
        rating: 4.6,
        jobs: 27,
        verified: true,
        today: true,
        reply: '~30 min',
        since: 2020,
        rate: 1100,
        bio: 'Handy with both pipes and wiring — good for small mixed jobs.',
        services: [{ name: 'Small repairs (per hour)', price: 1100, time: '1 hr' }],
        work: ['sockets', 'sink'],
        reviews: [],
    },
    {
        id: 'amina',
        name: 'Amina Hassan',
        trade: 'Electrician',
        category: 'electrical',
        area: 'Kilimani',
        km: 0.8,
        rating: 4.9,
        jobs: 89,
        verified: true,
        today: true,
        reply: '~15 min',
        since: 2018,
        rate: 1800,
        bio: 'Certified electrician. Rewiring, solar backup and token meter faults.',
        services: [{ name: 'Fault finding', price: 1800, time: '~1 hr' }],
        work: ['db board', 'solar'],
        reviews: [{ who: 'Ann W.', job: 'Solar backup', stars: 5, text: 'Explained everything and labelled the board.' }],
    },
    {
        id: 'grace',
        name: 'Grace Njeri',
        trade: 'Cleaner',
        category: 'cleaning',
        area: 'Westlands',
        km: 2.4,
        rating: 4.8,
        jobs: 150,
        verified: true,
        today: false,
        reply: '~20 min',
        since: 2020,
        rate: 2000,
        bio: 'Deep cleans and move-out cleans, with my own supplies.',
        services: [{ name: '2-bedroom deep clean', price: 4000, time: '4 hrs' }],
        work: ['kitchen', 'living room'],
        reviews: [],
    },
    {
        id: 'kevin',
        name: 'Kevin Ouma',
        trade: 'Mechanic',
        category: 'mechanic',
        area: 'Industrial Area',
        km: 6.2,
        rating: 4.7,
        jobs: 71,
        verified: true,
        today: true,
        reply: '~25 min',
        since: 2017,
        rate: 2500,
        bio: 'Mobile mechanic — servicing and diagnostics at your gate.',
        services: [{ name: 'Minor service', price: 4500, time: '2 hrs' }],
        work: ['service'],
        reviews: [],
    },
    {
        id: 'faith',
        name: 'Faith Wambui',
        trade: 'Hair & beauty',
        category: 'salon',
        area: 'Kilimani',
        km: 1.5,
        rating: 5.0,
        jobs: 203,
        verified: true,
        today: true,
        reply: '~5 min',
        since: 2016,
        rate: 2500,
        bio: 'Braids, locs and natural hair. House calls in Kilimani and Lavington.',
        services: [{ name: 'Knotless braids', price: 3500, time: '4 hrs' }],
        work: ['braids', 'locs'],
        reviews: [],
    },
];

export const findProvider = (id) => providers.find((p) => p.id === id) ?? providers[0];

export const jobTypes = ['Leaking tap', 'Blocked drain', 'No water', 'Water heater', 'Other'];

export const slots = ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'];
export const takenSlots = ['09:30', '17:00'];

export const trackStages = [
    { id: 'confirmed', label: 'Confirmed', detail: 'Wanjiru accepted your booking.' },
    { id: 'on_way', label: 'On the way', detail: 'Leaving Kilimani now.' },
    { id: 'arrived', label: 'Arrived', detail: 'At your gate.' },
    { id: 'working', label: 'Working', detail: 'Job in progress.' },
    { id: 'done', label: 'Done', detail: 'Check the work, then release payment.' },
];

export const proWeek = [
    ['M', 0.4],
    ['T', 0.65],
    ['W', 0.5],
    ['T', 0.8],
    ['F', 0.95],
    ['S', 0.7],
    ['S', 0.3],
];

export const kes = (n) => `KES ${n.toLocaleString('en-KE')}`;

export const meridianUrl = (r) => {
    switch (r.name) {
        case 'home':
            return 'meridian · /home';
        case 'search':
            return `meridian · /search${r.q ? `?q=${encodeURIComponent(r.q)}` : ''}`;
        case 'provider':
            return `meridian · /pro/${r.id}`;
        case 'book':
            return `meridian · /pro/${r.id}/book`;
        case 'pay':
            return 'meridian · /checkout';
        case 'track':
            return 'meridian · /bookings/MR-4821';
        case 'pro':
            return 'meridian pro · /dashboard';
        default:
            return 'meridian';
    }
};
