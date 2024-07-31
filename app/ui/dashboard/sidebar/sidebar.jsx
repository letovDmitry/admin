import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import Link from "next/link";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdCalculate,
  MdBallot ,
  MdChat,
  MdAnalytics,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import LogoutButton from "../logout/button"


const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Главная",
        path: "/admin",
        icon: <MdDashboard />,
      },
      {
        title: "Добавить бустера",
        path: "/admin/boosters",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Калькуляторы",
        path: "/admin/products",
        icon: <MdCalculate />,
      },
      {
        title: "Список заказов",
        path: "/admin/transactions",
        icon: <MdBallot  />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Чаты",
        path: "/admin/revenue",
        icon: <MdChat />,
      },
      {
        title: "Промокоды",
        path: "/admin/reports",
        icon: <MdAnalytics />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Настройка Аккаунта",
        path: "/admin/settings",
        icon: <MdSettings />,
      },
    ],
  },
];

const Sidebar = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div>
          <Image
            quality={100}
            src='/logo.svg'
            alt=""
            width="120"
            height="30"
          />
        </div>
        <Link href='/admin/settings' className={styles.userDetail}>
          <span className={styles.username}>Никита Сертаков</span>
          <span className={styles.userTitle}>Админ</span>
        </Link>
      </div>
      <ul className={styles.list}>
        <span className={styles.cat}>Выберите Категорию</span>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
        }}
      >
        <LogoutButton />
      </form>
    </div>
  );
};

export default Sidebar;
