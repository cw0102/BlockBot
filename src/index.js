import {Client} from 'discord.js';
import {discordToken, adminId} from './config.json';
import {blockify} from './blockify.js';

const client = new Client();
const enabled = new Set();

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (message.content == '!enable' && message.author.id == adminId) {
    enabled.add(message.channel.id);
    message.delete().then((msg) => {
      msg.channel.send(blockify('Blocked'));
    });
    return;
  } else if (message.content == '!disable' && message.author.id == adminId) {
    enabled.delete(message.channel.id);
    message.delete().then((msg) => {
      msg.channel.send(blockify('Unblocked'));
    });
    return;
  }

  if (enabled.has(message.channel.id) && !message.author.bot) {
    message.delete().then((msg) => {
      const newMessage = `${msg.author}: ${blockify(msg.content)}`;
      message.channel.send(newMessage);
    }).catch(console.error);
  }
});

client.login(discordToken);
