"use client"

import { useState } from 'react'
import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";
import { useCreateBoosterMutation } from '../../../store/services/adminApi'

const AddBoosterPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [create] = useCreateBoosterMutation();

  const handleCreateBooster = () => {
    create({ email, password })
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateBooster} className={styles.form}>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Почта" name="email" required />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Пароль"
          name="password"
          required
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddBoosterPage;
