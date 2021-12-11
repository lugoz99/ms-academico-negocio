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
import {Solicitud, TipoSolicitud} from '../models';
import {TipoSolicitudRepository} from '../repositories';

export class TipoSolicitudSolicitudController {
  constructor(
    @repository(TipoSolicitudRepository)
    protected tipoSolicitudRepository: TipoSolicitudRepository,
  ) {}

  @get('/tipo-solicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of TipoSolicitud has many Solicitud',
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
    return this.tipoSolicitudRepository.relacionado(id).find(filter);
  }

  @post('/tipo-solicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'TipoSolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoSolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInTipoSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.tipoSolicitudRepository.relacionado(id).create(solicitud);
  }

  @patch('/tipo-solicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'TipoSolicitud.Solicitud PATCH success count',
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
    @param.query.object('where', getWhereSchemaFor(Solicitud))
    where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.tipoSolicitudRepository.relacionado(id).patch(solicitud, where);
  }

  @del('/tipo-solicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'TipoSolicitud.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud))
    where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.tipoSolicitudRepository.relacionado(id).delete(where);
  }
}
