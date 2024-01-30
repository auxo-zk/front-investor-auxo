import { IconMenuExplorer, IconPortfolio } from 'src/assets/svg/icon';

export const menu = [
    {
        icon: IconMenuExplorer,
        title: 'Explorer',
        url: '/explorer',
        children: [
            { title: 'Projects', url: '/explorer/projects' },
            { title: 'Campaigns', url: '/explorer/campaigns' },
        ] as { title: string; url: string }[],
    },
    {
        icon: IconPortfolio,
        title: 'Portfolio',
        url: '/portfolio',
        children: [] as { title: string; url: string }[],
    },
];
