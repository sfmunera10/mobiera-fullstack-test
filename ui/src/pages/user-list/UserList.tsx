import React, { Fragment, useEffect, useState } from "react";
import "./UserList.styles.css";
import Loader from "../../components/loader/Loader";
import { User } from "../../interfaces/User";
import { getAllUsers, postUser, uploadFiles } from "../../services/UserService";
import { UsersApiResponse } from "../../interfaces/UsersApiResponse";
import UserElement from "./user-element/UserElement";
import Button from "../../components/button/Button";
import Dialog from "../../components/dialog/Dialog";
import AddUser from "./add-user/AddUser";
import { UserApiResponse } from "../../interfaces/UserApiResponse";

const UserList: React.FC<{}> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [isDialogActive, setDialogActive] = useState<boolean>(false);

  const handleLoadUsersList = async () => {
    setLoading(() => true);
    const usersApiResponse: UsersApiResponse = await getAllUsers();
    setLoading(() => false);
    const usersFound = usersApiResponse.data;
    if (usersFound) {
      setUsers(() => usersFound);
    }
  };

  const handleAddUser = async (
    userBodyRequest: Partial<User>,
    formData?: FormData
  ) => {
    setLoading(() => true);
    if (formData) {
      await uploadFiles(formData);
      const usersApiResponse: UserApiResponse = await postUser(userBodyRequest);
      const userAdded = usersApiResponse.data;
      if (userAdded) {
        setUsers((prevUsers) => [...prevUsers, userAdded]);
        setDialogAddUserActive();
      }
    }
    setLoading(() => false);
  };

  const setDialogAddUserActive = () => {
    setDialogActive((isActive) => !isActive);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleLoadUsersList();
  }, []);

  return (
    <Fragment>
      <header className="header">
        User Directory (Mobiera's Full Stack Test)
        <Button
          className="primary"
          type="button"
          height="50px"
          border="none"
          borderRadius="6px"
          width="120px"
          childrenText="Add User"
          onClick={() => setDialogAddUserActive()}
        />
      </header>
      <Dialog
        isDialogActive={isDialogActive}
        setDialogTypeActive={setDialogAddUserActive}
        childrenComponents={<AddUser handleAddUser={handleAddUser} />}
      />
      <div className="user__list__container">
        {loading ? (
          <Loader />
        ) : users.length ? (
          users.map((user) => (
            <UserElement key={user.docIdNumber} user={user} />
          ))
        ) : null}
      </div>
    </Fragment>
  );
};

export default UserList;
