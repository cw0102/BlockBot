/**
 * Checks if the characters following `str[position]` are equal to `nextChars`
 * @param {string} str The string to search
 * @param {number} position The 0-indexed position in the string to start at
 * @param {string} nextChars The characters to search for
 * @return {boolean} Whether the text matches
 */
function nextCharactersAre(str, position, nextChars) {
  return str.slice(position, (position + nextChars.length)) == nextChars;
}

/**
 * Determines if a string is entirely ASCII alphabet characters
 * @param {string} str The string to test
 * @return {boolean} Whether the string is entirely ASCII alphabet characters
 */
function isAlpha(str) {
  return /^[A-Z]$/i.test(str);
}

/**
 * Parses out a discord id from a string position
 * @param {string} str The string to parse from
 * @param {number} pos The position of the string to start at
 * @return {string} The full discord ID (or null if it is not a valid ID)
 */
function getDiscordID(str, pos) {
  const idRegex = /<@[\d]+>/;
  const result = idRegex.exec(str.slice(pos));
  if (result == null) {
    return null;
  }
  return result[0];
}

/**
 * Parses out a discord custom emoji from a string position
 * @param {*} str The string to parse from
 * @param {*} pos The position of the string to start at
 * @return {string} The full emoji id (or null if it is not a valid ID)
 */
function getDiscordEmoji(str, pos) {
  const idRegex = /<:[\w~]+:[\d]+>/;
  const result = idRegex.exec(str.slice(pos));
  if (result == null) {
    return null;
  }
  return result[0];
}

/**
 * Turn a text message into regional block letters
 * @param {*} text The text to blockify
 * @return {string} The blockified string
 */
export function blockify(text) {
  let out = '';
  let skip = 0;
  for (let pos=0; pos < text.length; pos++) {
    if (skip > 0) {
      pos += skip - 1;
      skip = 0;
      continue;
    }

    const char = text[pos];

    if (isAlpha(char)) {
      if (nextCharactersAre(text, pos, 'up!')) {
        out += ':up:';
        skip = 2;
      } else if (nextCharactersAre(text, pos, 'cool')) {
        out += ':cool:';
        skip = 3;
      } else if (nextCharactersAre(text, pos, 'free')) {
        out += ':free:';
        skip = 3;
      } else if (nextCharactersAre(text, pos, 'back')) {
        out += ':back:';
        skip = 3;
      } else if (nextCharactersAre(text, pos, 'on!')) {
        out += ':on:';
        skip = 2;
      } else if (nextCharactersAre(text, pos, 'top')) {
        out += ':top:';
        skip = 2;
      } else if (nextCharactersAre(text, pos, 'soon')) {
        out += ':soon:';
        skip = 3;
      } else if (nextCharactersAre(text, pos, 'end')) {
        out += ':end:';
        skip = 2;
      } else if (nextCharactersAre(text, pos, 'new')) {
        out += ':new:';
        skip = 2;
      } else if (nextCharactersAre(text, pos, 'atm')) {
        out += ':atm:';
        skip = 2;
      } else if (nextCharactersAre(text, pos, 'sos')) {
        out += ':sos:';
        skip = 2;
      } else if (nextCharactersAre(text, pos, 'usa')) {
        out += ':flag_us:';
        skip = 2;
      } else if (nextCharactersAre(text, pos, 'mandy')) {
        out += ':mandymoore:';
        skip = 4;
      } else {
        out += `:regional_indicator_${char.toLowerCase()}:`;
      }
    } else if (nextCharactersAre(text, pos, '<@')) {
      const idStr = getDiscordID(text, pos);
      if (idStr != null) {
        out += idStr;
        skip = idStr.length;
      } else {
        out += char;
      }
    } else if (nextCharactersAre(text, pos, '<:')) {
      const emojiStr = getDiscordEmoji(text, pos);
      if (emojiStr != null) {
        out += emojiStr;
        skip = emojiStr.length;
      } else {
        out += char;
      }
    } else {
      switch (char) {
        case '0':
          out += ':zero:';
          break;
        case '1':
          out += ':one:';
          break;
        case '2':
          out += ':two:';
          break;
        case '3':
          out += ':three:';
          break;
        case '4':
          out += ':four:';
          break;
        case '5':
          out += ':five:';
          break;
        case '6':
          out += ':six:';
          break;
        case '7':
          out += ':seven:';
          break;
        case '8':
          out += ':eight:';
          break;
        case '9':
          out += ':nine:';
          break;
        case '?':
          out += ':question:';
          break;
        case '!':
          out += ':exclamation:';
          break;
        default:
          out += char;
      }
    }

    out += ' ';
  }

  return out.slice(0, out.length-1);
}
