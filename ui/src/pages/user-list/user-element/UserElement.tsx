import React, { useEffect, useMemo, useState } from "react";
import "./UserElement.styles.css";
import { User } from "../../../interfaces/User";
import { useNavigate } from "react-router-dom";
import {
  IMAGE_SERVER_ORIGIN,
  IMG_NOT_AVAILABLE_SRC,
  PATH,
} from "../../../constants/Constants";

interface Props {
  user: User;
}

const UserElement: React.FC<Props> = ({ user }: Props) => {
  const navigate = useNavigate();

  const birthDateFormatted: string = useMemo(() => {
    return new Date(user.birthDate).toISOString().substring(0, 10);
  }, [user.birthDate]);

  const [imgSources, setImgSources] = useState<{
    signature: string;
    photo: string;
    fingerprint: string;
  }>({
    signature: IMG_NOT_AVAILABLE_SRC,
    photo: IMG_NOT_AVAILABLE_SRC,
    fingerprint: IMG_NOT_AVAILABLE_SRC,
  });

  const handleError = () =>
    setImgSources(() => ({
      signature: IMG_NOT_AVAILABLE_SRC,
      photo: IMG_NOT_AVAILABLE_SRC,
      fingerprint: IMG_NOT_AVAILABLE_SRC,
    }));

  useEffect(() => {
    setImgSources(() => ({
      signature: `${IMAGE_SERVER_ORIGIN}/uploaded/${user.signatureFileUrl}`,
      photo: `${IMAGE_SERVER_ORIGIN}/uploaded/${user.photoFileUrl}`,
      fingerprint: `${IMAGE_SERVER_ORIGIN}/uploaded/${user.fingerprintFileUrl}`,
    }));
  }, [user.signatureFileUrl, user.photoFileUrl, user.fingerprintFileUrl]);

  return (
    <div
      className="user__element__container"
      onClick={() => navigate(`${PATH.USER_DETAIL_NO_PARAM}/${user.id}`)}
    >
      <h2>
        {user.givenNames} {user.familyNames}
      </h2>
      <div className="user__element__grouping">
        <div className="user__element__profile__picture">
          <img src={imgSources.photo} onError={handleError} alt="User" />
        </div>
        <div className="input__user__element">
          <label htmlFor="givenNames">Given names:</label>
          <input disabled type="text" value={user.givenNames} />
        </div>
        <div className="input__user__element">
          <label htmlFor="familyNames">Family names:</label>
          <input disabled type="text" value={user.familyNames} />
        </div>
      </div>
      <div className="user__element__grouping">
        <div className="input__user__element">
          <label htmlFor="docIdNumber">Document ID number:</label>
          <input disabled type="number" value={user.docIdNumber} />
        </div>
        <div className="input__user__element">
          <label htmlFor="birthDate">Birth date:</label>
          <input disabled type="date" value={birthDateFormatted} />
        </div>
        <div className="input__user__element">
          <label htmlFor="givenNames">Gender:</label>
          <input disabled type="text" value={user.gender} />
        </div>
      </div>
      <div className="user__element__grouping">
        <div className="input__user__element">
          <label htmlFor="docIdNumber">Country</label>
          <input disabled type="text" value={user.countryCode} />
        </div>
        <div className="input__user__element">
          <label htmlFor="docIdNumber">State:</label>
          <input disabled type="text" value={user.state} />
        </div>
        <div className="input__user__element">
          <label htmlFor="docIdNumber">City:</label>
          <input disabled type="text" value={user.city} />
        </div>
      </div>
      <div className="user__element__grouping">
        <div className="input__user__element">
          <label htmlFor="docIdNumber">Signature file:</label>
          <div className="user__element__signature__picture">
            <img src={imgSources.signature} onError={handleError} alt="User" />
          </div>
        </div>
        <div className="input__user__element">
          <label htmlFor="docIdNumber">Fingerprint file:</label>
          <div className="user__element__fingerprint__picture">
            <img
              src={imgSources.fingerprint}
              onError={handleError}
              alt="User"
            />
          </div>
        </div>
      </div>
      <div className="input__user__element">
        <label htmlFor="familyNames">Expedition place:</label>
        <input disabled type="text" value={user.expeditionPlace} />
      </div>
      <div className="user__element__grouping">
        <div className="input__user__element">
          <label htmlFor="givenNames">Height (cm):</label>
          <input disabled type="number" value={user.height} />
        </div>
        <div className="input__user__element">
          <label htmlFor="givenNames">Blood type:</label>
          <input disabled type="text" value={user.bloodType} />
        </div>
        <div className="input__user__element">
          <label htmlFor="familyNames">RH:</label>
          <input disabled type="text" value={user.rh} />
        </div>
      </div>
    </div>
  );
};

export default UserElement;
