import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

// Word-by-word blur reveal scrubbed by scroll position.
// Adapted from Great UI's Blur Scroll Reveal (https://www.great-ui.com/components/blur-scroll-reveal)
// to render inline with surrounding text instead of as a centred hero block.

function BlurWord({ word, index, total, progress, stagger, duration, opacity, blur, y }) {
    const start = (index / Math.max(1, total)) * stagger;
    const end = Math.min(1, start + duration);

    const opacityVal = useTransform(progress, [start, end], opacity);
    const filterVal = useTransform(progress, [start, end], [`blur(${blur[0]})`, `blur(${blur[1]})`]);
    const yVal = useTransform(progress, [start, end], y);

    return (
        <motion.span
            className="inline-block will-change-[filter,opacity,transform]"
            style={{ opacity: opacityVal, filter: filterVal, y: yVal }}
        >
            {word}
        </motion.span>
    );
}

function BlurScrollReveal({
    as = 'p',
    text,
    className,
    offset = ['start end', 'end 75%'],
    stagger = 0.85,
    duration = 0.15,
    opacity = [0, 1],
    blur = ['8px', '0px'],
    y = ['6px', '0px'],
    ...props
}) {
    const Tag = as;
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset });

    if (reduceMotion) {
        return (
            <Tag ref={ref} className={className} {...props}>
                {text}
            </Tag>
        );
    }

    const words = text.split(/\s+/).filter(Boolean);

    return (
        <Tag ref={ref} className={className} {...props}>
            {words.map((word, i) => (
                <React.Fragment key={i}>
                    {i > 0 && ' '}
                    <BlurWord
                        word={word}
                        index={i}
                        total={words.length}
                        progress={scrollYProgress}
                        stagger={stagger}
                        duration={duration}
                        opacity={opacity}
                        blur={blur}
                        y={y}
                    />
                </React.Fragment>
            ))}
        </Tag>
    );
}

export default BlurScrollReveal;
