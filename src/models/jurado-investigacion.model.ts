import {Entity, model, property} from '@loopback/repository';

@model()
export class JuradoInvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_jurado?: number;

  @property({
    type: 'number',
  })
  id_area_investigacion?: number;

  constructor(data?: Partial<JuradoInvestigacion>) {
    super(data);
  }
}

export interface JuradoInvestigacionRelations {
  // describe navigational properties here
}

export type JuradoInvestigacionWithRelations = JuradoInvestigacion & JuradoInvestigacionRelations;
