import { Participant } from '@/types/training';

export const currentUser: Participant = {
  id: 'user-nikita',
  name: 'Никита Орлов',
  avatarColor: '#78ff8e',
  level: 'Средний',
  favoriteActivity: 'cycling',
};

export const mockUsers: Participant[] = [
  currentUser,
  {
    id: 'user-anna',
    name: 'Анна Морозова',
    avatarColor: '#60d4ff',
    level: 'Продвинутый',
    favoriteActivity: 'running',
  },
  {
    id: 'user-ilya',
    name: 'Илья Соколов',
    avatarColor: '#ffd166',
    level: 'Средний',
    favoriteActivity: 'cycling',
  },
  {
    id: 'user-maria',
    name: 'Мария Ветрова',
    avatarColor: '#ff7ab6',
    level: 'Новичок',
    favoriteActivity: 'walking',
  },
  {
    id: 'user-pavel',
    name: 'Павел Ким',
    avatarColor: '#9b8cff',
    level: 'Продвинутый',
    favoriteActivity: 'fitness',
  },
  {
    id: 'user-lena',
    name: 'Елена Романова',
    avatarColor: '#4ee0b4',
    level: 'Средний',
    favoriteActivity: 'running',
  },
  {
    id: 'user-dima',
    name: 'Дмитрий Волков',
    avatarColor: '#ff9f68',
    level: 'Опытный',
    favoriteActivity: 'cycling',
  },
  {
    id: 'user-sasha',
    name: 'Саша Белова',
    avatarColor: '#f7d06b',
    level: 'Для всех',
    favoriteActivity: 'walking',
  },
  {
    id: 'user-timur',
    name: 'Тимур Галиев',
    avatarColor: '#6ee7ff',
    level: 'Средний',
    favoriteActivity: 'fitness',
  },
  {
    id: 'user-katya',
    name: 'Катя Смирнова',
    avatarColor: '#ff8fb3',
    level: 'Продвинутый',
    favoriteActivity: 'running',
  },
  {
    id: 'user-roman',
    name: 'Роман Захаров',
    avatarColor: '#99f27a',
    level: 'Средний',
    favoriteActivity: 'cycling',
  },
  {
    id: 'user-yulia',
    name: 'Юлия Назарова',
    avatarColor: '#b7a4ff',
    level: 'Новичок',
    favoriteActivity: 'walking',
  },
  {
    id: 'user-vadim',
    name: 'Вадим Лебедев',
    avatarColor: '#ffce7a',
    level: 'Опытный',
    favoriteActivity: 'running',
  },
  {
    id: 'user-olga',
    name: 'Ольга Синицына',
    avatarColor: '#7af5d2',
    level: 'Средний',
    favoriteActivity: 'fitness',
  },
  {
    id: 'user-artem',
    name: 'Артём Ковалёв',
    avatarColor: '#75a7ff',
    level: 'Продвинутый',
    favoriteActivity: 'cycling',
  },
];

export function getUserById(id: string) {
  return mockUsers.find((user) => user.id === id) ?? currentUser;
}
