import { User } from "./User"

export interface Coupon {
    id?: number;
    code?: string;
    created_at?: Date;
    used_at?: Date;
    discount_percent?:number;
    created_by?:User;
    used_by?:User;
    user_has_package?:any;
    package?:any;
    package_id?: any;
}
