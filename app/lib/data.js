import {
  MdSupervisedUserCircle,
  MdOutlineMoney,
  MdAnalytics,
} from "react-icons/md";


// DUMMY DATA

export const cards = [
  {
    id: 1,
    title: "Всего пользователей",
    number: 10.928,
    change: 12,
    icon:<MdSupervisedUserCircle />,
  },
  {
    id: 2,
    title: "Всего заказов",
    number: 8.236,
    change: -2,
    icon:<MdAnalytics />,
  },
  {
    id: 3,
    title: "Прибыль",
    number: 116.642,
    change: 18,
    icon:<MdOutlineMoney />,
  },
];
