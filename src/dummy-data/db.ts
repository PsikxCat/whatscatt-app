import { Message, ConversationType } from '@/types'

export const conversations: ConversationType[] = [
  {
    _id: '1',
    isGroup: true,
    admin: 'user1',
    chatImage: null,
    chatName: 'Grupo de amigos',
    participants: ['user1', 'user2', 'user3'],
    _creationTime: 1718274840, // Unix timestamp para 2024-06-13 10:34:00 UTC
    lastMessage: {
      _id: '1',
      messageType: Message.Text,
      content: 'Hola a todos!',
      sender: 'user1',
      _creationTime: 1718274840, // Unix timestamp para 2024-06-13 10:34:00 UTC
    },
    sender: 'user1',
    isOnline: true,
  },
  {
    _id: '2',
    isGroup: false,
    admin: null,
    chatImage: 'https://avatars.githubusercontent.com/u/98664927?s=96&v=4',
    chatName: null,
    participants: ['user4', 'user5'],
    _creationTime: 1718281380, // 2024-06-13 12:23:00 UTC
    lastMessage: {
      _id: '2',
      messageType: Message.Text,
      content: 'Hola!',
      sender: 'user2',
      _creationTime: 1718281380, // 2024-06-13 12:23:00 UTC
    },
    sender: 'user4',
    isOnline: true,
  },
  {
    _id: '3',
    isGroup: false,
    admin: null,
    chatImage: null,
    chatName: null,
    participants: ['user6', 'user7'],
    _creationTime: 1718283780, // 2024-06-13 13:03:00 UTC
    lastMessage: {
      _id: '3',
      messageType: Message.Image,
      content: 'image_url.jpg',
      sender: 'user6',
      _creationTime: 1718283780, // 2024-06-13 13:03:00 UTC
    },
    sender: 'user6',
    isOnline: false,
  },
  {
    _id: '4',
    isGroup: false,
    admin: null,
    chatImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
    chatName: null,
    participants: ['user8', 'user9', 'user10'],
    _creationTime: 1718284080, // 2024-06-13 13:08:00 UTC
    lastMessage: {
      _id: '4',
      messageType: Message.Video,
      content: 'video_url.mp4',
      sender: 'user9',
      _creationTime: 1718284080, // 2024-06-13 13:08:00 UTC
    },
    sender: 'user9',
    isOnline: true,
  },
]
