import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, Departamento, DepartamentoProponente} from '../models';
import {DepartamentoProponenteRepository} from './departamento-proponente.repository';
import {DepartamentoRepository} from './departamento.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly departamentosProponentes: HasManyThroughRepositoryFactory<Departamento, typeof Departamento.prototype.id,
          DepartamentoProponente,
          typeof Proponente.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoProponenteRepository') protected departamentoProponenteRepositoryGetter: Getter<DepartamentoProponenteRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Proponente, dataSource);
    this.departamentosProponentes = this.createHasManyThroughRepositoryFactoryFor('departamentosProponentes', departamentoRepositoryGetter, departamentoProponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentosProponentes', this.departamentosProponentes.inclusionResolver);
  }
}
