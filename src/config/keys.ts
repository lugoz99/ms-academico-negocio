export namespace Keys {
  export const carpetaImagenProponente = '../../archivos/proponentes';
  export const nombreCampoImagenProponente = 'file';
  export const extensionesPermitidasIMG: string[] = [
    '.PNG',
    '.JPG',
    '.JPEG',
    '.SVG',
  ];
  export const tamMaxImagenProponente = 1024 * 1024;
  export const carpetaDocumentoPersona = '../../archivos/documentos';
  export const nombreCampoDocumentoPersona = 'file';
  export const extensionesPermitidasDOC: string[] = [
    '.PDF',
    '.DOC',
    '.DOCX',
    '.XLS',
    '.XLSX',
  ];
  export const rol_administrador = '615b1ecff6889450d04becb5'; // admin-mongodb
  export const url_validar_token = 'http://localhost:5001/validar-token';
  export const arg_token = 'token';
  export const arg_rol_token = 'rol';
}
