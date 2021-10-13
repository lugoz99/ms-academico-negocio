import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Jurado} from './jurado.model';

@model()
export class EvaluacionSolicitud extends Entity {
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
  fecha_invitacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_respuesta: string;

  @property({
    type: 'string',
    required: true,
  })
  respuesta: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Solicitud, {name: 'evalua'})
  id_solicitud: number;

  @belongsTo(() => Jurado, {name: 'corresponde'})
  id_jurado: number;

  constructor(data?: Partial<EvaluacionSolicitud>) {
    super(data);
  }
}

export interface EvaluacionSolicitudRelations {
  // describe navigational properties here
}

export type EvaluacionSolicitudWithRelations = EvaluacionSolicitud & EvaluacionSolicitudRelations;
