var createHash = require('hash-generator');
var moment = require('moment');
export namespace Keys {
  export const carpetaImagenProponente = '../../archivos/proponentesFoto';
  export const carpetaFormatoSolicitud = '../../archivos/formatoSolicitud';
  export const carpetaArchivoSolicitud = '../../archivos/solicitud';

  export const nombreCampoImagenProponente = 'file';
  export const nombreCampoArchivoSolicitud = 'file';
  export const nombreFormatoArchivoSolicitud = 'file';

  export const extensionesPermitidasIMG: string[] = [
    '.PNG',
    '.JPG',
    '.JPEG',
    '.SVG',
  ];
  export const tamMaxImagenProponente = 1024 * 1024;
  export const extensionesPermitidasDOC: string[] = [
    '.PDF',
    '.DOC',
    '.DOCX',
    '.XLS',
    '.XLSX',
  ];
  export const rol_administrador = '618b1e2ab236532348cd28ef'; // admin-mongodb
  export const rol_evaluador = '618b1e2ab236532348cd28ef'; // arreglar rol juradoEvaluador
  export const url_validar_token = 'http://localhost:5001/validar-token';
  export const arg_token = 'token';
  export const arg_rol_token = 'rol';

  // Envio Mensajes
  export let fecha = moment().format('MMMM D YYYY, h:mm:ss a'); // December 4th 2021, 3:54:07 pm
  let hashLength = 8;
  export let hash = createHash(hashLength);
  export let enlace = `http://localhost:4200/solicitudes/respuesta-invitacion`;
  export const hashNotificacion = 'ABC123';
  export const mensajeEvaluador =
    'Usted ha sido eligo para evaluar una solicitud';
  export const asuntoEvaluador = 'Invitacion para evaluar solicitd';
  export const urlCorreo = 'http://localhost:5000/correo';
  export const urlMensajeTexto = 'http://localhost:5000/sms';
  export const saludoEvaluador = 'Hola';
  export const destinoArg = 'destino';
  export const asuntoArg = 'asunto';
  export const mensajeArg = 'mensaje';
  export const hashArg = 'hash';
  export const arg_nombre = 'nombre';
  export const arg_id_persona = 'id';
  export const arg_rol = 'id_rol';
  export const arg_id_persona_token = 'id';
  export const arg_id_rol_token = 'id_rol';
}
