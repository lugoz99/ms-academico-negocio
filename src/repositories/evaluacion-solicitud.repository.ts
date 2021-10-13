import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EvaluacionSolicitud, EvaluacionSolicitudRelations, Solicitud, Jurado} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {JuradoRepository} from './jurado.repository';

export class EvaluacionSolicitudRepository extends DefaultCrudRepository<
  EvaluacionSolicitud,
  typeof EvaluacionSolicitud.prototype.id,
  EvaluacionSolicitudRelations
> {

  public readonly evalua: BelongsToAccessor<Solicitud, typeof EvaluacionSolicitud.prototype.id>;

  public readonly corresponde: BelongsToAccessor<Jurado, typeof EvaluacionSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(EvaluacionSolicitud, dataSource);
    this.corresponde = this.createBelongsToAccessorFor('corresponde', juradoRepositoryGetter,);
    this.registerInclusionResolver('corresponde', this.corresponde.inclusionResolver);
    this.evalua = this.createBelongsToAccessorFor('evalua', solicitudRepositoryGetter,);
    this.registerInclusionResolver('evalua', this.evalua.inclusionResolver);
  }
}
