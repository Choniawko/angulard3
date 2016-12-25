import { environment } from '../../environments/environment';
export const devConsole:any = {};
devConsole.log = (msg: any, key:string = '')  => { environment.production ? null : console.log(key, msg)  }
devConsole.error = (msg: any, key:string = '')  => { environment.production ? null : console.error(key, msg)  }
devConsole.warn = (msg: any, key:string = '')  => { environment.production ? null : console.warn(key, msg)  }
devConsole.table = (msg: any, key:string = '')  => { environment.production ? null : console.table(key, msg)  }
