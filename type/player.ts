export interface Skills{
    fisico:number;
    tecnica:number;
    fuerzaMental:number;
    habilidadEspecial:number;
    resistencia:number;
}
export interface PlayerShort{
    id: string;
    name: string;
    shirtNumber: number;
    position: string;
    portrait: string;
}
export interface Player {
    id:string;
    name:string;
    age:number;
    foto:string; // esta es la de cuerpo entero
    portrait:string;  //a ver si lo vamos solucionando. esta es la card
    team:string;
    stature?: number;
    average?: number;
    shirtNumber?: number;
    position: string;
    gallery: string[]; // las fotos de la galeria
    bio: string;
    skills:Skills;
    video: string[];
    
}