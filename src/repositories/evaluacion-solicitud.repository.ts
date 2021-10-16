import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EvaluacionSolicitud, EvaluacionSolicitudRelations, ResultadoEvaluacion, Jurado, Solicitud} from '../models';
import {ResultadoEvaluacionRepository} from './resultado-evaluacion.repository';
import {JuradoRepository} from './jurado.repository';
import {SolicitudRepository} from './solicitud.repository';

export class EvaluacionSolicitudRepository extends DefaultCrudRepository<
  EvaluacionSolicitud,
  typeof EvaluacionSolicitud.prototype.id,
  EvaluacionSolicitudRelations
> {

  public readonly resultadosEvaluaciones: HasManyRepositoryFactory<ResultadoEvaluacion, typeof EvaluacionSolicitud.prototype.id>;

  public readonly corresponde_a: BelongsToAccessor<Jurado, typeof EvaluacionSolicitud.prototype.id>;

  public readonly evalua: BelongsToAccessor<Solicitud, typeof EvaluacionSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ResultadoEvaluacionRepository') protected resultadoEvaluacionRepositoryGetter: Getter<ResultadoEvaluacionRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(EvaluacionSolicitud, dataSource);
    this.evalua = this.createBelongsToAccessorFor('evalua', solicitudRepositoryGetter,);
    this.registerInclusionResolver('evalua', this.evalua.inclusionResolver);
    this.corresponde_a = this.createBelongsToAccessorFor('corresponde_a', juradoRepositoryGetter,);
    this.registerInclusionResolver('corresponde_a', this.corresponde_a.inclusionResolver);
    this.resultadosEvaluaciones = this.createHasManyRepositoryFactoryFor('resultadosEvaluaciones', resultadoEvaluacionRepositoryGetter,);
    this.registerInclusionResolver('resultadosEvaluaciones', this.resultadosEvaluaciones.inclusionResolver);
  }
}
