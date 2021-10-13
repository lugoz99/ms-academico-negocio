import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, TipoVinculacion, Departamento, DepartamentoProponente, Solicitud} from '../models';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';
import {DepartamentoProponenteRepository} from './departamento-proponente.repository';
import {DepartamentoRepository} from './departamento.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly hecha_por: BelongsToAccessor<TipoVinculacion, typeof Proponente.prototype.id>;

  public readonly departamentosProponentes: HasManyThroughRepositoryFactory<Departamento, typeof Departamento.prototype.id,
          DepartamentoProponente,
          typeof Proponente.prototype.id
        >;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>, @repository.getter('DepartamentoProponenteRepository') protected departamentoProponenteRepositoryGetter: Getter<DepartamentoProponenteRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Proponente, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.departamentosProponentes = this.createHasManyThroughRepositoryFactoryFor('departamentosProponentes', departamentoRepositoryGetter, departamentoProponenteRepositoryGetter,);
    this.registerInclusionResolver('departamentosProponentes', this.departamentosProponentes.inclusionResolver);
    this.hecha_por = this.createBelongsToAccessorFor('hecha_por', tipoVinculacionRepositoryGetter,);
    this.registerInclusionResolver('hecha_por', this.hecha_por.inclusionResolver);
  }
}
