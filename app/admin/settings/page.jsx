"use client"
import { useEffect, useState } from "react";
import styles from "../../ui/dashboard/users/addUser/addUser.module.css";
import { useChangePasswordMutation, useChangeUserMutation, useGetMeQuery } from "../../store/services/userApi";

const AdminSettings = () => {
  const { data: user } = useGetMeQuery()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [changeUser] = useChangeUserMutation()
  const [changePassword] = useChangePasswordMutation()

  useEffect (() => {
    if (user) {
      setEmail(user.email)
    }
  }, [user])

  const handleSubmit = () => {
    if (email) changeUser({ email }).unwrap().then(_ => window.location.reload())
    if (password) changePassword({ newPassword: password }).unwrap().then(_ => window.location.reload())
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Новая Почта"  required />
        <input
          value={password} 
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Новый пароль"
          name="password"
          required
        />
        <button type="submit">Применить</button>
      </form>
    </div>
  );
};

export default AdminSettings;
