import chalk from 'chalk';
import boxen from 'boxen';
import terminalLink from 'terminal-link';
import data from './lib/data.js';

// Color palette - mystical alchemist theme
const purple = chalk.hex('#9B59B6');
const gold = chalk.hex('#F1C40F');
const cyan = chalk.hex('#00D9FF');
const green = chalk.hex('#2ECC71');
const smoke = chalk.hex('#708090');
const smokeLight = chalk.hex('#B8B8B8');
const white = chalk.white;
const magenta = chalk.hex('#E056FD');
const orange = chalk.hex('#F39C12');
const dim = chalk.dim;
const blue = chalk.hex('#3498DB');

// Labels
const labelEmail = white.bold('Email');
const labelGithub = white.bold('GitHub');
const labelLinkedin = white.bold('LinkedIn');
const labelWeb = white.bold('Web');
const labelCard = white.bold('Card');

// Clickable links (hide fallback URL if terminal doesn't support)
const emailLink = terminalLink(cyan(data.email), `mailto:${data.email}`, { fallback: false });
const githubLink = terminalLink(purple('github.com/' + data.github), `https://github.com/${data.github}`, { fallback: false });
const linkedinLink = terminalLink(purple('linkedin.com/in/' + data.linkedin), `https://linkedin.com/in/${data.linkedin}`, { fallback: false });
const webLink = terminalLink(green(data.web), data.web, { fallback: false });

// Tech stack formatted
const techLine1 = blue(data.techStack.languages.slice(0, 4).join(' · '));
const techLine2 = magenta(data.techStack.ai.slice(0, 4).join(' · '));
const techLine3 = green(data.techStack.frameworks.slice(0, 4).join(' · '));

// Alchemist potion ASCII art with smoke containing name/title
const output = `
${smokeLight('                 · ˚ ✦ ˚ ·')}
${smoke('           ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░')}
${smoke('         ░▒░')}    ${gold.bold(data.name)}    ${smoke('░▒░')}
${smoke('         ░▒░')} ${cyan(data.title)} ${smoke('░▒░')}
${smoke('           ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░')}
${smokeLight('                 · ✦ · ✦ ·')}
${smoke('                   ░░░░░░░')}
${smoke('                     ░░░')}
${purple('                   ╔═════╗')}
${purple('                   ║     ║')}
${purple('               ╔═══╝     ╚═══╗')}
${magenta('               ║')}${green(' ░░▒▓███▓▒░░ ')}${magenta('║')}
${magenta('               ║')}${cyan(' ░░▒▓███▓▒░░ ')}${magenta('║')}
${magenta('               ║')}${green(' ░░▒▓███▓▒░░ ')}${magenta('║')}
${magenta('               ║')}${cyan(' ░░▒▓███▓▒░░ ')}${magenta('║')}
${purple('               ╚═════════════╝')}

${gold('              ~*~ AI Alchemist ~*~')}
${dim.italic('       "' + data.tagline + '"')}

   ${labelEmail}     ${emailLink}
   ${labelGithub}    ${githubLink}
   ${labelLinkedin}  ${linkedinLink}
   ${labelWeb}       ${webLink}

${dim('   ──────────────── Tech Stack ────────────────')}

   ${techLine1}
   ${techLine2}
   ${techLine3}

${dim('   ────────────────────────────────────────────')}

   ${labelCard}      ${orange(data.npx)}
`;

// Box it up with mystical purple border
const boxed = boxen(output, {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: '#9B59B6'
});

export function getCard() {
    return boxed;
}

export default function () {
    return boxed;
}
