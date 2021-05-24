export interface Registro {
    idRegistro: number,
    fechaInicio: Date | string,
    fechaFin:  Date | string,
    precio: number,
    descuento: number,
    compra: string,
    idCoche: number,
    marca?: string,
    matricula?: string,
    idCliente: number,
    nombre?: string,
    dni?: string
}