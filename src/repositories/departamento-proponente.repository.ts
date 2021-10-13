import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {DepartamentoProponente, DepartamentoProponenteRelations} from '../models';

export class DepartamentoProponenteRepository extends DefaultCrudRepository<
  DepartamentoProponente,
  typeof DepartamentoProponente.prototype.id,
  DepartamentoProponenteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(DepartamentoProponente, dataSource);
  }
}
