import chalk from 'chalk';
import boxen from 'boxen';
import terminalLink from 'terminal-link';
import data from './lib/data.js';

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

// Wizard ASCII art (Braille) - colored with gradient effect
const wizardArt = [
  hotMagenta('  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠛⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿'),
  hotMagenta('  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⠄⠄⠄⠄⠈⠄⠈⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿'),
  hotMagenta('  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠄⠄⣠⣶⣷⣦⣠⡄⠄⠄⠈⣿⣿⣿⣿⣿⣿⣿⣿'),
  neonCyan('  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⡻⠟⠄⢰⣿⣿⣿⣿⣿⡿⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿'),
  neonCyan('  ⣿⣿⣿⣿⣿⣿⣿⣿⣽⢉⠁⠄⠚⠙⠻⢿⢿⣿⡀⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿'),
  neonCyan('  ⣿⣿⣿⣿⣿⣿⣿⣿⣃⠆⠄⠄⠄⠄⢀⡆⠄⠄⠄⠄⠠⠳⠃⡏⠈⢙⣿⣿⣿⣿'),
  electricGreen('  ⣿⣿⣿⣿⣿⣿⣿⣿⠯⠄⠓⣤⣦⡶⢿⠇⠄⠄⠄⠄⠄⡄⡜⠄⠄⠌⡫⣿⣿⣿'),
  electricGreen('  ⣿⣿⣿⣿⣿⣿⣿⡣⠁⠄⠄⠋⣤⣄⡀⠄⠄⠄⠄⠄⠄⢣⢍⠄⠄⠄⠆⣿⣿⣿'),
  electricGreen('  ⣿⣿⣿⠛⠛⠉⠙⢂⣠⡖⡀⠄⠓⠄⠄⠄⠄⠄⠄⢐⣾⣷⡀⠄⠄⠘⠄⣿⣿⣿'),
  terminalAmber('  ⣿⣿⣿⠄⠄⠄⠄⣿⣿⣿⣿⡝⡄⠄⠄⠄⠄⠄⠄⠄⠙⢿⣧⡀⠄⠄⢀⢿⣿⣿'),
  terminalAmber('  ⣿⣿⣿⡀⠄⠄⠄⢿⣿⣿⣿⣇⠁⣀⡀⠄⠄⠄⠄⠄⠄⠰⣿⡂⠄⠁⠄⠈⣿⣿')
];

// Build box content with proper padding (50 char inner width)
const boxWidth = 50;
const headerText = '>> AI_ALCHEMIST.exe';
const taglineText = '"' + data.tagline + '"';
const headerPadded = headerText.padEnd(boxWidth - 1);
const taglinePadded = taglineText.padEnd(boxWidth - 1);

// Cyberpunk styled output - vertical layout for better terminal compatibility

// Helper to fetch GitHub stats
async function getGitHubStats() {
  try {
    const response = await fetch(`https://api.github.com/users/${data.github}`);
    if (!response.ok) return null;
    const userData = await response.json();
    return {
      followers: userData.followers,
      repos: userData.public_repos
    };
  } catch (error) {
    return null;
  }
}

export async function getCard() {
  // Fetch stats (with timeout fallback to avoid hanging)
  const statsPromise = getGitHubStats();

  // Create a timeout promise
  const timeoutPromise = new Promise(resolve => setTimeout(resolve, 1500, null));

  // Race them - if fetch takes too long, just show card without stats
  const stats = await Promise.race([statsPromise, timeoutPromise]);

  let statsSection = '';
  if (stats) {
    const statLine = `${white.bold(stats.followers)} ${gray('Followers')} · ${white.bold(stats.repos)} ${gray('Repos')}`;
    statsSection = `
${dim('▀▀▀▀▀▀▀▀▀▀▀▀')} ${white.bold('GH_STATS')} ${dim('▀▀▀▀▀▀▀▀▀▀▀▀▀▀')}
  ${statLine}
`;
  }

  // Reconstruct output to include stats
  const output = `
${wizardArt.join('\n')}

  ${terminalAmber.bold(data.name)}
  ${white(data.title)}
  ${gray(data.location)}

${gray('╔' + '═'.repeat(boxWidth) + '╗')}
${gray('║')} ${neonPink('>>')} ${terminalAmber.bold('AI_ALCHEMIST.exe')}${' '.repeat(boxWidth - 20)}${gray('║')}
${gray('║')} ${dim.italic('"' + data.tagline + '"')}${' '.repeat(boxWidth - 49)}${gray('║')}
${gray('╚' + '═'.repeat(boxWidth) + '╝')}

  ${labelEmail}${emailLink}
  ${labelGithub}${githubLink}
  ${labelLinkedin}${linkedinLink}
  ${labelWeb}${webLink}
${statsSection}
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
