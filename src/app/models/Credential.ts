import { Global } from './Global';

/**
 * Clase para pasar credenciales a login
 **/
export class Credential {
    public client_id: string;
    public client_secret: string;
    public grant_type = 'password';
    public email?: string;
    public questions?:any;

    constructor(
        public username: string,
        public password: string
    ) {
        this.client_id = Global.URL.client_id;
        this.client_secret = Global.URL.client_secret;
    }
}
