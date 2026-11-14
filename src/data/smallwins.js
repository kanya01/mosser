// Concept design + demo state for the Small Wins showcase. Small Wins (working
// title) is a planner-diary: one goal becomes actions you can finish alone, and
// every finished action lands in a wins log. This is an original design
// direction, not a shipped product; the seeded entries are fictional.

export const S = {
    haze: '#F2F0F8',
    page: '#FDFCFF',
    ink: '#1D1A39',
    muted: '#6C6988',
    line: '#DFDBEE',
    iris: '#4A3FCF',
    irisSoft: '#E7E4FB',
    marker: '#FFD84A',
    leaf: '#1E9B78',
};

export const SMALLWINS_FONT_HREF =
    'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Figtree:wght@400..700&family=IBM+Plex+Mono:wght@400;600&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&display=swap';

export const fonts = {
    display: 'Newsreader, ui-serif, Georgia, serif',
    ui: 'Figtree, ui-sans-serif, system-ui, sans-serif',
    hand: 'Caveat, "Segoe Print", cursive',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
};

export const palette = [
    { name: 'haze', hex: S.haze, role: 'app background' },
    { name: 'page', hex: S.page, role: 'cards, the diary page' },
    { name: 'line', hex: S.line, role: 'rules, outlines' },
    { name: 'muted', hex: S.muted, role: 'secondary text' },
    { name: 'ink', hex: S.ink, role: 'primary text' },
    { name: 'iris', hex: S.iris, role: 'actions, today' },
    { name: 'marker', hex: S.marker, role: 'finished wins only' },
    { name: 'leaf', hex: S.leaf, role: 'days shown up' },
];

export const MAX_ACTIVE_GOALS = 2;
export const MAX_WINS_PER_GOAL = 3;

export const reminderTimes = ['08:00', '12:30', '18:30', '21:00'];
// Reminder copy never mentions missed days.
export const reminderCopy = 'Your one win for today is ready when you are.';

/* ───────────────────────── dates ───────────────────────── */

const dayOf = (ago) => {
    const d = new Date();
    d.setDate(d.getDate() - ago);
    return d;
};

export const dateLabel = (ago) =>
    ago === 0 ? 'Today' : ago === 1 ? 'Yesterday' : dayOf(ago).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

export const longToday = () => dayOf(0).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

// Days since Monday, so seeded "this week" wins never land in last week.
export const sinceMonday = (dayOf(0).getDay() + 6) % 7;

/* ───────────────────────── reframe suggestions ───────────────────────── */

// Stand-in for the P1 breakdown assistant: a small bank of controllable actions,
// matched on keywords. Every suggestion can be accepted, edited or ignored.
const SUGGESTIONS = [
    {
        match: /job|role|career|hire|work|intern|offer/i,
        actions: ['Send two tailored applications', 'Message one person who does the job I want', 'Rewrite one CV bullet with a number in it', 'Practise one interview story out loud'],
    },
    {
        match: /write|book|blog|newsletter|post|essay|reader|subscriber/i,
        actions: ['Write 300 words before lunch', 'Publish one post this week', 'Ask one reader what they wanted more of', 'Outline the next piece'],
    },
    {
        match: /app|launch|build|ship|product|site|portfolio|business|client|freelanc|customer/i,
        actions: ['Ship one small improvement', 'Show it to one person and take notes', 'Write the one-line pitch', 'Fix the oldest open bug'],
    },
    {
        match: /run|fit|gym|health|marathon|weight|sleep/i,
        actions: ['Do a 20-minute session', 'Lay out kit the night before', 'Book the next session in the diary', 'Walk the first ten minutes'],
    },
    {
        match: /learn|study|exam|course|degree|language|grade/i,
        actions: ['Study one topic for 25 minutes', 'Do five practice questions', 'Explain one idea in my own words', 'Book a slot to review mistakes'],
    },
];

const FALLBACK_ACTIONS = ['Spend 25 minutes on the first step', 'Write down the next three actions', 'Ask one person for one piece of advice', 'Finish one thing I already started'];

export const suggestActions = (text) => (SUGGESTIONS.find((s) => s.match.test(text)) || { actions: FALLBACK_ACTIONS }).actions;

// A goal that names an outcome someone else decides. Used to pre-answer the
// "does this depend on someone else saying yes?" question; the user can overrule it.
export const looksLikeOutcome = (text) => /\b(get|land|win|be|become|reach|hit|earn|gain|grow|pass|accepted|hired|offer|followers|subscribers|customers|clients|revenue)\b/i.test(text);

/* ───────────────────────── seed state ───────────────────────── */

const G1 = 'g-app';

export const initialState = () => ({
    seq: 100,
    goals: [
        {
            id: G1,
            raw: 'Launch my app and get 100 users before the year ends',
            title: 'App launch',
            dependsOnYes: true,
            actions: ['Ship one small improvement', 'Show it to one person and take notes', 'Write the one-line pitch', 'Fix the oldest open bug'],
            status: 'active',
        },
        {
            id: 'g-run',
            raw: 'Run a half marathon',
            title: 'Half marathon',
            dependsOnYes: false,
            actions: ['Do a 20-minute session', 'Lay out kit the night before'],
            status: 'parked',
        },
    ],
    // This week's wins. A single win may carry a real-world date; a goal may not.
    week: [
        { id: 'w1', goalId: G1, text: 'Ship one small improvement', done: true },
        { id: 'w2', goalId: G1, text: 'Show it to one person and take notes', done: false },
        { id: 'w3', goalId: G1, text: 'Submit to the indie showcase', done: false, date: 'closes Fri' },
    ],
    todayId: 'w2',
    // Every finished win, newest first. `ago` is days before today.
    log: [
        { id: 'l1', winId: 'w1', goalId: G1, text: 'Ship one small improvement', ago: Math.min(1, sinceMonday), note: 'Empty state finally says what to do next.' },
        { id: 'l2', goalId: G1, text: 'Write the one-line pitch', ago: sinceMonday + 2, note: 'Eleven words. It used to be a paragraph.' },
        { id: 'l3', goalId: G1, text: 'Show it to one person and take notes', ago: sinceMonday + 3, note: '' },
        { id: 'l4', goalId: G1, text: 'Fix the oldest open bug', ago: sinceMonday + 5, note: 'It was one missing await.' },
        { id: 'l5', goalId: G1, text: 'Ship one small improvement', ago: sinceMonday + 9, note: '' },
        { id: 'l6', goalId: G1, text: 'List ten people who might actually use it', ago: sinceMonday + 10, note: 'Only six felt honest. Six is fine.' },
        { id: 'l7', goalId: G1, text: 'Record a 60-second walkthrough', ago: sinceMonday + 12, note: '' },
        { id: 'l8', goalId: G1, text: 'Put the landing page live', ago: sinceMonday + 16, note: '' },
        { id: 'l9', goalId: G1, text: 'Show it to one person and take notes', ago: sinceMonday + 17, note: 'She tried to tap the logo. Noted.' },
        { id: 'l10', goalId: G1, text: 'Write down what "launched" means', ago: sinceMonday + 20, note: '' },
    ],
    // Onboarding backfill: things that had already moved before day one.
    backfill: [
        { id: 'b1', text: 'Finished my apprenticeship', when: 'June' },
        { id: 'b2', text: 'Built the first working prototype', when: 'spring' },
        { id: 'b3', text: 'Ran my first user interviews', when: 'last winter' },
    ],
    review: { outside: '', next: '', done: false },
    reminder: '18:30',
    shareRecap: false,
});

/* ───────────────────────── selectors ───────────────────────── */

export const activeGoals = (s) => s.goals.filter((g) => g.status === 'active');
export const parkedGoals = (s) => s.goals.filter((g) => g.status === 'parked');
export const goalById = (s, id) => s.goals.find((g) => g.id === id);
export const weekFor = (s, goalId) => s.week.filter((w) => w.goalId === goalId);
// Today's win is the one the user chose, else the first unfinished win of an active goal.
export const todayWin = (s) => {
    const live = s.week.filter((w) => goalById(s, w.goalId)?.status === 'active');
    return live.find((w) => w.id === s.todayId) || live.find((w) => !w.done) || null;
};
export const openWins = (s) => s.week.filter((w) => !w.done && goalById(s, w.goalId)?.status === 'active');

export const totals = (s) => {
    const days = new Set(s.log.map((e) => e.ago));
    const first = s.log.reduce((m, e) => Math.max(m, e.ago), 0);
    return {
        wins: s.log.length,
        daysShownUp: days.size,
        weeks: Math.max(1, Math.ceil((first + 1) / 7)),
        days,
        thisWeek: s.log.filter((e) => e.ago <= sinceMonday).length,
    };
};

export const thisWeekLog = (s) => s.log.filter((e) => e.ago <= sinceMonday);

/* ───────────────────────── reducer ───────────────────────── */

const titleOf = (raw) => {
    const t = raw.trim().replace(/^(get|land|become|be|win|reach)\s+(a|an|the|my)?\s*/i, '').replace(/\s+(before|by)\s+.*$/i, '');
    const short = t.split(/\s+/).slice(0, 4).join(' ');
    return short ? short[0].toUpperCase() + short.slice(1) : 'New goal';
};

export function reducer(s, a) {
    switch (a.type) {
        case 'saveGoal': {
            // Reframing an existing goal updates it; a new one is active only while
            // there is room under the two-goal cap, otherwise it is parked.
            const existing = a.id && goalById(s, a.id);
            if (existing) {
                // The short title is only re-derived when the wording changes.
                const title = a.raw === existing.raw ? existing.title : titleOf(a.raw);
                return { ...s, goals: s.goals.map((g) => (g.id === a.id ? { ...g, raw: a.raw, title, dependsOnYes: a.dependsOnYes, actions: a.actions } : g)) };
            }
            const id = `g${s.seq}`;
            const status = activeGoals(s).length < MAX_ACTIVE_GOALS ? 'active' : 'parked';
            return {
                ...s,
                seq: s.seq + 1,
                goals: [...s.goals, { id, raw: a.raw, title: titleOf(a.raw), dependsOnYes: a.dependsOnYes, actions: a.actions, status }],
            };
        }
        case 'park':
            return { ...s, goals: s.goals.map((g) => (g.id === a.id ? { ...g, status: 'parked' } : g)) };
        case 'activate':
            if (activeGoals(s).length >= MAX_ACTIVE_GOALS) return s;
            return { ...s, goals: s.goals.map((g) => (g.id === a.id ? { ...g, status: 'active' } : g)) };
        case 'addWin': {
            const text = a.text.trim();
            if (!text || weekFor(s, a.goalId).length >= MAX_WINS_PER_GOAL) return s;
            const id = `w${s.seq}`;
            return { ...s, seq: s.seq + 1, week: [...s.week, { id, goalId: a.goalId, text, done: false }] };
        }
        case 'removeWin':
            return { ...s, week: s.week.filter((w) => w.id !== a.id), todayId: s.todayId === a.id ? null : s.todayId };
        case 'setToday':
            return { ...s, todayId: a.id };
        case 'tick': {
            const win = s.week.find((w) => w.id === a.id);
            if (!win || win.done) return s;
            return {
                ...s,
                seq: s.seq + 1,
                week: s.week.map((w) => (w.id === a.id ? { ...w, done: true } : w)),
                log: [{ id: `l${s.seq}`, winId: win.id, goalId: win.goalId, text: win.text, ago: 0, note: (a.note || '').trim() }, ...s.log],
            };
        }
        case 'untick':
            return { ...s, week: s.week.map((w) => (w.id === a.id ? { ...w, done: false } : w)), log: s.log.filter((e) => !(e.winId === a.id && e.ago === 0)) };
        case 'setNote':
            return { ...s, log: s.log.map((e) => (e.id === a.id ? { ...e, note: a.note } : e)) };
        case 'addBackfill': {
            const text = a.text.trim();
            if (!text) return s;
            return { ...s, seq: s.seq + 1, backfill: [{ id: `b${s.seq}`, text, when: 'earlier' }, ...s.backfill] };
        }
        case 'review':
            return { ...s, review: { ...s.review, ...a.patch } };
        case 'setReminder':
            return { ...s, reminder: a.time };
        case 'toggleShare':
            return { ...s, shareRecap: !s.shareRecap };
        case 'reset':
            return initialState();
        default:
            return s;
    }
}

export const smallWinsUrl = (r) => {
    switch (r.name) {
        case 'reframe':
            return r.fresh ? 'small wins · /goals/new' : 'small wins · /goals/reframe';
        case 'week':
            return 'small wins · /week';
        case 'today':
            return 'small wins · /today';
        case 'log':
            return 'small wins · /wins';
        case 'review':
            return 'small wins · /review';
        case 'goals':
            return 'small wins · /goals';
        default:
            return 'small wins';
    }
};
