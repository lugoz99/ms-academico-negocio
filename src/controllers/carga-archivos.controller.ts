import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors,
  param,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Keys as llaves} from '../config/keys';
import {Proponente, Solicitud, TipoSolicitud} from '../models';
import {
  ProponenteRepository,
  SolicitudRepository,
  TipoSolicitudRepository,
} from '../repositories';

export class CargaArchivoController {
  constructor(
    @repository(SolicitudRepository)
    private solicitudArchivo: SolicitudRepository,
    @repository(ProponenteRepository)
    private proponente: ProponenteRepository,
    @repository(TipoSolicitudRepository)
    private tipoSolicitud: TipoSolicitudRepository,
  ) {}

  /**
   *
   * @param response
   * @param request
   * @param id_Proponente
   */
  @post('/CargarImagenProponente', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen del proponente.',
      },
    },
  })
  async cargarImagenDelProponente(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.number('id_Proponente') id_proponente: number,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaImagenPersona = path.join(
      __dirname,
      llaves.carpetaImagenProponente,
    );
    let res = await this.StoreFileToPath(
      rutaImagenPersona,
      llaves.nombreCampoImagenProponente,
      request,
      response,
      llaves.extensionesPermitidasIMG,
    );

    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let p: Proponente = await this.proponente.findById(id_proponente);
        if (p) {
          p.foto = nombre_archivo;
          this.proponente.replaceById(id_proponente, p);
        }
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   * @param id_solicitud
   */
  @post('/CargarDocumentoSolicitud', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de documentos de la persona.',
      },
    },
  })
  async DocumentosSolictud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.query.number('id_solicitud') id: number,
  ): Promise<object | false> {
    const rutaDocumentoPersona = path.join(
      __dirname,
      llaves.carpetaArchivoSolicitud,
    );
    let res = await this.StoreFileToPath(
      rutaDocumentoPersona,
      llaves.nombreCampoArchivoSolicitud,
      request,
      response,
      llaves.extensionesPermitidasDOC,
    );
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        const s: Solicitud = await this.solicitudArchivo.findById(id);
        if (s) {
          s.archivo = nombre_archivo;
          this.solicitudArchivo.replaceById(id, s);
          return {filename: nombre_archivo};
        }
      }
    }
    return res;
  }
  @post('/CargarFormatoSolicitud', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de formato tipo solictud.',
      },
    },
  })
  /**
   *
   * @param response
   * @param request
   * @param id_tipoSolicitud
   */
  async DocumentosFormatoSolictud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.query.number('id_tipoSolicitud') id: number,
  ): Promise<object | false> {
    const rutaDocumentoPersona = path.join(
      __dirname,
      llaves.carpetaFormatoSolicitud,
    );
    let res = await this.StoreFileToPath(
      rutaDocumentoPersona,
      llaves.nombreFormatoArchivoSolicitud,
      request,
      response,
      llaves.extensionesPermitidasDOC,
    );
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        const s: TipoSolicitud = await this.tipoSolicitud.findById(id);
        if (s) {
          s.formato = nombre_archivo;
          this.tipoSolicitud.replaceById(id, s);
          return {filename: nombre_archivo};
        }
      }
    }
    return res;
  }

  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path);
      },
      // no se repita el nombre del archivo
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(
    storePath: string,
    fieldname: string,
    request: Request,
    response: Response,
    acceptedExt: string[],
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            // proceso de almacenamiento
            return callback(null, true);
          }

          return callback(
            new HttpErrors[400]('El formato del archivo no es permitido.'),
          );
        },
        limits: {
          fileSize: llaves.tamMaxImagenProponente,
        },
      }).single(fieldname);
      // proceso de carga
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }
}
