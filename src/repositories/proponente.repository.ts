import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, Departamento, DepartamentoProponente, TipoVinculacion} from '../models';
import {DepartamentoProponenteRepository} from './departamento-proponente.repository';
import {DepartamentoRepository} from './departamento.repository';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly departamentosProponentes: HasManyThroughRepositoryFactory<Departamento, typeof Departamento.prototype.id,
          DepartamentoProponente,
          typeof Proponente.prototype.id
        >;

  public readonly tipoVinculacion: BelongsToAccessor<TipoVinculacion, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoProponenteRepository') protected departamentoProponenteRepositoryGetter: Getter<DepartamentoProponenteRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>,
  ) {
    super(Proponente, dataSource);
    this.tipoVinculacion = this.createBelongsToAccessorFor('tipoVinculacion', tipoVinculacionRepositoryGetter,);
    this.registerInclusionResolver('tipoVinculacion', this.tipoVinculacion.inclusionResolver);
    this.departamentosProponentes = this.createHasManyThroughRepositoryFactoryFor('departamentosProponentes', departamentoRepositoryGetter, departamentoProponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentosProponentes', this.departamentosProponentes.inclusionResolver);
  }
}
