export interface IUsuario {
    id: number;
    nome: string;
    email: string;
    criadoEm: string;
    administrador: boolean | null;
    bloqueadoEm: Date | null;
    ultimoLogin: Date | null;
}