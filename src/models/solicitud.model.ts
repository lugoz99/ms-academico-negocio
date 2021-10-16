import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proponente} from './proponente.model';
import {TiposComite} from './tipos-comite.model';
import {ComiteSolicitud} from './comite-solicitud.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaRadicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreTrabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  archivo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Proponente, {name: 'asociado'})
  id_proponente: number;

  @property({
    type: 'number',
  })
  id_area_investigacion?: number;

  @property({
    type: 'number',
  })
  id_tipo_solicitud?: number;

  @property({
    type: 'number',
  })
  id_modalidad?: number;

  @hasMany(() => TiposComite, {through: {model: () => ComiteSolicitud, keyFrom: 'id_solicitud', keyTo: 'id_comite'}})
  comite_solicitud: TiposComite[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
