import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_juradoInvestigacion_id_jurado: {
        name: 'fk_juradoInvestigacion_id_jurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      },
      fk_juradoInvestigacion_id_areaInvestigacion: {
        name: 'fk_juradoInvestigacion_id_areaInvestigacion',
        entity: 'AreaInvestigacion',
        entityKey: 'id',
        foreignKey: 'id_investigacion',
      },
    },
  },
})
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
  id_investigacion?: number;

  constructor(data?: Partial<JuradoInvestigacion>) {
    super(data);
  }
}

export interface JuradoInvestigacionRelations {
  // describe navigational properties here
}

export type JuradoInvestigacionWithRelations = JuradoInvestigacion &
  JuradoInvestigacionRelations;
