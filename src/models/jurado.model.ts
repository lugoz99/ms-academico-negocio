import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UsuarioJurado} from './usuario-jurado.model';
import {AreaInvestigacion} from './area-investigacion.model';
import {JuradoInvestigacion} from './jurado-investigacion.model';

@model()
export class Jurado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreCompleto: string;

  @property({
    type: 'string',
  })
  celular?: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  entidad: string;

  @hasOne(() => UsuarioJurado, {keyTo: 'id_jurado'})
  usuarioJurado: UsuarioJurado;

  @hasMany(() => AreaInvestigacion, {through: {model: () => JuradoInvestigacion, keyFrom: 'id_jurado', keyTo: 'id_investigacion'}})
  juradosInvestigaciones: AreaInvestigacion[];

  constructor(data?: Partial<Jurado>) {
    super(data);
  }
}

export interface JuradoRelations {
  // describe navigational properties here
}

export type JuradoWithRelations = Jurado & JuradoRelations;
