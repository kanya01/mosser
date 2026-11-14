import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, GraduationCap, Hammer } from 'lucide-react';
import DarkModeToggle from '../DarkModeToggle';

const sans = { fontFamily: 'system-ui, sans-serif' };

const problemParts = [
    ['Goals are outcomes you do not control', '“Get the job” depends on someone else saying yes.'],
    ['Calendar deadlines create panic, not action', '“Before the year ends” is arbitrary, but it feels final.'],
    ['Progress is invisible', 'Tools show what is left to do and hide what is done.'],
    ['A missed day feels like failure', 'Streak trackers reset to zero, so people quit after one slip.'],
    ['Effort scatters', 'Urgency pushes people to start ten things and finish none.'],
];

const researchStats = [
    { value: '238', label: 'People in Amabile and Kramer’s diary study' },
    { value: '~12,000', label: 'Daily diary entries analysed' },
    { value: '2', label: 'Active goals, at most' },
    { value: '0', label: 'Streaks, countdowns or overdue states' },
];

const targetUsers = [
    { icon: Briefcase, segment: 'Job seekers and career changers', situation: 'Weeks of applications, few replies', need: 'Proof of effort that does not depend on replies', first: true },
    { icon: GraduationCap, segment: 'Students and early-career', situation: 'Measuring themselves against peers’ milestones', need: 'A private measure of their own progress' },
    { icon: Hammer, segment: 'Solo builders and freelancers', situation: 'One big project, no manager, no feedback loop', need: 'Structure and a weekly sense of movement' },
];

const principles = [
    ['Pick a win you control', 'Rewrites every goal as an action the user can finish alone. Asks: “Does this depend on someone else saying yes?”', 'Track outcomes such as offers, followers or revenue as the daily measure'],
    ['Drop the deadline', 'Goals have no due date. The only horizons are today and this week.', 'Show overdue items, countdowns or red states'],
    ['Count what has already moved', 'Keeps a wins log of every finished action, with totals since the user started.', 'Open on a list of what is left to do'],
    ['A missed day is data', 'Counts total days shown up, which never resets.', 'Use streaks that fall back to zero'],
    ['One or two things, not ten', 'Caps active goals at two.', 'Let urgency spread effort across many goals'],
    ['No comparison', 'Everything is private. Sharing is opt-in, with one trusted person.', 'Add feeds, leaderboards or public profiles'],
];

const concepts = [
    { name: 'A. Daily Card', idea: 'One card a day: today’s win, a tick, one line on what moved.', strength: 'Takes under a minute a day, so the habit can form', risk: 'Too thin to stand out without the wins log', effort: 'Low', role: 'The daily habit' },
    { name: 'B. Breakdown Coach', idea: 'A guided conversation turns a goal into controllable wins and reflects entries back each week.', strength: 'Strongest difference from existing planners', risk: 'Advice quality, running cost, can feel preachy', effort: 'High', role: 'The setup moment' },
    { name: 'C. Progress Ledger', idea: 'Diary first: the user writes freely and the app pulls wins into a timeline.', strength: 'Best at showing what has already moved', risk: 'Blank-page problem; needs writing every day', effort: 'Medium', role: 'The payoff on looking back' },
];

const features = [
    ['Goal reframe', 'User enters a goal; the app prompts them to rewrite it as actions they can finish alone', 'P0', 'Every active goal has at least one action that needs nobody else’s yes'],
    ['Weekly wins', 'User picks up to three wins per goal for the week', 'P0', 'A week cannot hold more than three wins per goal'],
    ['Daily card', 'One win for today, a tick, an optional one-line note', 'P0', 'Check-in takes under 10 seconds'],
    ['Wins log', 'Every finished win lands in a dated timeline with totals since the start', 'P0', 'The log is the home screen after the first tick'],
    ['Weekly review', 'Three prompts: what moved, what was outside my control, what next', 'P0', 'Review takes under 3 minutes'],
    ['No-deadline default', 'Goals carry no date; nothing is ever shown as overdue', 'P0', 'No red, late or countdown state exists in the app'],
    ['Two-goal cap', 'A third goal can be parked but not made active', 'P0', 'Parked goals are saved without daily prompts'],
    ['Gentle reminder', 'One notification a day at a time the user sets', 'P0', 'Copy never mentions missed days'],
    ['Backfill', 'Onboarding asks for three things that moved in the last 12 months', 'P1', 'The wins log is not empty on day one'],
    ['Breakdown assistant', 'AI suggests controllable actions for a goal the user types', 'P1', 'User can accept, edit or ignore each suggestion'],
    ['Share a recap', 'Send the weekly review to one chosen person', 'P1', 'Sharing is off until the user turns it on'],
    ['Look-back view', 'Monthly summary of wins and days shown up', 'P2', 'Summary uses the user’s own entries only'],
];

const loop = ['Reframe the goal', 'Pick weekly wins', 'One win for today', 'Do it, tick it', 'Wins log', 'Weekly review'];

const competitors = [
    ['Streaks', 'An unbroken daily chain across up to 24 tasks; Apple devices only', 'A broken chain is the exact failure state this product removes'],
    ['Habitica', 'A role-playing game where habits level up a character', 'Rewards repetition, not progress on one meaningful goal'],
    ['Finch', 'A virtual pet grows as the user completes self-care habits, with mood tracking and journaling', 'Closest in tone, but has no planning or goal-breakdown layer'],
    ['Fabulous', 'Guided multi-week journeys and daily routine builders', 'Prescribes routines; does not start from the user’s own goal'],
    ['Strides', 'SMART goal and habit trackers with numeric targets', 'Keeps the number and the date at the centre'],
    ['Griply', 'Habits link to a bigger goal and show progress toward its deadline', 'Closest in structure, but still led by the deadline'],
];

const metrics = [
    ['Weekly reviewers', '40% of active users', 'North star. Shows the full loop is working, not only the daily tick'],
    ['Return after a missed day', '50% back within 3 days', 'The direct test of “a missed day is data”'],
    ['Wins logged per active user', '3 or more a week', 'Confirms wins are small enough to finish'],
    ['Week-4 retention', '20%', 'Planner apps lose most users in the first month'],
    ['Felt progress (1 to 5 survey)', 'Up 1 point by week 4', 'The product exists to change this feeling'],
];

const phases = [
    { step: 0, title: 'Validate', length: '2 weeks', description: '10 user interviews; a paper diary with 5 people', gate: 'Gate 1: 3 of 5 still using it on day 14' },
    { step: 1, title: 'Prototype', length: '4 weeks', description: 'Daily card + wins log; 20 testers on web', gate: 'Gate 2: 40% do a weekly review in week 2' },
    { step: 2, title: 'Beta', length: '8 weeks', description: 'All P0 features; 100 users on mobile', gate: 'Gate 3: week-4 retention of 20% or more' },
    { step: 3, title: 'Launch', length: 'ongoing', description: 'P1 features; pricing test', gate: null },
];

const expansion = [
    ['Wins log as evidence', 'CV bullets, interview stories and a quarterly “what I did” summary, built from the user’s own entries', 'Moves the product from “feel better” to a usable result'],
    ['Segment packs', 'Job search pack first: applications reframed as controllable actions, interview prep wins, follow-up prompts. Student and solo-builder packs later.', 'Each pack sells against one sharp pain'],
    ['Institutions', 'Per-seat licences for university careers teams, bootcamps and coaches', 'One contract replaces hundreds of consumer subscriptions, with lower churn'],
];

const risks = [
    ['The app adds guilt', 'No streaks, no overdue state, reminder copy reviewed against the principles'],
    ['AI suggestions are generic or preachy', 'Keep AI out of the P0 scope; every suggestion is editable and optional'],
    ['A user is in real distress', 'State clearly that this is a planner, not mental-health care, and point to support services'],
    ['Diary entries are sensitive', 'Private by default, minimal data collected, export and delete available'],
    ['Crowded market, low willingness to pay', 'Launch to one segment (job seekers) and test pricing only after retention holds'],
];

const openQuestions = [
    'What is the product called?',
    'Web app first, or iOS first?',
    'Does the breakdown assistant belong in the MVP, or after it?',
    'Is £5 a month the right paid-tier price, and which institution is the first pilot?',
    'Who are the first five testers for the paper-diary trial?',
    'Hands-on test of the six competitor apps to confirm the gap',
];

function SectionHead({ kicker, lead, accent }) {
    return (
        <div className="mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={sans}>
                {kicker}
            </span>
            <h2 className="text-3xl md:text-4xl font-normal">
                <span className="text-stone-900 dark:text-stone-100">{lead} </span>
                <span className="italic text-violet-600 dark:text-violet-400">{accent}</span>
            </h2>
        </div>
    );
}

const th = 'px-4 py-3 text-left text-xs uppercase tracking-wide font-medium text-stone-500 dark:text-stone-400';
const td = 'px-4 py-3 align-top text-sm text-stone-600 dark:text-stone-400';

function Table({ head, rows, firstBold = true }) {
    return (
        <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-lg" style={sans}>
            <table className="w-full min-w-[560px] border-collapse">
                <thead className="bg-stone-100 dark:bg-stone-800/60">
                    <tr>
                        {head.map((h) => (
                            <th key={h} scope="col" className={th}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} className="border-t border-stone-200 dark:border-stone-800">
                            {row.map((cell, j) => (
                                <td key={j} className={`${td} ${firstBold && j === 0 ? 'font-medium text-stone-900 dark:text-stone-100' : ''}`}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const priorityClass = {
    P0: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
    P1: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    P2: 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400',
};

const SmallWinsCase = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group" style={sans}>
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Portfolio</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <span className="hidden sm:inline text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400" style={sans}>
                            PRD &amp; Product Plan
                        </span>
                        <DarkModeToggle />
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className={`pt-32 pb-20 px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400" style={sans}>
                            Product Concept
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400" style={sans}>
                            Concept Phase · Nov 2026
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-normal mb-6">
                        <span className="text-stone-900 dark:text-stone-100">Small </span>
                        <span className="italic text-violet-600 dark:text-violet-400">Wins</span>
                    </h1>

                    <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl" style={sans}>
                        A planner-diary that turns one big, anxious goal into an action you can finish today, and keeps a visible record of what has
                        already moved. It is for the feeling of &ldquo;I need a win before time runs out&rdquo;.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-8">
                        {['Product Strategy', 'PRD', 'Behavioural Design', 'Concept Design', 'Working Prototype'].map((tag) => (
                            <span key={tag} className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-sm" style={sans}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="mt-8 text-sm text-stone-500 dark:text-stone-400" style={sans}>
                        Small Wins is a working title. A clickable demo and the concept design system are on the{' '}
                        <Link to="/#projects" className="underline underline-offset-4 hover:text-stone-900 dark:hover:text-stone-100">portfolio page</Link>
                        , under &ldquo;open demo + design&rdquo;.
                    </p>
                </div>
            </section>

            {/* Problem */}
            <section className="py-20 px-6 bg-stone-900 text-stone-50">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs tracking-[0.3em] uppercase text-stone-400 block mb-4" style={sans}>
                        The Problem
                    </span>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed">
                        Most planners make that feeling worse. They show deadlines, overdue lists and broken streaks, which measure how far behind you
                        are. This product measures how far you have come.
                    </p>
                    <ol className="mt-12 grid md:grid-cols-2 gap-x-10 gap-y-6" style={sans}>
                        {problemParts.map(([title, body], i) => (
                            <li key={title} className="flex gap-4">
                                <span className="text-stone-500 tabular-nums">0{i + 1}</span>
                                <span>
                                    <span className="block text-stone-50">{title}</span>
                                    <span className="block text-sm text-stone-400 mt-1">{body}</span>
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Research finding */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {researchStats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl md:text-5xl font-normal text-violet-600 dark:text-violet-400 mb-2">{stat.value}</div>
                                <div className="text-sm text-stone-600 dark:text-stone-400" style={sans}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                    <p className="max-w-3xl mx-auto mt-12 text-center text-stone-600 dark:text-stone-400 leading-relaxed" style={sans}>
                        The design rests on one research finding. In their diary study, Teresa Amabile and Steven Kramer found that progress in
                        meaningful work was the strongest lift to motivation, even when the step was small, and that setbacks hurt more than wins
                        helped. So the product has two duties: make small progress visible every day, and take the sting out of setbacks.
                    </p>
                </div>
            </section>

            {/* Target Users */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-6xl mx-auto">
                    <SectionHead kicker="Users" lead="Target" accent="users" />
                    <p className="max-w-3xl -mt-6 mb-10 text-stone-600 dark:text-stone-400" style={sans}>
                        People aged roughly 18 to 30 working on one or two self-directed goals with nobody giving them feedback. It is not for teams, for
                        people who want a full task manager, or for clinical mental-health needs.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {targetUsers.map((user) => {
                            const Icon = user.icon;
                            return (
                                <div key={user.segment} className="border border-stone-200 dark:border-stone-800 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 bg-violet-50 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                        </div>
                                        {user.first && (
                                            <span className="text-xs px-2 py-1 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300" style={sans}>
                                                First launch segment
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">{user.segment}</h3>
                                    <div className="space-y-3" style={sans}>
                                        <div>
                                            <span className="text-xs uppercase tracking-wide text-stone-400 dark:text-stone-500">Situation</span>
                                            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1">{user.situation}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs uppercase tracking-wide text-stone-400 dark:text-stone-500">What they need</span>
                                            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1">{user.need}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <SectionHead kicker="Principles" lead="Six behaviours, each one" accent="rules something out" />
                    <p className="max-w-3xl -mt-6 mb-10 text-stone-600 dark:text-stone-400" style={sans}>
                        A feature that breaks a principle does not ship.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {principles.map(([name, does, never], i) => (
                            <div key={name} className="border border-stone-200 dark:border-stone-800 rounded-lg p-6">
                                <span className="text-sm text-violet-600 dark:text-violet-400 tabular-nums" style={sans}>0{i + 1}</span>
                                <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mt-2 mb-3">{name}</h3>
                                <p className="text-stone-600 dark:text-stone-400 text-sm" style={sans}>{does}</p>
                                <p className="text-stone-500 dark:text-stone-500 text-sm mt-4 pt-4 border-t border-stone-200 dark:border-stone-800" style={sans}>
                                    <span className="text-xs uppercase tracking-wide block mb-1">Never</span>
                                    {never}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Concepts */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-6xl mx-auto">
                    <SectionHead kicker="Concepts" lead="Three layers of" accent="one product" />
                    <div className="grid md:grid-cols-3 gap-6">
                        {concepts.map((c) => (
                            <div key={c.name} className="border border-stone-200 dark:border-stone-800 rounded-lg p-6">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100">{c.name}</h3>
                                    <span className="text-xs px-2 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 whitespace-nowrap" style={sans}>
                                        {c.effort} effort
                                    </span>
                                </div>
                                <p className="text-stone-600 dark:text-stone-400 text-sm" style={sans}>{c.idea}</p>
                                <dl className="mt-4 space-y-3 text-sm" style={sans}>
                                    {[
                                        ['Strength', c.strength],
                                        ['Risk', c.risk],
                                        ['Gives', c.role],
                                    ].map(([k, v]) => (
                                        <div key={k}>
                                            <dt className="text-xs uppercase tracking-wide text-stone-400 dark:text-stone-500">{k}</dt>
                                            <dd className="text-stone-600 dark:text-stone-400 mt-1">{v}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        ))}
                    </div>
                    <p className="max-w-3xl mt-10 text-stone-600 dark:text-stone-400" style={sans}>
                        Recommendation: build the Daily Card as the core, borrow the breakdown step from the Coach for goal setup, and use the
                        Ledger&rsquo;s timeline as the wins log.
                    </p>
                </div>
            </section>

            {/* MVP */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <SectionHead kicker="MVP" lead="Eight must-haves and" accent="what follows" />
                    <Table
                        head={['#', 'Feature', 'Requirement', 'Priority', 'Done when']}
                        firstBold={false}
                        rows={features.map(([name, req, pr, done], i) => [
                            <span key="n" className="tabular-nums">{i + 1}</span>,
                            <span key="f" className="font-medium text-stone-900 dark:text-stone-100">{name}</span>,
                            req,
                            <span key="p" className={`text-xs px-2 py-1 rounded-full ${priorityClass[pr]}`}>{pr}</span>,
                            done,
                        ])}
                    />
                    <p className="max-w-3xl mt-8 text-sm text-stone-600 dark:text-stone-400" style={sans}>
                        Real-world dates still exist, such as an application closing date. A single win may carry a date; a goal may not. Out of scope:
                        social feeds, leaderboards, streak counters, team features and therapy-style content. Entries are private by default and work
                        offline.
                    </p>
                </div>
            </section>

            {/* Core loop */}
            <section className="py-20 px-6 bg-violet-700 dark:bg-violet-800 text-white">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="text-xs tracking-[0.3em] uppercase text-violet-200 block mb-6" style={sans}>
                        Core Loop
                    </span>
                    <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
                        Every tick lands in the wins log, and the log shapes next week. Setup happens once per goal; the loop runs daily inside a weekly
                        cycle.
                    </p>
                    <ol className="flex flex-wrap justify-center items-center gap-x-3 gap-y-4 mt-12 text-sm" style={sans}>
                        {loop.map((step, i) => (
                            <li key={step} className="flex items-center gap-3">
                                <span className={`px-4 py-2 rounded-full border ${step === 'Wins log' ? 'bg-white text-violet-800 border-white font-medium' : 'border-violet-300/60'}`}>
                                    {step}
                                </span>
                                <span aria-hidden="true" className="text-violet-200">{i === loop.length - 1 ? '↺' : '→'}</span>
                            </li>
                        ))}
                    </ol>
                    <p className="mt-8 text-sm text-violet-200" style={sans}>
                        Onboarding takes about three minutes: name one goal, rewrite it as actions, list three things that have already moved, then pick
                        up to three wins and a reminder time.
                    </p>
                </div>
            </section>

            {/* Competitive landscape */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <SectionHead kicker="Landscape" lead="Where existing apps" accent="fall short" />
                    <Table head={['Product', 'Approach', 'Where it falls short for this problem']} rows={competitors} />
                    <p className="max-w-3xl mt-8 text-sm text-stone-600 dark:text-stone-400" style={sans}>
                        Existing apps reward repetition or track a target. From their published descriptions, none of these six starts by rewriting the
                        goal into something the user controls, and none makes a record of past progress the main screen. These descriptions come from
                        comparison pages, one of them published by Griply itself, so a hands-on test of each app is still an open task.
                    </p>
                </div>
            </section>

            {/* Metrics */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-6xl mx-auto">
                    <SectionHead kicker="Measurement" lead="Success" accent="metrics" />
                    <Table head={['Metric', 'Starting target', 'Why it matters']} rows={metrics} />
                    <p className="max-w-3xl mt-8 text-sm text-stone-600 dark:text-stone-400" style={sans}>
                        Targets are starting hypotheses, to be reset after the first beta cohort. Two guardrails protect the principles: notification
                        opt-outs stay under 15%, and the share of users who say the app adds pressure stays under 10%.
                    </p>
                </div>
            </section>

            {/* Product plan */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <SectionHead kicker="Roadmap" lead="Four phases," accent="three gates" />
                    <p className="-mt-6 mb-10 text-stone-600 dark:text-stone-400" style={sans}>
                        The plan reaches a 100-user beta in about 14 weeks. Validation starts with a paper diary, so the loop is tested before any code
                        is written. If a gate is missed, the phase repeats with a changed design.
                    </p>
                    <div className="space-y-4">
                        {phases.map((item) => (
                            <div key={item.step}>
                                <div className={`flex items-center gap-4 p-4 rounded-lg border ${item.step === 0 ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800' : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-800'}`}>
                                    <div
                                        className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-medium ${item.step === 0 ? 'bg-violet-600 text-white' : 'bg-stone-300 dark:bg-stone-700 text-stone-600 dark:text-stone-400'}`}
                                        style={sans}
                                    >
                                        {item.step}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-stone-900 dark:text-stone-100">{item.title}</h3>
                                        <p className="text-sm text-stone-600 dark:text-stone-400" style={sans}>{item.description}</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400 whitespace-nowrap" style={sans}>
                                        {item.length}
                                    </span>
                                </div>
                                {item.gate && (
                                    <p className="ml-9 border-l-2 border-dashed border-violet-300 dark:border-violet-700 py-3 pl-8 text-sm text-violet-700 dark:text-violet-300" style={sans}>
                                        ◆ {item.gate}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing and expansion */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-6xl mx-auto">
                    <SectionHead kicker="Business" lead="Pricing and" accent="expansion" />
                    <p className="max-w-3xl -mt-6 mb-10 text-stone-600 dark:text-stone-400" style={sans}>
                        The price is justified by outputs people would otherwise pay for, not by more tracking features. The wins log is the asset: it
                        compounds with use and cannot be recreated in a rival app.
                    </p>
                    <Table head={['Route', 'What is offered', 'Why it supports a price']} rows={expansion} />

                    <div className="grid md:grid-cols-2 gap-6 mt-10">
                        {[
                            ['Free', 'One goal, daily card, weekly review, full wins log'],
                            ['Paid · about £5 a month or £35 a year', 'Second goal, breakdown assistant, evidence exports, look-back views, share a recap'],
                        ].map(([tier, includes]) => (
                            <div key={tier} className="border border-stone-200 dark:border-stone-800 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">{tier}</h3>
                                <p className="text-stone-600 dark:text-stone-400 text-sm" style={sans}>{includes}</p>
                            </div>
                        ))}
                    </div>
                    <p className="max-w-3xl mt-8 text-sm text-stone-600 dark:text-stone-400" style={sans}>
                        A user&rsquo;s own history is never paywalled, because that would break the trust the product depends on. Only the outputs built
                        from it are paid. The price is a starting hypothesis: rivals range from a one-off $5.99 (Streaks) to $9.99 a month or $69.99 a
                        year (Finch Plus), with Griply at $5.99 a month. Pricing is tested only after week-4 retention holds at Gate 3.
                    </p>
                </div>
            </section>

            {/* Risks */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <SectionHead kicker="Risks" lead="Risks and" accent="open questions" />
                    <p className="max-w-3xl -mt-6 mb-10 text-stone-600 dark:text-stone-400" style={sans}>
                        The largest risk is that the product becomes one more thing to feel behind on. The principles and the two guardrail metrics
                        exist to catch that early.
                    </p>
                    <Table head={['Risk', 'Mitigation']} rows={risks} />
                    <ul className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-3" style={sans}>
                        {openQuestions.map((q) => (
                            <li key={q} className="flex gap-3 text-stone-600 dark:text-stone-400">
                                <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 rounded border border-stone-400 dark:border-stone-600" />
                                {q}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-10 text-sm text-stone-500 dark:text-stone-400" style={sans}>
                        Sources: a summary of Amabile and Kramer&rsquo;s diary study (&ldquo;Surprise: Little Wins Motivate Employees Best&rdquo;), and
                        habit-tracker comparison pages published by Griply and Lifestack.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <section className="py-20 px-6 border-t border-stone-200 dark:border-stone-800">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-stone-500 dark:text-stone-400 mb-8" style={sans}>
                        This project is in the concept phase. The demo on the portfolio page is a working prototype with demo data.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200"
                        style={sans}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default SmallWinsCase;
