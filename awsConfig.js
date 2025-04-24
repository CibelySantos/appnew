// awsConfig.js
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'ASIA4ZTBS33DV5HDBRFM',
  secretAccessKey: 'Iv+j4zLLuXRXu5fvF8YjVDnSAie/dO4zcbKXTi8H',
  sessionToken: 'IQoJb3JpZ2luX2VjEHsaCXVzLXdlc3QtMiJGMEQCIH842b01nDm+tKqdECY+uWPGqrxcs+gX5gaDLDvWKmtrAiBjB6vgH3Z/nIsnTcs/ErkpgZFdJUf73LNoQakUKzEpsiqxAggUEAAaDDg3OTU5OTIxNDI3OSIM/v/fqk0kNNTbWsqPKo4CZPIxW6S81QxezHh2wB1Ndgu+mog+orzSWQHrIHDwBc1B5kPHs7vmBTVOGzsqXWihsm0M+GgUyxA9L2wavCLpCYtJ7Esf58oTf17v5JYK7QseVz7RGTADCmIRbQ9/qwUw9WkI7vPqivoJi6eBSrYgmYbOLvW8ztJq23t7EYHCd9JnbGEXbhuUi/C03QrwKROLxmPY9E6upERq4h/pRbDtJ/zZS9H2kWihyUI62nLuBsaxe74+AxZfy1dsWqyUatxixfiUTxqaOcke2sh/eJ/1rfl7qOLeLZf8mmkdLxiG4YbGSgGF87RpLUnOnocPsSNnsVezMnGzX+x7Odz0HjjUOlfQ/X8ltt3yBfzcZgX3MJOrqMAGOp4BiY0vSVKCTOPMFXaWfCja+9AXY1FnkJaHPqYgGWemQTT8nGWgfc8UAf/RqPZK6UMGuGtmMXdZoEdntbfIZbQBXRgCFzwQyvDtwl4RHDgsT1WcuiEe/ClpFbP6BQvoVIhC2oMIRdOsPOzQfVwKi0X1NpItBoLm1xw4dPregKj3fTGsc4aFjBlupQ5rkmz8Bn4TEQzHN3iOFILYEMFo3Kk=',
  region: 'us-east-1', // ajuste para a sua região
  signatureVersion: 'v4',
});

export default s3;
