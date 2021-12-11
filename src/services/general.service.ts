import {/* inject, */ BindingScope, injectable} from '@loopback/core';
const generator = require('generate-password');
var CryptoJS = require('crypto-js');
@injectable({scope: BindingScope.TRANSIENT})
export class GeneralService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  crearClaveAleatoria() {
    let password = generator.generate({
      length: 8,
      numbers: true,
      uppercase: true,
    });
    return password;
  }

  cifrarTexto(texto: string) {
    let textoCifrado = CryptoJS.MD5(texto).toString();
    return textoCifrado;
  }
}
