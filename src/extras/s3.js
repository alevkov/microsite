import AWS from 'aws-sdk';

console.log(process.env);
export default class CloudInterface {
  static _url = 'https://s3.us-east-2.amazonaws.com/helios-photos/'
  static _bucket = 'helios-photos';
  static _region = 'us-east-2';
  static _accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  static _secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

  constructor() {
    this.s3 = new AWS.S3({
      region: CloudInterface._region,
      accessKeyId: CloudInterface._accessKeyId,
      secretAccessKey: CloudInterface._secretAccessKey
    });
  }

  list = (bucket, key) => {
    return new Promise((resolve, reject) => {
      let result = [];
      const params = { 
        Bucket: bucket,
        Delimiter: '',
        Prefix: key
      }

      this.s3.listObjects(params, function (err, data) {
        if (err) {
          reject(err);
          return;
        }
        data.Contents.forEach(element => {
          result.push(`${CloudInterface._url}${element.Key}`);
        });
        resolve(result);
      });
    });
  }
}