import { Tweet } from './tweet.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dob?: string;
  email: string;
  password: string;
  userName: string;
  image?:Uint8Array | number[]|null;
  createdAt:string;
}
