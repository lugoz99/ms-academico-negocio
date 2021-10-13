import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Modalidad} from './modalidad.model';
import {TipoSolicitud} from './tipo-solicitud.model';
import {Proponente} from './proponente.model';
import {TiposComite} from './tipos-comite.model';
import {ComiteSolicitud} from './comite-solicitud.model';
import {AreaInvestigacion} from './area-investigacion.model';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';
import {Recordatorio} from './recordatorio.model';

@model()
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

  @belongsTo(() => TipoSolicitud, {name: 'gestiona'})
  id_tipo_solicitud: number;

  @hasMany(() => TipoSolicitud, {keyTo: 'id_tipo_solicitud'})
  tiposSolicitud: TipoSolicitud[];

  @belongsTo(() => Modalidad, {name: 'genera'})
  id_modalidad: number;

  @belongsTo(() => Proponente, {name: 'pertenece_A'})
  id_proponente: number;

  @hasMany(() => TiposComite, {through: {model: () => ComiteSolicitud, keyFrom: 'id_solicitud', keyTo: 'id_comite'}})
  comiteSolicitudes: TiposComite[];

  @belongsTo(() => AreaInvestigacion, {name: 'asocia'})
  id_area_investigacion: number;

  @hasMany(() => EvaluacionSolicitud, {keyTo: 'id_solicitud'})
  evaluacionSolicitudes: EvaluacionSolicitud[];

  @hasMany(() => Recordatorio, {keyTo: 'id_solicitud'})
  recordatorios: Recordatorio[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
