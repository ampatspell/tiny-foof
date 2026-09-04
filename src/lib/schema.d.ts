export interface File {
  id: string;
  name: string;
}

export interface FileVariant {
  contentType: string;
  fileId: string;
  height: number | null;
  id: string;
  identifier: string;
  size: number;
  width: number | null;
}

export interface Message {
  backgroundId: string | null;
  id: string;
  message: string;
}

export interface User {
  email: string;
  hash: string | null;
  id: string;
  role: string;
  salt: string | null;
}

export interface DB {
  files: File;
  fileVariants: FileVariant;
  messages: Message;
  users: User;
}
