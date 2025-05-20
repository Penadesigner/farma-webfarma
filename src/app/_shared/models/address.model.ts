export class Address {
  zipcode: string;
  street: string;
  number: string;
  complement: string;
  neighbourhood: string;
  locality: string;
  state: string;
  country: string
  geo: {
    lat: number,
    lng: number
  }
}