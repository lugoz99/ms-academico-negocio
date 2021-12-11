import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {DepartamentoProponente} from './departamento-proponente.model';
import {Departamento} from './departamento.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

@model({
  settings: {
    foreignKeys: {
      fk_proponente_id_tipo_vinculacion: {
        name: 'fk_proponente_id_tipo_vinculacion',
        entity: 'TipoVinculacion',
        entityKey: 'id',
        foreignKey: 'id_tipo_vinculacion',
      },
    },
  },
})
export class Proponente extends Entity {
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
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
  })
  otrosNombres?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundoApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  celular?: string;

  @property({
    type: 'string',
  })
  foto?: string;
  @hasMany(() => Departamento, {
    through: {
      model: () => DepartamentoProponente,
      keyFrom: 'id_proponente',
      keyTo: 'id_departamento',
    },
  })
  departamentosProponentes: Departamento[];

  @belongsTo(() => TipoVinculacion, {name: 'tipoVinculacion'})
  id_tipo_vinculacion: number;

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
