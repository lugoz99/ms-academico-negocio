import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoVinculacion} from './tipo-vinculacion.model';
import {Departamento} from './departamento.model';
import {DepartamentoProponente} from './departamento-proponente.model';
import {Solicitud} from './solicitud.model';

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

  @belongsTo(() => TipoVinculacion, {name: 'hecha_por'})
  id_tipo_vinculacion: number;

  @hasMany(() => Departamento, {through: {model: () => DepartamentoProponente, keyFrom: 'id_proponente', keyTo: 'id_departamento'}})
  departamentosProponentes: Departamento[];

  @hasMany(() => Solicitud, {keyTo: 'id_proponente'})
  solicitudes: Solicitud[];

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
