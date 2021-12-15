import {Model, model, property} from '@loopback/repository';

@model()
export class GeneralModel extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  arreglo: number[];


  constructor(data?: Partial<GeneralModel>) {
    super(data);
  }
}

export interface GeneralModelRelations {
  // describe navigational properties here
}

export type GeneralModelWithRelations = GeneralModel & GeneralModelRelations;
