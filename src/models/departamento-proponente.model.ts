import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_departamentoProponente_id_departamento: {
        name: 'fk_departamentoProponente_id_departamento',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'id_departamento',
      },
      fk_departamentoProponente_id_proponente: {
        name: 'fk_departamentoProponente_id_proponente',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'id_proponente',
      },
    },
  },
})
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

export type DepartamentoProponenteWithRelations = DepartamentoProponente &
  DepartamentoProponenteRelations;
