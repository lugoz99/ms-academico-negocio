import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, UsuarioJurado, AreaInvestigacion, JuradoInvestigacion} from '../models';
import {UsuarioJuradoRepository} from './usuario-jurado.repository';
import {JuradoInvestigacionRepository} from './jurado-investigacion.repository';
import {AreaInvestigacionRepository} from './area-investigacion.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly usuarioJurado: HasOneRepositoryFactory<UsuarioJurado, typeof Jurado.prototype.id>;

  public readonly juradosInvestigaciones: HasManyThroughRepositoryFactory<AreaInvestigacion, typeof AreaInvestigacion.prototype.id,
          JuradoInvestigacion,
          typeof Jurado.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioJuradoRepository') protected usuarioJuradoRepositoryGetter: Getter<UsuarioJuradoRepository>, @repository.getter('JuradoInvestigacionRepository') protected juradoInvestigacionRepositoryGetter: Getter<JuradoInvestigacionRepository>, @repository.getter('AreaInvestigacionRepository') protected areaInvestigacionRepositoryGetter: Getter<AreaInvestigacionRepository>,
  ) {
    super(Jurado, dataSource);
    this.juradosInvestigaciones = this.createHasManyThroughRepositoryFactoryFor('juradosInvestigaciones', areaInvestigacionRepositoryGetter, juradoInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('juradosInvestigaciones', this.juradosInvestigaciones.inclusionResolver);
    this.usuarioJurado = this.createHasOneRepositoryFactoryFor('usuarioJurado', usuarioJuradoRepositoryGetter);
    this.registerInclusionResolver('usuarioJurado', this.usuarioJurado.inclusionResolver);
  }
}
