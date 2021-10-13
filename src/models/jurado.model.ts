import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UsuarioJurado} from './usuario-jurado.model';
import {AreaInvestigacion} from './area-investigacion.model';
import {JuradoInvestigacion} from './jurado-investigacion.model';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';

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

  @hasMany(() => AreaInvestigacion, {through: {model: () => JuradoInvestigacion, keyFrom: 'id_jurado', keyTo: 'id_area_investigacion'}})
  juradosInvestigacion: AreaInvestigacion[];

  @hasMany(() => EvaluacionSolicitud, {keyTo: 'id_jurado'})
  evaluacionJurado: EvaluacionSolicitud[];

  constructor(data?: Partial<Jurado>) {
    super(data);
  }
}

export interface JuradoRelations {
  // describe navigational properties here
}

export type JuradoWithRelations = Jurado & JuradoRelations;
