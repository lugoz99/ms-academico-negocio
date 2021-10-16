import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoSolicitud, TipoSolicitudRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class TipoSolicitudRepository extends DefaultCrudRepository<
  TipoSolicitud,
  typeof TipoSolicitud.prototype.id,
  TipoSolicitudRelations
> {

  public readonly relacionado: HasManyRepositoryFactory<Solicitud, typeof TipoSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(TipoSolicitud, dataSource);
    this.relacionado = this.createHasManyRepositoryFactoryFor('relacionado', solicitudRepositoryGetter,);
    this.registerInclusionResolver('relacionado', this.relacionado.inclusionResolver);
  }
}
