import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {ComiteSolicitud} from './comite-solicitud.model';
import {Proponente} from './proponente.model';
import {TiposComite} from './tipos-comite.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_id_proponente: {
        name: 'fk_solicitud_id_proponente',
        entity: 'Proponente',
        entityKey: 'id',
        foreignKey: 'id_proponente',
      },
      fk_solicitud_id_modalidad: {
        name: 'fk_solicitud_id_modalidad',
        entity: 'Modalidad',
        entityKey: 'id',
        foreignKey: 'id_modalidad',
      },
      fk_solicitud_id_tipo_solicitud: {
        name: 'fk_solicitud_id_tipo_solicitud',
        entity: 'TipoSolicitud',
        entityKey: 'id',
        foreignKey: 'id_tipo_solicitud',
      },
      fk_solicitud_id_areaInvestigacion: {
        name: 'fk_solicitud_id_areaInvestigaciond',
        entity: 'AreaInvestigacion',
        entityKey: 'id',
        foreignKey: 'id_area_investigacion',
      },
    },
  },
})
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaRadicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreTrabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  archivo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Proponente, {name: 'asociado'})
  id_proponente: number;

  @property({
    type: 'number',
  })
  id_area_investigacion?: number;

  @property({
    type: 'number',
  })
  id_tipo_solicitud?: number;

  @property({
    type: 'number',
  })
  id_modalidad?: number;

  @hasMany(() => TiposComite, {
    through: {
      model: () => ComiteSolicitud,
      keyFrom: 'id_solicitud',
      keyTo: 'id_comite',
    },
  })
  comite_solicitud: TiposComite[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
