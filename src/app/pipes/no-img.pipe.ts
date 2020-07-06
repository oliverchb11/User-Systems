import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';

@Pipe({
  name: 'noImg'
})
export class NoImgPipe implements PipeTransform {
url = 'https://previews.123rf.com/images/blankstock/blankstock1402/blankstock140202174/25833750-sin-icono-signo-del-usuario-no-entre-s%C3%ADmbolo-persona-avatar-humano-se%C3%B1al-de-prohibici%C3%B3n-rojo-deje-de-s%C3%ADmbolo-.jpg'
  transform(usuario:Usuario): string {
    if(usuario.imgUrl){
      return usuario.imgUrl;
    }
    else{
      return this.url;
    }
  }

}
