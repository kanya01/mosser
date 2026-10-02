import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

// Adapted from Great UI's GithubCard (https://great-ui.com/components/github-card).
// Wraps any trigger (e.g. a link) and shows a GitHub snapshot on hover/focus.

const DAYS = 119; // 17 weeks
const LEVELS = ['#1a1a1a', '#0e4429', '#006d32', '#26a641', '#39d353'];
const MAX_TILT = 5;

// Module-level cache so the data is fetched at most once per page load.
let cache;
function loadGithub(username) {
    cache ??= Promise.all([
        fetch(`https://api.github.com/users/${username}`).then((r) => (r.ok ? r.json() : {})),
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}`).then((r) => (r.ok ? r.json() : {})),
    ])
        .then(([user, { contributions = [] }]) => {
            const today = new Date().toISOString().slice(0, 10);
            const days = contributions
                .filter((d) => d.date <= today)
                .sort((a, b) => a.date.localeCompare(b.date))
                .slice(-DAYS);
            return {
                name: user.name || user.login || username,
                avatar: user.avatar_url,
                repos: user.public_repos,
                followers: user.followers,
                days,
                total: days.reduce((sum, d) => sum + d.count, 0),
            };
        })
        .catch(() => null);
    return cache;
}

const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function GithubHoverCard({ username, children }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    const cardRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(useSpring(y, { stiffness: 300, damping: 20 }), [-1, 1], [MAX_TILT, -MAX_TILT]);
    const rotateY = useTransform(useSpring(x, { stiffness: 300, damping: 20 }), [-1, 1], [-MAX_TILT, MAX_TILT]);

    const show = () => {
        setOpen(true);
        if (!data) loadGithub(username).then(setData);
    };
    const hide = () => {
        setOpen(false);
        x.set(0);
        y.set(0);
    };
    const tilt = (e) => {
        if (reduceMotion || !cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width) * 2 - 1);
        y.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };

    const days = data?.days.length ? data.days : Array.from({ length: DAYS }, () => ({ level: 0 }));

    return (
        <span
            className="relative inline-block [perspective:1000px]"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            {children}
            <motion.div
                ref={cardRef}
                role="tooltip"
                aria-hidden={!open}
                onMouseMove={tilt}
                initial={false}
                animate={open ? 'visible' : 'hidden'}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformOrigin: 'bottom left' }}
                variants={{
                    hidden: { opacity: 0, y: 6, scale: 0.98, pointerEvents: 'none', transition: { duration: 0.15 } },
                    visible: {
                        opacity: 1, y: 0, scale: 1, pointerEvents: 'auto',
                        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                    },
                }}
                className="absolute bottom-full left-0 z-50 mb-3 w-[19rem] border border-dashed border-[#3a3a3a] bg-black/95 p-4 text-[12px] leading-normal shadow-xl backdrop-blur-md after:absolute after:left-0 after:top-full after:h-3 after:w-full"
            >
                <div className="mb-3 flex items-center gap-3">
                    <img
                        src={data?.avatar || `https://github.com/${username}.png`}
                        alt=""
                        className="h-10 w-10 border border-[#3a3a3a] object-cover"
                    />
                    <div>
                        <p className="text-white">{data?.name || username}</p>
                        <p className="text-[#8f8f8f]">
                            @{username}
                            {data?.repos != null && ` · ${data.repos} repos · ${data.followers} follower${data.followers === 1 ? '' : 's'}`}
                        </p>
                    </div>
                </div>

                <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
                    {days.map((day, i) => (
                        <div
                            key={day.date || i}
                            title={day.date && `${day.count} contributions on ${formatDate(day.date)}`}
                            style={{ backgroundColor: LEVELS[day.level] }}
                            className="h-[11px] w-[11px] rounded-[2px]"
                        />
                    ))}
                </div>

                <p className="mt-3 text-[#8f8f8f]">
                    {data ? `${data.total.toLocaleString()} contributions in the last 17 weeks` : 'loading…'}
                </p>
            </motion.div>
        </span>
    );
}
