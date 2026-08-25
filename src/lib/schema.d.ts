export interface File {
  id: string;
  name: string;
}

export interface FileVariant {
  contentType: string;
  fileId: string;
  height: number | null;
  id: string;
  size: number;
  variant: string;
  width: number | null;
}

export interface User {
  email: string;
  hash: string | null;
  id: string;
  salt: string | null;
  type: string;
}

export interface DB {
  files: File;
  fileVariants: FileVariant;
  users: User;
}
