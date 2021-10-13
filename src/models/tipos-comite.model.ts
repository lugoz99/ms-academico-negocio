import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {ComiteSolicitud} from './comite-solicitud.model';

@model()
export class TiposComite extends Entity {
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

  @hasMany(() => Solicitud, {through: {model: () => ComiteSolicitud, keyFrom: 'id_comite', keyTo: 'id_solicitud'}})
  solicitudesComite: Solicitud[];

  constructor(data?: Partial<TiposComite>) {
    super(data);
  }
}

export interface TiposComiteRelations {
  // describe navigational properties here
}

export type TiposComiteWithRelations = TiposComite & TiposComiteRelations;
