import {Entity, hasMany, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class TipoSolicitud extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
  })
  formato?: string;

  @hasMany(() => Solicitud, {keyTo: 'id_tipo_solicitud'})
  relacionado: Solicitud[];

  constructor(data?: Partial<TipoSolicitud>) {
    super(data);
  }
}

export interface TipoSolicitudRelations {
  // describe navigational properties here
}

export type TipoSolicitudWithRelations = TipoSolicitud & TipoSolicitudRelations;
