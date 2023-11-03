
export interface Tweet {
  id:number;
  content: string;
  likes?: number;
  userId: number;
  createdAt: string;
  image?:Uint8Array | number[];
}
