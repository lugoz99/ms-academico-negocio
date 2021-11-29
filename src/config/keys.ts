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
  export const url_validar_token = 'http://localhost:5001/validar-token';
  export const arg_token = 'token';
  export const arg_rol_token = 'rol';
}
