import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_evaluacionSolicitud_id_jurado: {
        name: 'fk_evaluacionSolicitud_id_jurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      },
      fk_evaluacionSolicitud_solicitud: {
        name: 'fk_evaluacionSolicitud_solicitud',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'id_solicitud',
      },
    },
  },
})
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

  @hasMany(() => ResultadoEvaluacion, {keyTo: 'id_evaluacionSolicitud'})
  resultadosEvaluaciones: ResultadoEvaluacion[];

  @belongsTo(() => Jurado, {name: 'corresponde_a'})
  id_jurado: number;

  @belongsTo(() => Solicitud, {name: 'evalua'})
  id_solicitud: number;

  constructor(data?: Partial<EvaluacionSolicitud>) {
    super(data);
  }
}

export interface EvaluacionSolicitudRelations {
  // describe navigational properties here
}

export type EvaluacionSolicitudWithRelations = EvaluacionSolicitud &
  EvaluacionSolicitudRelations;
