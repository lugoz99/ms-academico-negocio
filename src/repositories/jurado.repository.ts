import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, UsuarioJurado, AreaInvestigacion, JuradoInvestigacion, EvaluacionSolicitud} from '../models';
import {UsuarioJuradoRepository} from './usuario-jurado.repository';
import {JuradoInvestigacionRepository} from './jurado-investigacion.repository';
import {AreaInvestigacionRepository} from './area-investigacion.repository';
import {EvaluacionSolicitudRepository} from './evaluacion-solicitud.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly usuarioJurado: HasOneRepositoryFactory<UsuarioJurado, typeof Jurado.prototype.id>;

  public readonly juradosInvestigacion: HasManyThroughRepositoryFactory<AreaInvestigacion, typeof AreaInvestigacion.prototype.id,
          JuradoInvestigacion,
          typeof Jurado.prototype.id
        >;

  public readonly evaluacionJurado: HasManyRepositoryFactory<EvaluacionSolicitud, typeof Jurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioJuradoRepository') protected usuarioJuradoRepositoryGetter: Getter<UsuarioJuradoRepository>, @repository.getter('JuradoInvestigacionRepository') protected juradoInvestigacionRepositoryGetter: Getter<JuradoInvestigacionRepository>, @repository.getter('AreaInvestigacionRepository') protected areaInvestigacionRepositoryGetter: Getter<AreaInvestigacionRepository>, @repository.getter('EvaluacionSolicitudRepository') protected evaluacionSolicitudRepositoryGetter: Getter<EvaluacionSolicitudRepository>,
  ) {
    super(Jurado, dataSource);
    this.evaluacionJurado = this.createHasManyRepositoryFactoryFor('evaluacionJurado', evaluacionSolicitudRepositoryGetter,);
    this.registerInclusionResolver('evaluacionJurado', this.evaluacionJurado.inclusionResolver);
    this.juradosInvestigacion = this.createHasManyThroughRepositoryFactoryFor('juradosInvestigacion', areaInvestigacionRepositoryGetter, juradoInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('juradosInvestigacion', this.juradosInvestigacion.inclusionResolver);
    this.usuarioJurado = this.createHasOneRepositoryFactoryFor('usuarioJurado', usuarioJuradoRepositoryGetter);
    this.registerInclusionResolver('usuarioJurado', this.usuarioJurado.inclusionResolver);
  }
}
