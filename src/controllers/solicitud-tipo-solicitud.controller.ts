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
  Solicitud,
  TipoSolicitud,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudTipoSolicitudController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/tipo-solicituds', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many TipoSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoSolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TipoSolicitud>,
  ): Promise<TipoSolicitud[]> {
    return this.solicitudRepository.tiposSolicitud(id).find(filter);
  }

  @post('/solicituds/{id}/tipo-solicituds', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoSolicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSolicitud, {
            title: 'NewTipoSolicitudInSolicitud',
            exclude: ['id'],
            optional: ['id_tipo_solicitud']
          }),
        },
      },
    }) tipoSolicitud: Omit<TipoSolicitud, 'id'>,
  ): Promise<TipoSolicitud> {
    return this.solicitudRepository.tiposSolicitud(id).create(tipoSolicitud);
  }

  @patch('/solicituds/{id}/tipo-solicituds', {
    responses: {
      '200': {
        description: 'Solicitud.TipoSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoSolicitud, {partial: true}),
        },
      },
    })
    tipoSolicitud: Partial<TipoSolicitud>,
    @param.query.object('where', getWhereSchemaFor(TipoSolicitud)) where?: Where<TipoSolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.tiposSolicitud(id).patch(tipoSolicitud, where);
  }

  @del('/solicituds/{id}/tipo-solicituds', {
    responses: {
      '200': {
        description: 'Solicitud.TipoSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TipoSolicitud)) where?: Where<TipoSolicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.tiposSolicitud(id).delete(where);
  }
}
