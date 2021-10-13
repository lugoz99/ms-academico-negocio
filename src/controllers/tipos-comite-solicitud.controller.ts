import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
TiposComite,
ComiteSolicitud,
Solicitud,
} from '../models';
import {TiposComiteRepository} from '../repositories';

export class TiposComiteSolicitudController {
  constructor(
    @repository(TiposComiteRepository) protected tiposComiteRepository: TiposComiteRepository,
  ) { }

  @get('/tipos-comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of TiposComite has many Solicitud through ComiteSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.tiposComiteRepository.solicitudesComite(id).find(filter);
  }

  @post('/tipos-comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'create a Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TiposComite.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInTiposComite',
            exclude: ['id'],
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.tiposComiteRepository.solicitudesComite(id).create(solicitud);
  }

  @patch('/tipos-comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'TiposComite.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.tiposComiteRepository.solicitudesComite(id).patch(solicitud, where);
  }

  @del('/tipos-comites/{id}/solicituds', {
    responses: {
      '200': {
        description: 'TiposComite.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.tiposComiteRepository.solicitudesComite(id).delete(where);
  }
}
