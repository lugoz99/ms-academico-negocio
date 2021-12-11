import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {AreaInvestigacion} from './area-investigacion.model';
import {ComiteSolicitud} from './comite-solicitud.model';
import {Modalidad} from './modalidad.model';
import {Proponente} from './proponente.model';
import {TipoSolicitud} from './tipo-solicitud.model';
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
    required: false,
  })
  archivo?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: false,
  })
  estado?: number;

  @belongsTo(() => Proponente, {name: 'asociado'})
  id_proponente: number;

  @hasMany(() => TiposComite, {
    through: {
      model: () => ComiteSolicitud,
      keyFrom: 'id_solicitud',
      keyTo: 'id_comite',
    },
  })
  comite_solicitud: TiposComite[];

  @belongsTo(() => AreaInvestigacion, {name: 'areaInvestigacion'})
  id_area_investigacion: number;

  @belongsTo(() => Modalidad, {name: 'modalidad'})
  id_modalidad: number;

  @belongsTo(() => TipoSolicitud, {name: 'tipoSolicitud'})
  id_tipo_solicitud: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
