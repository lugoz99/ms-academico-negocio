import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DepartamentoProponente} from '../models';
import {DepartamentoProponenteRepository} from '../repositories';

export class DepartamentoProponenteController {
  constructor(
    @repository(DepartamentoProponenteRepository)
    public departamentoProponenteRepository : DepartamentoProponenteRepository,
  ) {}

  @post('/departamento-proponentes')
  @response(200, {
    description: 'DepartamentoProponente model instance',
    content: {'application/json': {schema: getModelSchemaRef(DepartamentoProponente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartamentoProponente, {
            title: 'NewDepartamentoProponente',
            exclude: ['id'],
          }),
        },
      },
    })
    departamentoProponente: Omit<DepartamentoProponente, 'id'>,
  ): Promise<DepartamentoProponente> {
    return this.departamentoProponenteRepository.create(departamentoProponente);
  }

  @get('/departamento-proponentes/count')
  @response(200, {
    description: 'DepartamentoProponente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DepartamentoProponente) where?: Where<DepartamentoProponente>,
  ): Promise<Count> {
    return this.departamentoProponenteRepository.count(where);
  }

  @get('/departamento-proponentes')
  @response(200, {
    description: 'Array of DepartamentoProponente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DepartamentoProponente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DepartamentoProponente) filter?: Filter<DepartamentoProponente>,
  ): Promise<DepartamentoProponente[]> {
    return this.departamentoProponenteRepository.find(filter);
  }

  @patch('/departamento-proponentes')
  @response(200, {
    description: 'DepartamentoProponente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartamentoProponente, {partial: true}),
        },
      },
    })
    departamentoProponente: DepartamentoProponente,
    @param.where(DepartamentoProponente) where?: Where<DepartamentoProponente>,
  ): Promise<Count> {
    return this.departamentoProponenteRepository.updateAll(departamentoProponente, where);
  }

  @get('/departamento-proponentes/{id}')
  @response(200, {
    description: 'DepartamentoProponente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DepartamentoProponente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DepartamentoProponente, {exclude: 'where'}) filter?: FilterExcludingWhere<DepartamentoProponente>
  ): Promise<DepartamentoProponente> {
    return this.departamentoProponenteRepository.findById(id, filter);
  }

  @patch('/departamento-proponentes/{id}')
  @response(204, {
    description: 'DepartamentoProponente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartamentoProponente, {partial: true}),
        },
      },
    })
    departamentoProponente: DepartamentoProponente,
  ): Promise<void> {
    await this.departamentoProponenteRepository.updateById(id, departamentoProponente);
  }

  @put('/departamento-proponentes/{id}')
  @response(204, {
    description: 'DepartamentoProponente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() departamentoProponente: DepartamentoProponente,
  ): Promise<void> {
    await this.departamentoProponenteRepository.replaceById(id, departamentoProponente);
  }

  @del('/departamento-proponentes/{id}')
  @response(204, {
    description: 'DepartamentoProponente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.departamentoProponenteRepository.deleteById(id);
  }
}
