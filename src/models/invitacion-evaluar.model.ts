import {Model, model, property} from '@loopback/repository';

@model()
export class InvitacionEvaluar extends Model {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'date',
    required: false,
    default: null,
  })
  fecha_invitacion?: string;

  @property({
    type: 'date',
    required: false,
    default: null,
  })
  fecha_respuesta?: string;

  @property({
    type: 'number',
    default: 0,
  })
  respuesta?: number;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @property({
    type: 'string',
  })
  hash?: string;

  @property({
    type: 'array',
    itemType: 'number',
    required: false,
  })
  jurados?: number[];

  @property({
    type: 'number',
    required: false,
  })
  solicitud?: number;

  constructor(data?: Partial<InvitacionEvaluar>) {
    super(data);
  }
}

export interface InvitacionEvaluarRelations {
  // describe navigational properties here
}

export type InvitacionEvaluarWithRelations = InvitacionEvaluar &
  InvitacionEvaluarRelations;
