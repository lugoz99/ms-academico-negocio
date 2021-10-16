import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Proponente,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudProponenteController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/proponente', {
    responses: {
      '200': {
        description: 'Proponente belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async getProponente(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<Proponente> {
    return this.solicitudRepository.asociado(id);
  }
}
