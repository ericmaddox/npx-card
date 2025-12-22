import chalk from 'chalk';
import boxen from 'boxen';
import terminalLink from 'terminal-link';
import data from './lib/data.js';
import terminalImage from 'terminal-image';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Color palette - cyberpunk theme
const neonCyan = chalk.hex('#00FFFF');
const hotMagenta = chalk.hex('#FF00FF');
const electricGreen = chalk.hex('#00FF00');
const terminalAmber = chalk.hex('#FFB000');
const neonPink = chalk.hex('#FF1493');
const white = chalk.white;
const dim = chalk.dim;
const gray = chalk.hex('#888888');

// Labels with cyberpunk brackets
const labelEmail = gray('[') + white.bold('EMAIL') + gray(']    ');
const labelGithub = gray('[') + white.bold('GITHUB') + gray(']   ');
const labelLinkedin = gray('[') + white.bold('LINKEDIN') + gray('] ');
const labelWeb = gray('[') + white.bold('WEB') + gray(']      ');

// Clickable links
const emailLink = terminalLink(neonCyan(data.email), `mailto:${data.email}`, { fallback: false });
const githubLink = terminalLink(hotMagenta('github.com/' + data.github), `https://github.com/${data.github}`, { fallback: false });
const linkedinLink = terminalLink(hotMagenta('linkedin.com/in/' + data.linkedin), `https://linkedin.com/in/${data.linkedin}`, { fallback: false });
const webLink = terminalLink(electricGreen(data.web), data.web, { fallback: false });

// Tech stack formatted - shorter
const techLine1 = neonCyan(data.techStack.languages.slice(0, 3).join(' · '));
const techLine2 = hotMagenta(data.techStack.ai.slice(0, 3).join(' · '));
const techLine3 = electricGreen(data.techStack.frameworks.slice(0, 3).join(' · '));



// Build box content with proper padding (50 char inner width)
// Build box content with proper padding (54 char inner width to fit tagline)
// Build box content with proper padding (80 char inner width to fit large art)
const boxWidth = 80;
const headerText = '>> AI_ALCHEMIST.exe';
const taglineText = '"' + data.tagline + '"';

// Cyberpunk styled output - vertical layout for better terminal compatibility

export async function getCard() {
  // Calculate dynamic padding
  const headerPadding = Math.max(0, boxWidth - headerText.length - 2 - 1); // -2 for arrows, -1 for space
  const taglinePadding = Math.max(0, boxWidth - taglineText.length - 1); // -1 for space

  // Render Image
  const imagePath = path.join(__dirname, 'assets', 'npx_cardv5.png');
  let imageOutput = '';
  try {
    imageOutput = await terminalImage.file(imagePath, { width: '50%' });
  } catch (e) {
    imageOutput = gray('[Image rendering failed in this terminal]');
  }

  const output = `
${imageOutput}

  ${terminalAmber.bold(data.name)}
  ${white(data.title)}
  ${gray(data.location)}

${gray('╔' + '═'.repeat(boxWidth) + '╗')}
${gray('║')} ${neonPink('>>')} ${terminalAmber.bold('AI_ALCHEMIST.exe')}${' '.repeat(headerPadding)}${gray('║')}
${gray('║')} ${dim.italic(taglineText)}${' '.repeat(taglinePadding)}${gray('║')}
${gray('╚' + '═'.repeat(boxWidth) + '╝')}

  ${labelEmail}${emailLink}
  ${labelGithub}${githubLink}
  ${labelLinkedin}${linkedinLink}
  ${labelWeb}${webLink}

${dim('▀▀▀▀▀▀▀▀▀▀▀▀')} ${neonCyan.bold('TECH_STACK')} ${dim('▀▀▀▀▀▀▀▀▀▀▀▀')}
  ${gray('░')} ${techLine1}
  ${gray('░')} ${techLine2}
  ${gray('░')} ${techLine3}
${dim('▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄')}

  ${gray('>')} ${white.bold('RUN:')} ${terminalAmber(data.npx)}
${dim('█▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓█')}
`;

  return boxen(output, {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: '#FF00FF'
  });
}

export default async function () {
  return await getCard();
}
