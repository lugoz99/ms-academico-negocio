import {Entity, model, property, belongsTo} from '@loopback/repository';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';

@model()
export class ResultadoEvaluacion extends Entity {
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
  resultado: string;

  @property({
    type: 'string',
    required: true,
  })
  formato_diligenciado: string;

  @belongsTo(() => EvaluacionSolicitud, {name: 'evaluacion'})
  id_evaluacionSolicitud: number;

  constructor(data?: Partial<ResultadoEvaluacion>) {
    super(data);
  }
}

export interface ResultadoEvaluacionRelations {
  // describe navigational properties here
}

export type ResultadoEvaluacionWithRelations = ResultadoEvaluacion &
  ResultadoEvaluacionRelations;
