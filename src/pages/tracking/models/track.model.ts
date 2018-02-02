export class Track {
  public live: boolean;
  public user: string;
  public position: Position = new Position();
}

export class Position {
  public latitude: number;
  public longitude: number;
  public altitude: number;
  public speed: number;
  public timestamp: number;
}
