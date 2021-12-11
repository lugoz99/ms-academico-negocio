import {Model, model, property} from '@loopback/repository';

@model()
export class JuradoInv extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  area_investigacion: number[];

  constructor(data: Partial<JuradoInv>) {
    super(data);
  }
}

export interface JuradoInvRelations {
  // describe navigational properties here
}

export type JuradoInvWithRelations = JuradoInv & JuradoInvRelations;
