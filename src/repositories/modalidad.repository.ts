import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Modalidad, ModalidadRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class ModalidadRepository extends DefaultCrudRepository<
  Modalidad,
  typeof Modalidad.prototype.id,
  ModalidadRelations
> {

  public readonly tiene_una: HasManyRepositoryFactory<Solicitud, typeof Modalidad.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Modalidad, dataSource);
    this.tiene_una = this.createHasManyRepositoryFactoryFor('tiene_una', solicitudRepositoryGetter,);
    this.registerInclusionResolver('tiene_una', this.tiene_una.inclusionResolver);
  }
}
