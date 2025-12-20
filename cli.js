#!/usr/bin/env node

import { getCard } from './index.js';
import { select } from '@inquirer/prompts';
import open from 'open';
import data from './lib/data.js';
import chalk from 'chalk';

// Cyberpunk colors
const neonCyan = chalk.hex('#00FFFF');
const hotMagenta = chalk.hex('#FF00FF');
const electricGreen = chalk.hex('#00FF00');
const terminalAmber = chalk.hex('#FFB000');
const gray = chalk.hex('#888888');
const dim = chalk.dim;

// Display the card
console.log(getCard());

// Cyberpunk styled menu
console.log(gray('┌─────────────────────────────────────────┐'));
console.log(gray('│') + hotMagenta(' >> ') + terminalAmber.bold('INTERFACE_MENU.exe') + '                 ' + gray('│'));
console.log(gray('└─────────────────────────────────────────┘'));

// Interactive menu with cyberpunk styling
const menuChoices = [
    { name: neonCyan('◢') + ' ' + chalk.white('OPEN_WEBSITE') + gray('.url'), value: 'website' },
    { name: hotMagenta('◢') + ' ' + chalk.white('VIEW_GITHUB') + gray('.repo'), value: 'github' },
    { name: electricGreen('◢') + ' ' + chalk.white('CONNECT_LINKEDIN') + gray('.profile'), value: 'linkedin' },
    { name: terminalAmber('◢') + ' ' + chalk.white('SEND_EMAIL') + gray('.msg'), value: 'email' },
    { name: gray('◢') + ' ' + chalk.white('EXIT_PROGRAM') + gray('.quit'), value: 'exit' }
];

async function showMenu() {
    try {
        const action = await select({
            message: hotMagenta('>>') + ' ' + chalk.white('SELECT_ACTION:'),
            choices: menuChoices
        });

        switch (action) {
            case 'website':
                console.log('\n' + electricGreen('█▓▒░') + ' Launching website...' + electricGreen('░▒▓█'));
                await open(data.web);
                break;
            case 'github':
                console.log('\n' + hotMagenta('█▓▒░') + ' Accessing GitHub...' + hotMagenta('░▒▓█'));
                await open(`https://github.com/${data.github}`);
                break;
            case 'linkedin':
                console.log('\n' + neonCyan('█▓▒░') + ' Connecting to LinkedIn...' + neonCyan('░▒▓█'));
                await open(`https://linkedin.com/in/${data.linkedin}`);
                break;
            case 'email':
                console.log('\n' + terminalAmber('█▓▒░') + ' Opening email client...' + terminalAmber('░▒▓█'));
                await open(`mailto:${data.email}`);
                break;
            case 'exit':
                console.log('\n' + dim('█▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓█'));
                console.log(gray('   >> ') + chalk.white('CONNECTION_TERMINATED'));
                console.log(gray('   >> ') + neonCyan('Thanks for visiting!') + hotMagenta(' ◈'));
                console.log(dim('█▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓█\n'));
                process.exit(0);
        }

        // Show menu again after action
        await showMenu();
    } catch (error) {
        // User pressed Ctrl+C
        console.log('\n' + dim('█▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓█'));
        console.log(gray('   >> ') + chalk.white('CONNECTION_TERMINATED'));
        console.log(gray('   >> ') + neonCyan('Thanks for visiting!') + hotMagenta(' ◈'));
        console.log(dim('█▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓█\n'));
        process.exit(0);
    }
}

// Start the interactive menu
showMenu();
