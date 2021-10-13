import {Entity, model, property} from '@loopback/repository';

@model()
export class DepartamentoProponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_proponente?: number;

  @property({
    type: 'number',
  })
  id_departamento?: number;

  constructor(data?: Partial<DepartamentoProponente>) {
    super(data);
  }
}

export interface DepartamentoProponenteRelations {
  // describe navigational properties here
}

export type DepartamentoProponenteWithRelations = DepartamentoProponente & DepartamentoProponenteRelations;
