import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {JuradoRepository, UsuarioJuradoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class SesionJuradoService {
  constructor(
    /* Add @inject to inject parameters */
    @repository(UsuarioJuradoRepository)
    public juradoUsuarioRepository: UsuarioJuradoRepository,
    @repository(JuradoRepository)
    public juradoRepository: JuradoRepository,
  ) {}

  /*
   * Add service methods here
   */
}
