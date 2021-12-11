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
import {NotificacionCorreo, UsuarioJurado} from '../models';
import {JuradoRepository, UsuarioJuradoRepository} from '../repositories';
import {GeneralService, NotificacionesService} from '../services';

export class UsuarioJuradoController {
  constructor(
    @repository(UsuarioJuradoRepository)
    public usuarioJuradoRepository: UsuarioJuradoRepository,
    @service(GeneralService)
    public general: GeneralService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
  ) {}

  @post('/usuario-jurados')
  @response(200, {
    description: 'UsuarioJurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioJurado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioJurado, {
            title: 'NewUsuarioJurado',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioJurado: Omit<UsuarioJurado, 'id'>,
  ): Promise<UsuarioJurado> {
    let juradoExiste = await this.juradoRepository.findById(
      usuarioJurado.id_jurado,
    );
    console.log(juradoExiste.correo);
    let clave = this.general.crearClaveAleatoria();
    console.log('Clave usuario : ', clave);
    usuarioJurado.id_jurado = juradoExiste.id;
    let claveCifrada = this.general.cifrarTexto(clave);
    usuarioJurado.clave = claveCifrada;
    let usuarioCreado = await this.usuarioJuradoRepository.create(
      usuarioJurado,
    );
    if (usuarioCreado) {
      let datos = new NotificacionCorreo();
      datos.destinatario = juradoExiste.correo;
      datos.asunto = 'Usuario del sistema ';
      datos.mensaje = `${juradoExiste.nombreCompleto} ${clave} para acceder al sistema`;
      console.log(datos.mensaje);
      this.servicioNotificaciones.EnviarCorreo(datos);
      console.log(datos);
    }
    console.log(usuarioCreado);
    return usuarioCreado;
  }

  @get('/usuario-jurados/count')
  @response(200, {
    description: 'UsuarioJurado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioJurado) where?: Where<UsuarioJurado>,
  ): Promise<Count> {
    return this.usuarioJuradoRepository.count(where);
  }

  @get('/usuario-jurados')
  @response(200, {
    description: 'Array of UsuarioJurado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioJurado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioJurado) filter?: Filter<UsuarioJurado>,
  ): Promise<UsuarioJurado[]> {
    return this.usuarioJuradoRepository.find(filter);
  }

  @patch('/usuario-jurados')
  @response(200, {
    description: 'UsuarioJurado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioJurado, {partial: true}),
        },
      },
    })
    usuarioJurado: UsuarioJurado,
    @param.where(UsuarioJurado) where?: Where<UsuarioJurado>,
  ): Promise<Count> {
    return this.usuarioJuradoRepository.updateAll(usuarioJurado, where);
  }

  @get('/usuario-jurados/{id}')
  @response(200, {
    description: 'UsuarioJurado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioJurado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UsuarioJurado, {exclude: 'where'})
    filter?: FilterExcludingWhere<UsuarioJurado>,
  ): Promise<UsuarioJurado> {
    return this.usuarioJuradoRepository.findById(id, filter);
  }

  @patch('/usuario-jurados/{id}')
  @response(204, {
    description: 'UsuarioJurado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioJurado, {partial: true}),
        },
      },
    })
    usuarioJurado: UsuarioJurado,
  ): Promise<void> {
    await this.usuarioJuradoRepository.updateById(id, usuarioJurado);
  }

  @put('/usuario-jurados/{id}')
  @response(204, {
    description: 'UsuarioJurado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarioJurado: UsuarioJurado,
  ): Promise<void> {
    await this.usuarioJuradoRepository.replaceById(id, usuarioJurado);
  }

  @del('/usuario-jurados/{id}')
  @response(204, {
    description: 'UsuarioJurado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioJuradoRepository.deleteById(id);
  }
}
