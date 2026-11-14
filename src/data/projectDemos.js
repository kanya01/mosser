// Scripted walkthroughs for the "run demo" previews in the projects section.
// Each step renders one screen; the screen `type` picks a renderer in
// components/DemoScreen.jsx, which animates it over the step's progress (0 → 1).

export const STEP_MS = 5200;
export const TICK_MS = 100;

export const projectDemos = {
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
