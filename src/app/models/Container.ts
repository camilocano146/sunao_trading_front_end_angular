
export interface Dimension {
  width: number;
  long: number;
  height: number;
}

export interface Container {
  id: number;
  name: string;
  dimension: Dimension;
  capacity: number;
  weight: number;
  img: {
    width?: number,
    color?: string,
  };
}
