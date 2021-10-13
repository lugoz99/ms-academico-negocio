import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, TipoSolicitud, Modalidad, Proponente, TiposComite, ComiteSolicitud, AreaInvestigacion, EvaluacionSolicitud, Recordatorio} from '../models';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';
import {ModalidadRepository} from './modalidad.repository';
import {ProponenteRepository} from './proponente.repository';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {TiposComiteRepository} from './tipos-comite.repository';
import {AreaInvestigacionRepository} from './area-investigacion.repository';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';
import {RecordatorioRepository} from './recordatorio.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly gestiona: BelongsToAccessor<TipoSolicitud, typeof Solicitud.prototype.id>;

  public readonly tiposSolicitud: HasManyRepositoryFactory<TipoSolicitud, typeof Solicitud.prototype.id>;

  public readonly genera: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly pertenece_a: BelongsToAccessor<Proponente, typeof Solicitud.prototype.id>;

  public readonly pertenece_A: BelongsToAccessor<Proponente, typeof Solicitud.prototype.id>;

  public readonly comiteSolicitudes: HasManyThroughRepositoryFactory<TiposComite, typeof TiposComite.prototype.id,
          ComiteSolicitud,
          typeof Solicitud.prototype.id
        >;

  public readonly asocia: BelongsToAccessor<AreaInvestigacion, typeof Solicitud.prototype.id>;

  public readonly evaluacionSolicitudes: HasManyRepositoryFactory<EvaluacionSolicitud, typeof Solicitud.prototype.id>;

  public readonly recordatorios: HasManyRepositoryFactory<Recordatorio, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('TiposComiteRepository') protected tiposComiteRepositoryGetter: Getter<TiposComiteRepository>, @repository.getter('AreaInvestigacionRepository') protected areaInvestigacionRepositoryGetter: Getter<AreaInvestigacionRepository>, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>, @repository.getter('RecordatorioRepository') protected recordatorioRepositoryGetter: Getter<RecordatorioRepository>,
  ) {
    super(Solicitud, dataSource);
    this.recordatorios = this.createHasManyRepositoryFactoryFor('recordatorios', recordatorioRepositoryGetter,);
    this.registerInclusionResolver('recordatorios', this.recordatorios.inclusionResolver);
    this.evaluacionSolicitudes = this.createHasManyRepositoryFactoryFor('evaluacionSolicitudes', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('evaluacionSolicitudes', this.evaluacionSolicitudes.inclusionResolver);
    this.asocia = this.createBelongsToAccessorFor('asocia', areaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('asocia', this.asocia.inclusionResolver);
    this.comiteSolicitudes = this.createHasManyThroughRepositoryFactoryFor('comiteSolicitudes', tiposComiteRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('comiteSolicitudes', this.comiteSolicitudes.inclusionResolver);
    this.pertenece_A = this.createBelongsToAccessorFor('pertenece_A', proponenteRepositoryGetter,);
    this.registerInclusionResolver('pertenece_A', this.pertenece_A.inclusionResolver);
    this.pertenece_a = this.createBelongsToAccessorFor('pertenece_a', proponenteRepositoryGetter,);
    this.genera = this.createBelongsToAccessorFor('genera', modalidadRepositoryGetter,);
    this.registerInclusionResolver('genera', this.genera.inclusionResolver);
    this.tiposSolicitud = this.createHasManyRepositoryFactoryFor('tiposSolicitud', tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tiposSolicitud', this.tiposSolicitud.inclusionResolver);
    this.gestiona = this.createBelongsToAccessorFor('gestiona', tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('gestiona', this.gestiona.inclusionResolver);
  }
}
