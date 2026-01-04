export interface AuthUser {
  user_id: number;
  nombre_usuario: string;
  rol: number; 
  cnd: number | null;
  ar: number | null;
}

export interface LoginResponse {
  access_token: string | null;
  user: AuthUser | null;
}