import {BadgeType} from "./Liquidation";

export interface Currency {
  name: string;
  abbreviation: BadgeType;
  imageCountry: string;
  from_date?:Date;
  to_date?:Date;
}
