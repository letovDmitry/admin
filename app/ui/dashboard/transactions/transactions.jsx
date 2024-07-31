import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Последние Транзакции</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Имя</td>
            <td>Статус</td>
            <td>Дата</td>
            <td>Стоимость</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                Николай
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Ожидание
              </span>
            </td>
            <td>14.02.2024</td>
            <td>3.200 ₽</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                Александр
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Готово</span>
            </td>
            <td>14.02.2024</td>
            <td>4.670 ₽</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                Марина
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Отклонен
              </span>
            </td>
            <td>14.02.2024</td>
            <td>10.200 ₽</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                Игорь
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Ожидание
              </span>
            </td>
            <td>14.02.2024</td>
            <td>23.435 ₽</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
