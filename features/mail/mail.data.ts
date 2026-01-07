export interface Email {
    id: string;
    sender: string;
    subject: string;
    preview: string;
    content: string;
    time: string;
    read: boolean;
    tag: 'work' | 'personal' | 'social';
}

export const MOCK_MAILS: Email[] = [
    {
        id: '1',
        sender: 'Pratik Pawar',
        subject: 'Welcome to PhoneOS 2.0',
        preview: 'Thanks for checking out my portfolio! This project showcases...',
        content: `Hi there,

Thank you for visiting my portfolio!

PhoneOS 2.0 is designed to be a unique, interactive experience that showcases my skills in React, TypeScript, and UI design.

Feel free to explore the apps, change the theme in Settings, and check out my projects in the Store.

Best,
Pratik`,
        time: '10:30 AM',
        read: false,
        tag: 'personal'
    },



    {
        id: '5',
        sender: 'Dev.to',
        subject: 'Your weekly digest: React 19 is out!',
        preview: 'Top posts from the week: React 19 features, CSS nesting...',
        content: `Weekly Digest:

1. React 19: Everything you need to know
2. CSS Nesting is finally here
3. Why TypeScript is still king

Read more on Dev.to.`,
        time: '1 week ago',
        read: true,
        tag: 'work'
    }
];
