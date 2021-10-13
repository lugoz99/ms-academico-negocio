import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ResultadoEvaluacion, ResultadoEvaluacionRelations, EvaluacionSolicitud} from '../models';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';

export class ResultadoEvaluacionRepository extends DefaultCrudRepository<
  ResultadoEvaluacion,
  typeof ResultadoEvaluacion.prototype.id,
  ResultadoEvaluacionRelations
> {

  public readonly resultado: BelongsToAccessor<EvaluacionSolicitud, typeof ResultadoEvaluacion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>,
  ) {
    super(ResultadoEvaluacion, dataSource);
    this.resultado = this.createBelongsToAccessorFor('resultado', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('resultado', this.resultado.inclusionResolver);
  }
}
