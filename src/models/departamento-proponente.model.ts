import {Entity, model, property} from '@loopback/repository';

@model()
export class DepartamentoProponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<DepartamentoProponente>) {
    super(data);
  }
}

export interface DepartamentoProponenteRelations {
  // describe navigational properties here
}

export type DepartamentoProponenteWithRelations = DepartamentoProponente & DepartamentoProponenteRelations;
