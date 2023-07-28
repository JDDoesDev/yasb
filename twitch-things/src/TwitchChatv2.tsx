import tmi, { ChatUserstate } from 'tmi.js';
import { useEffect, useState, FC } from 'react'

interface MessageObject {
  username?: string,
  emoteMessage: string | TrustedHTML,
}

const TwitchChatBot: FC = () => {
  const [messages, setMessages] = useState<MessageObject[]>([]);

  const parseEmotes = (message: string, { emotes }: ChatUserstate) => {
    if (!emotes) {
      return message;
    }

    // console.log(Object.entries(emotes))
    const emoteArray = Object.entries(emotes).map((emote) => {
      const emoteId = emote[0];

      // may be more than one if same emote used multiple times
      const positions = emote[1];
      const currentPosition = positions[0];
      const [start, end] = currentPosition.split('-');

      const stringToReplace = message.substring(
        parseInt(start, 10),
        parseInt(end, 10) + 1
      );

      const emoteImg = `<img src=https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/dark/1.0 />`

      const replaceValues = {
        stringToReplace: stringToReplace,
        replacement: emoteImg
      };

      // Cycle through message and find matching strings.

      return replaceValues;
    })

    const messageArray = message.split(' ');

    const parsedMessageArray = messageArray.map((word) => {

      emoteArray.forEach((emoteObject) => {
        if (word === emoteObject.stringToReplace) {
          word = emoteObject.replacement;
        }
      })
      return word;
    })

    const parsedMessage = parsedMessageArray.join(' ');

    return parsedMessage;
  }

  useEffect(() => {
    const client = new tmi.Client({
      channels: ["jddoesdev"],
    });

    const handleChatMessage = (
      _channel: string,
      tags: ChatUserstate,
      message: string,
      self: boolean
    ) => {

      if (!self) {
        const username = tags['display-name'];
        const emoteMessage = parseEmotes(message, tags);
        const newMessage = {
          username: username,
          emoteMessage: emoteMessage,
        }

        if (messages.length > 10) {
          messages.shift();
        }
        setMessages(messages => [...messages, newMessage]);
      }

    }
    client.connect().catch(console.error);
    client.on('message', handleChatMessage);

    return () => {
      client.disconnect()
    }
  }, [messages])

  return (
    <div className="message message-wrapper">
      <ul className="message-container">
        { messages.map(({ username, emoteMessage }, index) => (
          <li key={ index } className="message-item">
            <span className="message-username">
              { username }
            </span>
            <span className="message-message" dangerouslySetInnerHTML={{
              __html: emoteMessage
              }}
            />
          </li>
        )) }
      </ul>
    </div>
  )
}

export default TwitchChatBot;
