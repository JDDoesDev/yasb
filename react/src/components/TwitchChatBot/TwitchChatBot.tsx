import { ChatClient, ChatMessage } from '@twurple/chat';
import { useEffect, useState, FC } from 'react'

interface MessageObject {
  username?: string,
  emoteMessage: string | TrustedHTML,
}

const TwitchChatBot: FC = () => {
  const [messages, setMessages] = useState<MessageObject[]>([]);

  const parseEmotes = (message: string, { emotes }: any) => {
    if (!emotes) {
      return message;
    }

    // console.log(Object.entries(emotes))
    const emoteArray = Object.entries(emotes).map((emote) => {
      const emoteId = emote[0];

      // may be more than one if same emote used multiple times
      const positions: string[] = emote[1] as string[];
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
    const client = new ChatClient({
      channels: ["jddoesdev"],
      webSocket: true,
    });

    console.log(client);

    const handleChatMessage = (
      _channel: string,
      user: string,
      text: string,
      msg: ChatMessage
    ) => {
      console.log(msg, user, text);
      if (!self) {
        // const username = msg.userInfo.displayName;
        // const emoteMessage = parseEmotes(text, tags);
        // const newMessage = {
        //   username: username,
        //   emoteMessage: emoteMessage,
        // }

        // if (messages.length > 10) {
        //   messages.shift();
        // }
        // setMessages(messages => [...messages, newMessage]);
      }

    }
    client.connect();
    client.onMessage(handleChatMessage);

    return () => {
      client.quit()
    }
  }, [messages])

  return (
    <></>
    // <div className="message message-wrapper">
    //   <ul className="message-container">
    //     { messages.map(({ username, emoteMessage }, index) => (
    //       <li key={ index } className="message-item">
    //         <span className="message-username">
    //           { username }
    //         </span>
    //         <span className="message-message" dangerouslySetInnerHTML={{
    //           __html: emoteMessage
    //           }}
    //         />
    //       </li>
    //     )) }
    //   </ul>
    // </div>
  )
}

export default TwitchChatBot;
