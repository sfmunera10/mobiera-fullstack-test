export interface IState {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude?: string | null;
  longitude?: string | null;
  getStatesOfCountry?(): IState[];
  getStateByCodeAndCountry?(): IState;
  getStateByCode?(): IState;
}

export interface ICity {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude?: string | null;
  longitude?: string | null;
  getAllCities?(): ICity[];
  getCitiesOfState?(): ICity[];
  getCitiesOfCountry?(): ICity[];
}
