import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Proponente, TiposComite, ComiteSolicitud} from '../models';
import {ProponenteRepository} from './proponente.repository';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {TiposComiteRepository} from './tipos-comite.repository';

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

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('TiposComiteRepository') protected tiposComiteRepositoryGetter: Getter<TiposComiteRepository>,
  ) {
    super(Solicitud, dataSource);
    this.comite_solicitud = this.createHasManyThroughRepositoryFactoryFor('comite_solicitud', tiposComiteRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('comite_solicitud', this.comite_solicitud.inclusionResolver);
    this.asociado = this.createBelongsToAccessorFor('asociado', proponenteRepositoryGetter,);
    this.registerInclusionResolver('asociado', this.asociado.inclusionResolver);
  }
}
