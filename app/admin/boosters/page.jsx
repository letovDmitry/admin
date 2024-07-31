"use client"

import { useState } from "react";
import { format } from "date-fns";
import Search from "../../ui/dashboard/search/search";
import Pagination from "../../ui/dashboard/pagination/pagination";
import styles from "../../ui/dashboard/users/users.module.css";
import Link from "next/link";
import { useApproveBoosterMutation, useCancelBoosterMutation, useGetBoostersQuery, useDeleteBoosterMutation } from "../../store/services/adminApi";

const BoostersPage = () => {
  const { data: boosters } = useGetBoostersQuery();
  const [approve] = useApproveBoosterMutation();
  const [cancel] = useCancelBoosterMutation();
  const [deleteBooster] = useDeleteBoosterMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const boostersPerPage = 8;

  const handleAccept = (id) => {
    approve({ boosterId: id });
  };

  const handleCancel = (id) => {
    cancel({ boosterId: id });
  };

  const handleDelete = (id) => {
    deleteBooster({ boosterId: id });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBoosters = boosters ? boosters.filter((booster) => 
    booster.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const indexOfLastBooster = currentPage * boostersPerPage;
  const indexOfFirstBooster = indexOfLastBooster - boostersPerPage;
  const currentBoosters = filteredBoosters.slice(indexOfFirstBooster, indexOfLastBooster);

  const count = filteredBoosters.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MM-dd-yyyy  HH:mm');
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Поиск бустера..." onChange={handleSearch} />
        <Link href="/admin/boosters/add">
          <button className={styles.addButton}>Добавить Бустера</button>
        </Link>
      </div>
      {searchTerm && filteredBoosters.length === 0 ? (
        <p className={styles.noBoostersMessage}>Такого бустера не существует</p>
      ) : filteredBoosters.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Почта</td>
                <td>Дата регистрации</td>
                <td>Действие</td>
              </tr>
            </thead>
            <tbody>
              {currentBoosters.map((booster) => (
                <tr key={booster.id}>
                  <td>{booster.email}</td>
                  <td>{formatDate(booster.createdAt)}</td>
                  <td>
                    <div className={styles.buttons}>
                      {!booster.isApproved ? (
                        <>
                          <button
                            className={`${styles.button} ${styles.view}`}
                            onClick={() => handleAccept(booster.id)}
                          >
                            Принять
                          </button>
                          <button onClick={() => handleCancel(booster.id)} className={`${styles.button} ${styles.delete}`}>
                            Отклонить
                          </button>
                        </>
                      ) : (
                        <button
                          className={`${styles.button} ${styles.delete}`}
                          onClick={() => handleDelete(booster.id)}
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination count={count} itemsPerPage={boostersPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
        </>
      ) : (
        <p className={styles.noBoostersMessage}>В данный момент у вас нет Бустеров</p>
      )}
    </div>
  );
};

export default BoostersPage;
