import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ComiteSolicitud, GeneralModel, Solicitud} from '../models';
import {ComiteSolicitudRepository} from '../repositories';

export class ComiteSolicitudController {
  constructor(
    @repository(ComiteSolicitudRepository)
    public comiteSolicitudRepository: ComiteSolicitudRepository,
  ) {}

  @post('/solicitudes-comite')
  @response(200, {
    description: 'ComiteSolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(ComiteSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ComiteSolicitud, {
            title: 'NewComiteSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    comiteSolicitud: Omit<ComiteSolicitud, 'id'>,
  ): Promise<ComiteSolicitud> {
    return this.comiteSolicitudRepository.create(comiteSolicitud);
  }
  @post('/asociar-jurado-investigaciones/{id}')
  @response(200, {
    description: 'JuradoInvestigacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(GeneralModel)}},
  })
  async createRelaton(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GeneralModel, {}),
        },
      },
    })
    datos: GeneralModel,
    @param.path.number('id') solicitudId: typeof Solicitud.prototype.id,
  ): Promise<Boolean> {
    if (datos.arreglo.length > 0) {
      datos.arreglo.forEach(async (comiteId: number) => {
        let existe = await this.comiteSolicitudRepository.findOne({
          where: {
            id_comite: comiteId,
            id_solicitud: solicitudId,
          },
        });
        if (!existe) {
          let comiteSolicitud = await this.comiteSolicitudRepository.create({
            id_comite: comiteId,
            id_solicitud: solicitudId,
          });
          console.log(comiteSolicitud);
        }
      });
    }
    return true;
  }

  @get('/solicitudes-comite/count')
  @response(200, {
    description: 'ComiteSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ComiteSolicitud) where?: Where<ComiteSolicitud>,
  ): Promise<Count> {
    return this.comiteSolicitudRepository.count(where);
  }

  @get('/solicitudes-comite')
  @response(200, {
    description: 'Array of ComiteSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ComiteSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ComiteSolicitud) filter?: Filter<ComiteSolicitud>,
  ): Promise<ComiteSolicitud[]> {
    return this.comiteSolicitudRepository.find(filter);
  }

  @patch('/solicitudes-comite')
  @response(200, {
    description: 'ComiteSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ComiteSolicitud, {partial: true}),
        },
      },
    })
    comiteSolicitud: ComiteSolicitud,
    @param.where(ComiteSolicitud) where?: Where<ComiteSolicitud>,
  ): Promise<Count> {
    return this.comiteSolicitudRepository.updateAll(comiteSolicitud, where);
  }

  @get('/solicitudes-comite/{id}')
  @response(200, {
    description: 'ComiteSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ComiteSolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ComiteSolicitud, {exclude: 'where'})
    filter?: FilterExcludingWhere<ComiteSolicitud>,
  ): Promise<ComiteSolicitud> {
    return this.comiteSolicitudRepository.findById(id, filter);
  }

  @patch('/solicitudes-comite/{id}')
  @response(204, {
    description: 'ComiteSolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ComiteSolicitud, {partial: true}),
        },
      },
    })
    comiteSolicitud: ComiteSolicitud,
  ): Promise<void> {
    await this.comiteSolicitudRepository.updateById(id, comiteSolicitud);
  }

  @put('/solicitudes-comite/{id}')
  @response(204, {
    description: 'ComiteSolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() comiteSolicitud: ComiteSolicitud,
  ): Promise<void> {
    await this.comiteSolicitudRepository.replaceById(id, comiteSolicitud);
  }

  @del('/solicitudes-comite/{id}')
  @response(204, {
    description: 'ComiteSolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.comiteSolicitudRepository.deleteById(id);
  }
}
