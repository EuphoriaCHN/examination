import { Injectable } from '@nestjs/common';
import { NodeVM } from 'vm2';

@Injectable()
export class ExecuteService {
  async runJavascriptV8(code: string) {
    const res = new NodeVM({
      compiler: 'javascript',
      timeout: 10 * 1000
    }).run(code);

    console.log(res);
  }
}