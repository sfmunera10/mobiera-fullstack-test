import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../../../components/button/Button";
import { BloodType, Gender, RH, User } from "../../../interfaces/User";
import { Country, State, City } from "country-state-city";
import "./AddUser.styles.css";
import { ICity, IState } from "../../../interfaces/StateCity";

interface Props {
  handleAddUser: (
    userBodyRequest: Partial<User>,
    formData?: FormData
  ) => Promise<void>;
}

const AddUser: React.FC<Props> = ({ handleAddUser }) => {
  const [formValue, setFormValue] = useState<Partial<User>>({
    gender: Gender.Undefined,
    bloodType: BloodType.Undefined,
    rh: RH.Undefined,
  });
  const signatureFileRef = useRef<HTMLInputElement>(null);
  const photoFileRef = useRef<HTMLInputElement>(null);
  const fingerprintFileRef = useRef<HTMLInputElement>(null);
  const formDataToSend = useRef<FormData>(new FormData());
  const [stateList, setStateList] = useState<IState[]>([]);
  const [cityList, setCityList] = useState<ICity[]>([]);
  const genders = ["Male", "Female", "Other", "Undefined"];
  const bloodTypes = ["A", "B", "AB", "O", "Undefined"];
  const RHs = ["Positive", "Negative", "Undefined"];
  const [birthDateFormatted, setBirthDateFormatted] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );

  const onInputChange = (
    eventInput?: ChangeEvent<HTMLInputElement>,
    eventSelect?: ChangeEvent<HTMLSelectElement>
  ) => {
    if (eventInput) {
      eventInput.preventDefault();
      const { name, value } = eventInput.target;
      switch (name) {
        case "signatureFileUrl":
          if (signatureFileRef.current) {
            const signatureFiles = signatureFileRef.current.files
              ? signatureFileRef.current.files
              : new FileList();
            for (let i = 0; i < signatureFiles.length; i++) {
              formDataToSend.current.append(
                "files",
                signatureFiles[i],
                encodeURIComponent(signatureFiles[i].name)
              );
              setFormValue((prevFormValue) => ({
                ...prevFormValue,
                signatureFileUrl: signatureFiles[i].name,
              }));
            }
          }
          break;
        case "photoFileUrl":
          if (photoFileRef.current) {
            const photoFiles = photoFileRef.current.files
              ? photoFileRef.current.files
              : new FileList();
            for (let i = 0; i < photoFiles.length; i++) {
              formDataToSend.current.append(
                "files",
                photoFiles[i],
                encodeURIComponent(photoFiles[i].name)
              );
              setFormValue((prevFormValue) => ({
                ...prevFormValue,
                photoFileUrl: photoFiles[i].name,
              }));
            }
          }
          break;
        case "fingerprintFileUrl":
          if (fingerprintFileRef.current) {
            const fingerprintFiles = fingerprintFileRef.current.files
              ? fingerprintFileRef.current.files
              : new FileList();
            for (let i = 0; i < fingerprintFiles.length; i++) {
              formDataToSend.current.append(
                "files",
                fingerprintFiles[i],
                encodeURIComponent(fingerprintFiles[i].name)
              );
              setFormValue((prevFormValue) => ({
                ...prevFormValue,
                fingerprintFileUrl: fingerprintFiles[i].name,
              }));
            }
          }
          break;
        case "birthDate":
          const newDate = new Date(value);
          setBirthDateFormatted(() => newDate.toISOString().substring(0, 10));
          setFormValue((prevFormValue) => ({
            ...prevFormValue,
            birthDate: newDate.toISOString(),
          }));
          break;
        case "docIdNumber":
          setFormValue((prevFormValue) => ({
            ...prevFormValue,
            docIdNumber: +value,
          }));
          break;
        case "height":
          setFormValue((prevFormValue) => ({
            ...prevFormValue,
            height: +value,
          }));
          break;
        default:
          setFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value,
          }));
          break;
      }
    }
    if (eventSelect) {
      eventSelect.preventDefault();
      const { name, value } = eventSelect.target;
      switch (name) {
        case "countryCode":
          setStateList(() => State.getStatesOfCountry(value));
          setCityList(() => []);
          setFormValue((prevFormValue) => ({
            ...prevFormValue,
            countryCode: value === "No country selected" ? undefined : value,
            state: undefined,
            city: undefined,
          }));
          break;
        case "state":
          if (formValue.countryCode) {
            const countryCode = formValue.countryCode;
            setCityList(() => City.getCitiesOfState(countryCode, value));
            setFormValue((prevFormValue) => ({
              ...prevFormValue,
              state: value === "No state selected" ? undefined : value,
              city: undefined,
            }));
          }
          break;
        case "city":
          setFormValue((prevFormValue) => ({
            ...prevFormValue,
            city: value === "No city selected" ? undefined : value,
          }));
          break;
        default:
          setFormValue((prevFormValue) => ({
            ...prevFormValue,
            [name]: value,
          }));
          break;
      }
    }
  };

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddUser(formValue, formDataToSend.current);
  };

  useEffect(() => {
    console.log(formValue);
  }, [formValue]);

  return (
    <form className="add__user__container" onSubmit={onSubmitForm}>
      <h2>Add User</h2>
      <div className="input__grouping">
        <div className="input__add__user">
          <label htmlFor="givenNames">Given names:</label>
          <input
            type="text"
            id="givenNames"
            name="givenNames"
            value={formValue.givenNames}
            onChange={(e) => onInputChange(e)}
            placeholder="e.g. Santiago Felipe..."
          />
        </div>
        <div className="input__add__user">
          <label htmlFor="familyNames">Family names:</label>
          <input
            type="text"
            id="familyNames"
            name="familyNames"
            value={formValue.familyNames}
            onChange={(e) => onInputChange(e)}
            placeholder="e.g. Múnera Dávila..."
          />
        </div>
      </div>
      <div className="input__grouping">
        <div className="input__add__user">
          <label htmlFor="docIdNumber">Document ID number:</label>
          <input
            type="number"
            id="docIdNumber"
            name="docIdNumber"
            value={formValue.docIdNumber}
            onChange={(e) => onInputChange(e)}
            placeholder="e.g. 123456..."
          />
        </div>
        <div className="input__add__user">
          <label htmlFor="birthDate">Birth date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={
              formValue
                ? new Date(birthDateFormatted).toISOString().substring(0, 10)
                : formValue
            }
            onChange={(e) => onInputChange(e)}
          />
        </div>
      </div>
      <div className="input__grouping">
        <div className="input__add__user">
          <label htmlFor="countryCode">Country</label>
          <select
            id="countryCode"
            name="countryCode"
            value={formValue.countryCode}
            onChange={(e) => onInputChange(undefined, e)}
            placeholder="Select a country..."
          >
            <option>No country selected</option>
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name} {`(${country.flag})`}
              </option>
            ))}
          </select>
        </div>
        {!!stateList.length && (
          <div className="input__add__user">
            <label htmlFor="state">State:</label>
            <select
              id="state"
              name="state"
              value={formValue.state}
              onChange={(e) => onInputChange(undefined, e)}
              placeholder="Select a state..."
            >
              <option>No state selected</option>
              {stateList.map((state) => (
                <option key={state.name} value={state.isoCode}>
                  {state.name} {`(${state.isoCode})`}
                </option>
              ))}
            </select>
          </div>
        )}
        {!!cityList.length && (
          <div className="input__add__user">
            <label htmlFor="city">City:</label>
            <select
              id="city"
              name="city"
              value={formValue.city}
              onChange={(e) => onInputChange(undefined, e)}
              placeholder="Select a city..."
            >
              <option>No city selected</option>
              {cityList.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="input__grouping">
        <div className="input__add__user">
          <label htmlFor="signatureFileUrl">Signature file:</label>
          <label className="add__user__file__input">
            {formValue.signatureFileUrl
              ? formValue.signatureFileUrl
              : "Select an image file for signature..."}
            <input
              ref={signatureFileRef}
              type="file"
              id="signatureFileUrl"
              name="signatureFileUrl"
              onChange={(e) => onInputChange(e)}
              placeholder="Select an image file for signature..."
            />
          </label>
        </div>
        <div className="input__add__user">
          <label htmlFor="photoFileUrl">Photo file:</label>
          <label className="add__user__file__input">
            {formValue.photoFileUrl
              ? formValue.photoFileUrl
              : "Select an image file for photo..."}
            <input
              ref={photoFileRef}
              type="file"
              id="photoFileUrl"
              name="photoFileUrl"
              onChange={(e) => onInputChange(e)}
              placeholder="Select an image file for photo..."
            />
          </label>
        </div>
        <div className="input__add__user">
          <label htmlFor="fingerprintFileUrl">Fingerprint file:</label>
          <label className="add__user__file__input">
            {formValue.fingerprintFileUrl
              ? formValue.fingerprintFileUrl
              : "Select an image file for fingerprint..."}
            <input
              ref={fingerprintFileRef}
              type="file"
              id="fingerprintFileUrl"
              name="fingerprintFileUrl"
              onChange={(e) => onInputChange(e)}
              placeholder="Select an image file for fingerprint..."
            />
          </label>
        </div>
      </div>
      <div className="input__grouping">
        <div className="input__add__user">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formValue.gender}
            onChange={(e) => onInputChange(undefined, e)}
            placeholder="Select a gender..."
          >
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className="input__add__user">
          <label htmlFor="expeditionPlace">Expedition place:</label>
          <input
            type="text"
            id="expeditionPlace"
            name="expeditionPlace"
            value={formValue.expeditionPlace}
            onChange={(e) => onInputChange(e)}
            placeholder="e.g. Bogotá D.C. ..."
          />
        </div>
      </div>
      <div className="input__grouping">
        <div className="input__add__user">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formValue.height}
            onChange={(e) => onInputChange(e)}
            placeholder="e.g. 180cm..."
          />
        </div>
        <div className="input__add__user">
          <label htmlFor="bloodType">Blood type:</label>
          <select
            id="bloodType"
            name="bloodType"
            value={formValue.bloodType}
            onChange={(e) => onInputChange(undefined, e)}
            placeholder="Select a blood type..."
          >
            {bloodTypes.map((bloodType) => (
              <option key={bloodType} value={bloodType}>
                {bloodType}
              </option>
            ))}
          </select>
        </div>
        <div className="input__add__user">
          <label htmlFor="rh">RH:</label>
          <select
            id="rh"
            name="rh"
            value={formValue.rh}
            onChange={(e) => onInputChange(undefined, e)}
            placeholder="Select a RH..."
          >
            {RHs.map((rh) => (
              <option key={rh} value={rh}>
                {rh}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <Button
        className="primary"
        type="submit"
        height="50px"
        border="none"
        borderRadius="6px"
        width="120px"
        childrenText="Add User"
      />
    </form>
  );
};

export default AddUser;
