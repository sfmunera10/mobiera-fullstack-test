import React, { Fragment, useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import "./UserDetail.styles.css";
import Loader from "../../components/loader/Loader";
import { User } from "../../interfaces/User";
import { UserApiResponse } from "../../interfaces/UserApiResponse";
import { getOneUser } from "../../services/UserService";
import {
  IMAGE_SERVER_ORIGIN,
  IMG_NOT_AVAILABLE_SRC,
  PATH,
} from "../../constants/Constants";
import Button from "../../components/button/Button";

const UserDetail: React.FC<{}> = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imgSources, setImgSources] = useState<{
    signature: string;
    photo: string;
    fingerprint: string;
  }>({
    signature: IMG_NOT_AVAILABLE_SRC,
    photo: IMG_NOT_AVAILABLE_SRC,
    fingerprint: IMG_NOT_AVAILABLE_SRC,
  });

  const [birthDateFormatted, setBirthDateFormatted] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );

  const handleLoadUserDetail = async (id: string) => {
    setLoading(() => true);
    const userApiResponse: UserApiResponse = await getOneUser(id);
    setLoading(() => false);
    const userFound = userApiResponse.data;
    setUserNotFound(() => !userFound);
    if (userFound) {
      setUser(() => userFound);
      setImgSources(() => ({
        signature: `${IMAGE_SERVER_ORIGIN}/uploaded/${userFound.signatureFileUrl}`,
        photo: `${IMAGE_SERVER_ORIGIN}/uploaded/${userFound.photoFileUrl}`,
        fingerprint: `${IMAGE_SERVER_ORIGIN}/uploaded/${userFound.fingerprintFileUrl}`,
      }));
      setBirthDateFormatted(() =>
        new Date(userFound.birthDate).toISOString().substring(0, 10)
      );
    }
  };

  const handleError = () =>
    setImgSources(() => ({
      signature: IMG_NOT_AVAILABLE_SRC,
      photo: IMG_NOT_AVAILABLE_SRC,
      fingerprint: IMG_NOT_AVAILABLE_SRC,
    }));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      handleLoadUserDetail(id);
    }
  }, [id]);

  return (
    <div className="user__detail__container">
      {loading ? (
        <Loader />
      ) : userNotFound ? (
        <Navigate to={PATH.NOT_FOUND_NO_PARAM} />
      ) : (
        user && (
          <Fragment>
            <header className="header">
              <Button
                className="primary"
                type="button"
                height="50px"
                border="none"
                borderRadius="6px"
                width="120px"
                childrenText="Go back"
                onClick={() => navigate(PATH.USERS)}
              />
              {user.givenNames} {user.familyNames}
            </header>
            <div
              className="user__detail__info__container"
              onClick={() =>
                navigate(`${PATH.USER_DETAIL_NO_PARAM}/${user.id}`)
              }
            >
              <div className="user__detail__grouping">
                <div className="user__detail__profile__picture">
                  <img
                    src={imgSources.photo}
                    onError={handleError}
                    alt="User"
                  />
                </div>
                <div className="input__user__detail">
                  <label htmlFor="givenNames">Given names:</label>
                  <input disabled type="text" value={user.givenNames} />
                </div>
                <div className="input__user__detail">
                  <label htmlFor="familyNames">Family names:</label>
                  <input disabled type="text" value={user.familyNames} />
                </div>
              </div>
              <div className="user__detail__grouping">
                <div className="input__user__detail">
                  <label htmlFor="docIdNumber">Document ID number:</label>
                  <input disabled type="number" value={user.docIdNumber} />
                </div>
                <div className="input__user__detail">
                  <label htmlFor="birthDate">Birth date:</label>
                  <input disabled type="date" value={birthDateFormatted} />
                </div>
                <div className="input__user__detail">
                  <label htmlFor="givenNames">Gender:</label>
                  <input disabled type="text" value={user.gender} />
                </div>
              </div>
              <div className="user__detail__grouping">
                <div className="input__user__detail">
                  <label htmlFor="docIdNumber">Country</label>
                  <input disabled type="text" value={user.countryCode} />
                </div>
                <div className="input__user__detail">
                  <label htmlFor="docIdNumber">State:</label>
                  <input disabled type="text" value={user.state} />
                </div>
                <div className="input__user__detail">
                  <label htmlFor="docIdNumber">City:</label>
                  <input disabled type="text" value={user.city} />
                </div>
              </div>
              <div className="user__detail__grouping">
                <div className="input__user__detail">
                  <label htmlFor="docIdNumber">Signature file:</label>
                  <div className="user__detail__signature__picture">
                    <img
                      src={imgSources.signature}
                      onError={handleError}
                      alt="User"
                    />
                  </div>
                </div>
                <div className="input__user__detail">
                  <label htmlFor="docIdNumber">Fingerprint file:</label>
                  <div className="user__detail__fingerprint__picture">
                    <img
                      src={imgSources.fingerprint}
                      onError={handleError}
                      alt="User"
                    />
                  </div>
                </div>
              </div>
              <div className="input__user__detail">
                <label htmlFor="familyNames">Expedition place:</label>
                <input disabled type="text" value={user.expeditionPlace} />
              </div>
              <div className="user__detail__grouping">
                <div className="input__user__detail">
                  <label htmlFor="givenNames">Height (cm):</label>
                  <input disabled type="number" value={user.height} />
                </div>
                <div className="input__user__detail">
                  <label htmlFor="givenNames">Blood type:</label>
                  <input disabled type="text" value={user.bloodType} />
                </div>
                <div className="input__user__detail">
                  <label htmlFor="familyNames">RH:</label>
                  <input disabled type="text" value={user.rh} />
                </div>
              </div>
            </div>
          </Fragment>
        )
      )}
    </div>
  );
};

export default UserDetail;
