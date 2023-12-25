import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Profile.css"
import { updateUser } from "../../http/userAPI";
import { toJS } from 'mobx';
import { getUsersOrder } from "../../http/ordersAPI";
import OrderComponent from "./OrderComponent";
import OrdersListComponent from "./OrdersListComponent";
import { useQuery } from "@tanstack/react-query";

const Profile = observer(({user}) => {

  const [isEditing, setEditing] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState();
  const [role, setRole] = useState();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [usersOrders, setUsersOrders] = useState([])

  const orders = useQuery({
    queryKey: ["orders"],
    queryFn: async () => getUsersOrder(user.id), 
  })

  useEffect(() => {
    if(!orders.isPending)
      setUsersOrders(orders.data.data)
  }, [orders.data])

  useEffect(() => {
    setUsername(user.email)
    setNewUsername(user.email)
    setPassword(user.password)
    setNewPassword(user.password)
    setUserId(user.id)
    setRole(user.role)
}, [user])

// useEffect(() => {
//   setTimeout(() => {
//     getUsersOrder(user.id).then(function(val){setUsersOrders(val.data)
//   })
//  }, 10) 
// }, [user.id])

  const handleEditClick = () => {
    setEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    setUsername(newUsername || username);
    setPassword(newPassword || password);
    setEditing(false);
    const response = await updateUser(userId, newUsername, newPassword, role)
    localStorage.setItem('loggedUser', JSON.stringify(toJS(response.data)))
    user.setUser(toJS(response.data))
  };

  return (
    <motion.div className="profile"
    
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    >
        <div className="profile-container">
            <h2 className="profile-header">Профиль</h2>
            <p>Email</p>
            <p className="profile-field">
                {isEditing ? (
                <input className="edit-input" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                ) : (username)}
            </p>
            <p>Пароль</p>
            <p className="profile-field">
                {isEditing ? (
                <input
                    className="edit-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
             ) : (
                '********'
                )}
            </p>
            <button className="edit-button" onClick={isEditing ? handleSaveClick : handleEditClick}>
                {isEditing ? 'Сохранить' : 'Редактировать'}
            </button>
            {isEditing && <button className="edit-button" onClick={(e) => setEditing(!isEditing)}>Отмена</button>}
        </div>

        {role === "user" &&
          <div className="profile-container">
            <h2 className="profile-header">Мои заказы</h2>
            <OrdersListComponent orders={usersOrders} user={user}/>
          </div>
        }
        
    </motion.div>
  )
})

export default Profile