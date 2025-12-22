import chalk from 'chalk';
import boxen from 'boxen';
import terminalLink from 'terminal-link';
import data from './lib/data.js';
import terminalImage from 'terminal-image';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

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



// Build box content with consistent width
const contentWidth = 52;
const headerLabel = 'AI_ALCHEMIST.exe';
const taglineText = data.tagline;

// Cyberpunk styled output - vertical layout for better terminal compatibility

async function getEnvironmentData() {
  const platform = os.platform();
  const date = new Date();
  const hour = date.getHours();
  const timeStr = date.toLocaleTimeString();

  // Detect local user
  let username = 'Agent';
  try {
    const info = os.userInfo();
    if (info && info.username && !['root', 'admin', 'user'].includes(info.username.toLowerCase())) {
      username = info.username.charAt(0).toUpperCase() + info.username.slice(1);
    }
  } catch (e) {
    // Fallback to Agent
  }

  let greeting = `>> SYSTEM_ONLINE: Welcome, ${username}.`;

  if (hour >= 22 || hour < 5) {
    greeting = `>> Late night operations, ${username}? Welcome.`;
  } else if (platform === 'linux') {
    greeting = `>> Detected Linux environment. Optimized for shell performance. Welcome, ${username}.`;
  }

  let weatherData = 'Location: Unknown | Intelligence: Offline';
  try {
    const response = await fetch('https://wttr.in/?format=%l:+%c+%t', { signal: AbortSignal.timeout(3000) });
    if (response.ok) {
      weatherData = (await response.text()).trim();
      // Aggressively remove all non-ASCII characters and emojis to prevent misalignment
      weatherData = weatherData.replace(/[^\x20-\x7E]/g, '');
    }
  } catch (e) {
    weatherData = 'Signal Lost: Environment data unavailable';
  }

  return { greeting, weatherData, timeStr, platform };
}

export async function getCard() {
  const env = await getEnvironmentData();

  // Helper for consistent separator bars
  const makeBar = (label, color) => {
    const remaining = Math.max(0, contentWidth - label.length - 2);
    const leftCount = Math.floor(remaining / 2);
    const rightCount = remaining - leftCount;
    return dim('▀'.repeat(leftCount)) + ' ' + color.bold(label) + ' ' + dim('▀'.repeat(rightCount));
  };
  const bottomBar = dim('▄'.repeat(contentWidth));

  // Inner box padding calculation
  const innerBoxWidth = contentWidth - 4;
  const hContent = `${neonPink(' >> ')}${terminalAmber.bold(headerLabel)}`;
  const hRawLen = 4 + headerLabel.length;
  const hPad = ' '.repeat(Math.max(0, innerBoxWidth - hRawLen));

  const tContent = `${dim.italic(` "${taglineText}" `)}`;
  const tRawLen = taglineText.length + 4;
  const tPad = ' '.repeat(Math.max(0, innerBoxWidth - tRawLen));



  // Render Image
  const imagePath = path.join(__dirname, 'assets', 'npx_cardv5.png');
  let imageOutput = '';
  try {
    imageOutput = await terminalImage.file(imagePath, { width: 52 });
  } catch (e) {
    imageOutput = gray('[Image rendering failed in this terminal]');
  }

  // Helper for padding lines with ANSI codes correctly
  const fixLine = (text, visibleLen, targetWidth) => {
    return text + ' '.repeat(Math.max(0, targetWidth - visibleLen));
  };

  const textOutput = `
  ${imageOutput}

  ${fixLine(terminalAmber.bold(data.name), data.name.length, contentWidth)}
  ${fixLine(white(data.title), data.title.length, contentWidth)}
  ${fixLine(gray(data.location), data.location.length, contentWidth)}

  ${makeBar('SYSTEM_DIAGNOSTICS', neonCyan)}
    ${fixLine(electricGreen(env.greeting), env.greeting.length, contentWidth - 2)}
    ${gray('░')} ${fixLine(white('TIME: ') + neonCyan(env.timeStr), 6 + env.timeStr.length, contentWidth - 4)}
    ${gray('░')} ${fixLine(white('LOC:  ') + terminalAmber(env.weatherData), 6 + env.weatherData.length, contentWidth - 4)}
    ${gray('░')} ${fixLine(white('OS:   ') + hotMagenta(env.platform), 6 + env.platform.length, contentWidth - 4)}
  ${bottomBar}

  ${gray('╔' + '═'.repeat(innerBoxWidth) + '╗')}
  ${gray('║')}${hContent}${hPad}${gray('║')}
  ${gray('║')}${tContent}${tPad}${gray('║')}
  ${gray('╚' + '═'.repeat(innerBoxWidth) + '╝')}

  ${fixLine(labelEmail + emailLink, 9 + data.email.length, contentWidth)}
  ${fixLine(labelGithub + githubLink, 9 + 11 + data.github.length, contentWidth)}
  ${fixLine(labelLinkedin + linkedinLink, 11 + 16 + data.linkedin.length, contentWidth)}
  ${fixLine(labelWeb + webLink, 7 + data.web.length, contentWidth)}

  ${makeBar('TECH_STACK', neonCyan)}
    ${gray('░')} ${fixLine(techLine1, data.techStack.languages.slice(0, 3).join(' · ').length, contentWidth - 2)}
    ${gray('░')} ${fixLine(techLine2, data.techStack.ai.slice(0, 3).join(' · ').length, contentWidth - 2)}
    ${gray('░')} ${fixLine(techLine3, data.techStack.frameworks.slice(0, 3).join(' · ').length, contentWidth - 2)}
  ${bottomBar}

  ${gray('>')} ${fixLine(white.bold('RUN: ') + terminalAmber(data.npx), 5 + data.npx.length, contentWidth - 2)}
  ${dim('█▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓█')}
`;

  return boxen(textOutput, {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: '#FF00FF',
    width: 60
  });
}

export default async function () {
  return await getCard();
}
