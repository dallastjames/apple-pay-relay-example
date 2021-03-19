import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  public static cert: any;
  public static key: any;

  public async applePaySessionStart(data: {
    validationUrl: string;
    body: any;
  }): Promise<any> {
    const cert = this.loadCert();
    const key = this.loadKey();
    try {
      const res = await axios.post(data.validationUrl, data.body, {
        httpsAgent: new https.Agent({
          cert: cert,
          key: key,
        }),
      });
      return res.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  private loadCert(): any {
    // Only load the cert once to save on processing for each subsequent request
    if (!AppService.cert) {
      const certLocation = path.resolve(__dirname, './assets/merchant_id.pem');
      AppService.cert = fs.readFileSync(certLocation, 'utf-8');
    }
    return AppService.cert;
  }

  private loadKey(): any {
    // Only load the cert once to save on processing for each subsequent request
    if (!AppService.key) {
      const keyLocation = path.resolve(__dirname, './assets/applepay.key');
      AppService.key = fs.readFileSync(keyLocation, 'utf-8');
    }
    return AppService.key;
  }
}
