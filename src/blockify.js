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
 * Determines if `pattern` starts at `pos` in a given `str`
 * @param {string} str The string to parse from
 * @param {number} pos The position of the string to start at
 * @param {RegExp} pattern The regex pattern to match
 * @return {string} The match if it exists, else null
 */
function findNextPattern(str, pos, pattern) {
  const regExPattern = RegExp(`^${pattern}`);
  const result = regExPattern.exec(str.slice(pos));
  if (result == null) {
    return null;
  }
  return result[0];
}

/**
 * Parses out a discord id from a string position
 * @param {string} str The string to parse from
 * @param {number} pos The position of the string to start at
 * @return {string} The full discord ID (or null if it is not a valid ID)
 */
function getDiscordID(str, pos) {
  return findNextPattern(str, pos, '<@[\\d]+>');
}

/**
 * Parses out a discord custom emoji from a string position
 * @param {string} str The string to parse from
 * @param {number} pos The position of the string to start at
 * @return {string} The full emoji id (or null if it is not a valid ID)
 */
function getDiscordEmoji(str, pos) {
  return findNextPattern(str, pos, '<:[\\w~]+:[\\d]+>');
}

/**
 * Parses out regular emoji from a string position
 * https://thekevinscott.com/emojis-in-javascript/
 * @param {string} str The string to parse from
 * @param {number} pos The position of the string to start at
 * @return {string} The emoji
 */
function getEmoji(str, pos) {
  return findNextPattern(str, pos, '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])');
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
      const customEmojiStr = getDiscordEmoji(text, pos);
      if (customEmojiStr != null) {
        out += customEmojiStr;
        skip = customEmojiStr.length;
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
        {
          const emoji = getEmoji(text, pos);
          if (emoji != null) {
            out += emoji;
            skip = emoji.length;
          } else {
            out += char;
          }
        }
      }
    }

    out += ' ';
  }

  return out.slice(0, out.length-1);
}
