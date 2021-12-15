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
  CorreoNotificacionRepository,
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
    @service(CorreoNotificacionRepository)
    public correosNotificacion: CorreoNotificacionRepository,
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
    let evalSolicitud = await this.evaluacionSolicitudRepository.create(
      evaluacionSolicitud,
    );
    evalSolicitud.fecha_invitacion = Keys.fecha.toString();
    await this.evaluacionSolicitudRepository.save(evalSolicitud);
    if (evalSolicitud) {
      let d = new NotificacionCorreo();
      d.destinatario = jurado.correo;
      d.asunto = 'Invitacion evaluacion solicitud';
      d.mensaje = `Hola ${jurado.nombreCompleto} usted ha sido elegido
      como posible evaluador para confirmar o rechazar vaya al siguiente enlace
      <a href="${Keys.enlace}/${
        (await evalSolicitud).id
      }">Confirmar Respuesta</a>`;
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
    let jurado = await this.juradoRepository.findOne({
      where: {
        id: evaluacionSolicitud.id_jurado,
      },
    });
    if (await this.evaluacionSolicitudRepository.findById(id)) {
      console.log('La solicitud para evaluar si existe');
    }
    if (evaluacionSolicitud.respuesta == 3) {
      console.log('Jurado encontrado', jurado);
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
        let datos = new NotificacionCorreo();
        datos.asunto = 'Datos de usuario';
        datos.destinatario = crearUsaurioJurado.usuario;
        datos.mensaje = `Usuario:${crearUsaurioJurado.usuario} - Clave:${crearUsaurioJurado.clave}`;
        this.notificaciones.EnviarCorreo(datos);
      }
    } else {
      console.log(`Notificacion a los a administradores del sistema`);
      evaluacionSolicitud.respuesta = 2;
      const c = await this.correosNotificacion.find({
        fields: ['correo'],
      });
      c.forEach(element => {
        let datos = new NotificacionCorreo();
        datos.asunto = 'Respuesta del jurado';
        datos.destinatario = element.correo;
        datos.mensaje = `La respuesta del jurado ${jurado?.nombreCompleto}
        para evaluar la solicitud ha sido rechazada`;
        this.notificaciones.EnviarCorreo(datos);
      });
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
