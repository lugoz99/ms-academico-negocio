import {Entity, model, property, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {DepartamentoProponente} from './departamento-proponente.model';

@model()
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
    required: true,
  })
  otrosNombres: string;

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
    type: 'buffer',
  })
  foto?: Buffer;

  @property({
    type: 'number',
  })
  id_tipo_vinculacion?: number;

  @hasMany(() => Departamento, {through: {model: () => DepartamentoProponente, keyFrom: 'id_proponente', keyTo: 'id_departamento'}})
  departamentosProponentes: Departamento[];

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
