import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Facultad} from '../models';
import {FacultadRepository} from './facultad.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly tiene_muchos: BelongsToAccessor<Facultad, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacultadRepository') protected facultadRepositoryGetter: Getter<FacultadRepository>,
  ) {
    super(Departamento, dataSource);
    this.tiene_muchos = this.createBelongsToAccessorFor('tiene_muchos', facultadRepositoryGetter,);
    this.registerInclusionResolver('tiene_muchos', this.tiene_muchos.inclusionResolver);
  }
}
