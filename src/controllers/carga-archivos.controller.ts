import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Keys as llaves} from '../config/keys';
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
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   *
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
        return {filename: nombre_archivo};
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
   *
   */
  async DocumentosFormatoSolictud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
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
        return {filename: nombre_archivo};
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
