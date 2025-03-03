export interface Skills{
    fisico:number;
    tecnica:number;
    fuerzaMental:number;
    habilidadEspecial:number;
    resistencia:number;
}

export interface Player {
    id:number;
    name:string;
    age:number;
    foto:string;
    portrait:string;  //a ver si lo vamos solucionando.
    team:string;
    stature: number;
    average: number;
    shirtNumber: number;
    position: string;
    gallery: string[];
    bio: string;
    skills:Skills;
}