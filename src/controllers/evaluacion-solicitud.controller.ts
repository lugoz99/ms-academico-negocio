import {service} from '@loopback/core';
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
import {Keys} from '../config/keys';
import {EvaluacionSolicitud, NotificacionCorreo} from '../models';
import {
  EvaluacionSolicitudRepository,
  JuradoRepository,
  SolicitudRepository,
  UsuarioJuradoRepository,
} from '../repositories';
import {GeneralService, NotificacionesService} from '../services';

export class EvaluacionSolicitudController {
  constructor(
    @repository(EvaluacionSolicitudRepository)
    public evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
    @repository(SolicitudRepository)
    public solictudRepository: SolicitudRepository,
    @repository(UsuarioJuradoRepository)
    public usuarioJuradoRepository: UsuarioJuradoRepository,
    @service(NotificacionesService)
    public notificaciones: NotificacionesService,
    @service(GeneralService)
    public generar: GeneralService,
  ) {}
  //@authenticate('admin')
  @post('/evaluacion-solicitudes')
  @response(200, {
    description: 'EvaluacionSolicitud model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(EvaluacionSolicitud)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {
            title: 'NewEvaluacionSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    evaluacionSolicitud: Omit<EvaluacionSolicitud, 'id'>,
  ): Promise<EvaluacionSolicitud> {
    let solicitud = await this.solictudRepository.findById(
      evaluacionSolicitud.id_solicitud,
    );
    console.log(solicitud.nombreTrabajo);
    let jurado = await this.juradoRepository.findById(
      evaluacionSolicitud.id_jurado,
    );
    console.log('Coreo de jurado evaluador', jurado.correo);
    let evalSolicitud = await this.evaluacionSolicitudRepository.create(
      evaluacionSolicitud,
    );
    if (evalSolicitud) {
      let d = new NotificacionCorreo();
      d.destinatario = jurado.correo;
      d.asunto = 'Invitacion evaluacion solicitud';
      d.mensaje = `Hola ${jurado.nombreCompleto} usted ha sido elegido
      como posible evaluador para confirmar o rechazar vaya al siguiente enlace
      ${Keys.enlace}`;
      this.notificaciones.EnviarCorreo(d);
    }
    return evalSolicitud;
  }

  @get('/evaluacion-solicitudes/count')
  @response(200, {
    description: 'EvaluacionSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EvaluacionSolicitud) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.count(where);
  }

  @get('/evaluacion-solicitudes')
  @response(200, {
    description: 'Array of EvaluacionSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EvaluacionSolicitud, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(EvaluacionSolicitud) filter?: Filter<EvaluacionSolicitud>,
  ): Promise<EvaluacionSolicitud[]> {
    return this.evaluacionSolicitudRepository.find(filter);
  }

  @patch('/evaluacion-solicitudes')
  @response(200, {
    description: 'EvaluacionSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: EvaluacionSolicitud,
    @param.where(EvaluacionSolicitud) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.updateAll(
      evaluacionSolicitud,
      where,
    );
  }

  @get('/evaluacion-solicitudes/{id}')
  @response(200, {
    description: 'EvaluacionSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EvaluacionSolicitud, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EvaluacionSolicitud, {exclude: 'where'})
    filter?: FilterExcludingWhere<EvaluacionSolicitud>,
  ): Promise<EvaluacionSolicitud> {
    return this.evaluacionSolicitudRepository.findById(id, filter);
  }

  @patch('/aceptar-solicitud/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: EvaluacionSolicitud,
  ): Promise<void> {
    /*
    1.Implementar operaciones de usuario a usuarioJurado
    2.Notificaciones a los administradores de sistema con CorreosNot parametrizados
    3..El jurado se crea cuando acepta o se puede manualmente
     */
    if (await this.evaluacionSolicitudRepository.findById(id)) {
      console.log('La solicitud para evaluar si existe');
    }
    if (evaluacionSolicitud.respuesta == 3) {
      let jurado = await this.juradoRepository.findOne({
        where: {
          id: evaluacionSolicitud.id_jurado,
        },
      });
      let solicitud = await this.solictudRepository.findOne({
        where: {
          id: evaluacionSolicitud.id_solicitud,
        },
      });

      let clave = this.generar.crearClaveAleatoria();
      let claveCifrada = this.generar.cifrarTexto(clave);
      let crearUsaurioJurado = await this.usuarioJuradoRepository.create({
        id_jurado: jurado?.id,
        usuario: jurado?.correo,
        clave: claveCifrada,
      });
      if (crearUsaurioJurado) {
        console.log('Usuario Jurado creado', crearUsaurioJurado);
        if (solicitud) {
          solicitud.estado = 1;
          console.log('ESTADO CAMBIADO');
          await this.solictudRepository.save(solicitud);
        }
        console.log(`El jurado ${jurado?.nombreCompleto} ha aceptado`);
      }
    } else {
      console.log(`El jurado No acepto`);
      evaluacionSolicitud.respuesta = 2;
      console.log('respuesta solicitud en 2 por no aceptar');
    }
    await this.evaluacionSolicitudRepository.updateById(
      id,
      evaluacionSolicitud,
    );
  }

  @put('/evaluacion-solicitudes/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evaluacionSolicitud: EvaluacionSolicitud,
  ): Promise<void> {
    await this.evaluacionSolicitudRepository.replaceById(
      id,
      evaluacionSolicitud,
    );
  }

  @del('/evaluacion-solicitudes/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.evaluacionSolicitudRepository.deleteById(id);
  }
}
