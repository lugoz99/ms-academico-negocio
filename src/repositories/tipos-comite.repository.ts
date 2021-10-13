import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TiposComite, TiposComiteRelations, Solicitud, ComiteSolicitud} from '../models';
import {ComiteSolicitudRepository} from './comite-solicitud.repository';
import {SolicitudRepository} from './solicitud.repository';

export class TiposComiteRepository extends DefaultCrudRepository<
  TiposComite,
  typeof TiposComite.prototype.id,
  TiposComiteRelations
> {

  public readonly solicitudesComite: HasManyThroughRepositoryFactory<Solicitud, typeof Solicitud.prototype.id,
          ComiteSolicitud,
          typeof TiposComite.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ComiteSolicitudRepository') protected comiteSolicitudRepositoryGetter: Getter<ComiteSolicitudRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(TiposComite, dataSource);
    this.solicitudesComite = this.createHasManyThroughRepositoryFactoryFor('solicitudesComite', solicitudRepositoryGetter, comiteSolicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudesComite', this.solicitudesComite.inclusionResolver);
  }
}
