import React, { useReducer } from 'react';
import Showcase from '../showcase/Showcase.jsx';
import SmallWinsReplica from './SmallWinsReplica.jsx';
import SmallWinsDesign from './SmallWinsDesign.jsx';
import { S, SMALLWINS_FONT_HREF, fonts, initialState, reducer, smallWinsUrl } from '../../data/smallwins.js';

const TOUR = [
    {
        id: 'reframe',
        short: 'reframe',
        title: 'Reframe the goal',
        caption: 'Name a goal, answer one question, and turn it into actions you can finish alone. Try typing your own.',
        route: { name: 'reframe' },
        notes: ['"Get the job" depends on someone else saying yes, so it becomes a direction', 'The deadline in the sentence is set aside, not stored', 'Suggestions can be ticked, edited or ignored'],
    },
    {
        id: 'week',
        short: 'week',
        title: 'Pick weekly wins',
        caption: 'Up to three wins per goal. Add a fourth and the app asks you to swap one out.',
        route: { name: 'week' },
        notes: ['The cap keeps the week small enough to finish', 'A single win may carry a real date; a goal may not', 'Reminder copy never mentions a missed day'],
    },
    {
        id: 'today',
        short: 'today',
        title: 'The daily card',
        caption: 'One win, one tick, one optional line. Tick it and watch the wins log change.',
        route: { name: 'today' },
        notes: ['Check-in is built to take under ten seconds', 'Yellow marker appears only on finished wins', '"Days shown up" is a total, so it cannot break'],
    },
    {
        id: 'log',
        short: 'wins log',
        title: 'The wins log',
        caption: 'Every finished win on a dated timeline, with totals since the start. This becomes the home screen.',
        route: { name: 'log' },
        notes: ['Opens on what is done, not on what is left', 'An empty day is drawn as empty, never red', 'Backfill means the log has entries on day one'],
    },
    {
        id: 'review',
        short: 'review',
        title: 'Weekly review',
        caption: 'Three prompts. The first is filled in from the log, so you plan while looking at what you did.',
        route: { name: 'review' },
        notes: ['"Outside my control" gives setbacks a place to go', 'Built to take under three minutes', 'Sharing is off until you turn it on, for one person'],
    },
    {
        id: 'goals',
        short: 'goals',
        title: 'Two-goal cap',
        caption: 'A third goal can be parked but not made active. Park one to bring another back.',
        route: { name: 'goals' },
        notes: ['Urgency spreads effort; the cap holds it together', 'Parked goals keep everything and send no prompts', 'No feed, no leaderboard, no public profile'],
    },
];

const CSS = `
.sw-root{font-family:${fonts.ui};color:${S.ink};background:${S.haze}}
.sw-display{font-family:${fonts.display};font-optical-sizing:auto}
.sw-hand{font-family:${fonts.hand}}
.sw-mono{font-family:${fonts.mono};font-variant-numeric:tabular-nums}
.sw-mark{background-image:linear-gradient(transparent 54%,${S.marker} 54%,${S.marker} 94%,transparent 94%);background-repeat:no-repeat;background-size:100% 100%;-webkit-box-decoration-break:clone;box-decoration-break:clone;padding:0 .18em;margin:0 -.18em}
@keyframes sw-sweep{from{background-size:0 100%}to{background-size:100% 100%}}
@keyframes sw-pop{0%{transform:scale(.4)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
.sw-mark-in{animation:sw-sweep .55s ease-out both}
.sw-pop{animation:sw-pop .35s ease-out both}
@media (prefers-reduced-motion:reduce){.sw-mark-in,.sw-pop{animation:none}}
`;

function SmallWinsShowcase(props) {
    // The planner's state lives here, above the tabs, so ticks survive moving
    // between screens and between the demo and design views.
    const [state, dispatch] = useReducer(reducer, undefined, initialState);
    return (
        <Showcase
            {...props}
            tour={TOUR}
            frame="phone"
            renderDemo={(p) => <SmallWinsReplica {...p} state={state} dispatch={dispatch} />}
            renderDesign={(p) => <SmallWinsDesign {...p} state={state} dispatch={dispatch} />}
            urlFor={smallWinsUrl}
            designLabel="small wins — design system (concept)"
            fontId="smallwins-fonts"
            fontHref={SMALLWINS_FONT_HREF}
            css={CSS}
            rootClass="sw-root"
            accent={S.iris}
            stageBg={S.haze}
            chromeNote="concept · working demo"
            designNote="Small Wins has no shipped UI yet. This is an original concept direction for it; click a swatch to copy it."
        />
    );
}

export default SmallWinsShowcase;
