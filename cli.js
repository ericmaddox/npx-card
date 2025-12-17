#!/usr/bin/env node

import { getCard } from './index.js';
import { select } from '@inquirer/prompts';
import open from 'open';
import data from './lib/data.js';

// Display the card
console.log(getCard());

// Interactive menu
const menuChoices = [
    { name: '🌐  Open Website', value: 'website' },
    { name: '💻  View GitHub', value: 'github' },
    { name: '💼  Connect on LinkedIn', value: 'linkedin' },
    { name: '📧  Send Email', value: 'email' },
    { name: '👋  Exit', value: 'exit' }
];

async function showMenu() {
    try {
        const action = await select({
            message: 'What would you like to do?',
            choices: menuChoices
        });

        switch (action) {
            case 'website':
                console.log('\n Opening website...');
                await open(data.web);
                break;
            case 'github':
                console.log('\n Opening GitHub...');
                await open(`https://github.com/${data.github}`);
                break;
            case 'linkedin':
                console.log('\n Opening LinkedIn...');
                await open(`https://linkedin.com/in/${data.linkedin}`);
                break;
            case 'email':
                console.log('\n Opening email client...');
                await open(`mailto:${data.email}`);
                break;
            case 'exit':
                console.log('\n Thanks for stopping by! 👋\n');
                process.exit(0);
        }

        // Show menu again after action
        await showMenu();
    } catch (error) {
        // User pressed Ctrl+C
        console.log('\n Thanks for stopping by! 👋\n');
        process.exit(0);
    }
}

// Start the interactive menu
showMenu();
