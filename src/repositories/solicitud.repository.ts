import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Proponente, TiposComite, ComiteSolicitud, AreaInvestigacion, Modalidad, TipoSolicitud} from '../models';
import {ProponenteRepository} from './proponente.repository';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {TiposComiteRepository} from './tipos-comite.repository';
import {AreaInvestigacionRepository} from './area-investigacion.repository';
import {ModalidadRepository} from './modalidad.repository';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly asociado: BelongsToAccessor<Proponente, typeof Solicitud.prototype.id>;

  public readonly comite_solicitud: HasManyThroughRepositoryFactory<TiposComite, typeof TiposComite.prototype.id,
          ComiteSolicitud,
          typeof Solicitud.prototype.id
        >;

  public readonly areaInvestigacion: BelongsToAccessor<AreaInvestigacion, typeof Solicitud.prototype.id>;

  public readonly modalidad: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly tipoSolicitud: BelongsToAccessor<TipoSolicitud, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('TiposComiteRepository') protected tiposComiteRepositoryGetter: Getter<TiposComiteRepository>, @repository.getter('AreaInvestigacionRepository') protected areaInvestigacionRepositoryGetter: Getter<AreaInvestigacionRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>,
  ) {
    super(Solicitud, dataSource);
    this.tipoSolicitud = this.createBelongsToAccessorFor('tipoSolicitud', tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('tipoSolicitud', this.tipoSolicitud.inclusionResolver);
    this.modalidad = this.createBelongsToAccessorFor('modalidad', modalidadRepositoryGetter,);
    this.registerInclusionResolver('modalidad', this.modalidad.inclusionResolver);
    this.areaInvestigacion = this.createBelongsToAccessorFor('areaInvestigacion', areaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('areaInvestigacion', this.areaInvestigacion.inclusionResolver);
    this.comite_solicitud = this.createHasManyThroughRepositoryFactoryFor('comite_solicitud', tiposComiteRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('comite_solicitud', this.comite_solicitud.inclusionResolver);
    this.asociado = this.createBelongsToAccessorFor('asociado', proponenteRepositoryGetter,);
    this.registerInclusionResolver('asociado', this.asociado.inclusionResolver);
  }
}
