
export interface User {
  id?: string;
  is_look?: boolean;
  isActive?: boolean;
  image?: string;
  name?: string;
  lastName?: string;
  email: string;
  phone?: string;
  local_phone?: string;
  country?: Location;
  password?: string;
  document?: string;
  hasAccessAdmin?: boolean;
  document_type?: 'NIT' | 'CC' | 'CE';
  rut_document?: string;
  camara_comercio_document?: string;
  representante_legal_document?: string;
  send_emails?: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface ChangePassword {
  token: string;
  password_1: string;
  password_2: string;
}
