import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';
import {NotificacionCorreo, NotificacionSms} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  EnviarCorreo(datos: NotificacionCorreo): Boolean {
    let url = `${Keys.urlCorreo}?${Keys.destinoArg}=${datos.destinatario}&${Keys.asuntoArg}=${datos.asunto}&${Keys.mensajeArg}=${datos.mensaje}&${Keys.hashArg}=${Keys.hashNotificacion}`;
    console.log(url);
    fetch(url).then((data: any) => {
      return true;
    });
    return true;
  }

  EnviarSms(datos: NotificacionSms): Boolean {
    let url = `${Keys.urlMensajeTexto}?${Keys.destinoArg}=${datos.destino}&${Keys.mensajeArg}=${datos.mensaje}&${Keys.hashArg}=${Keys.hashNotificacion}`;
    fetch(url).then((res: any) => {
      return true;
    });
    return true;
  }
}
