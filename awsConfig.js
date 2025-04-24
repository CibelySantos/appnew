// awsConfig.js
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'ASIA4ZTBS33DYMF6TNZB',
  secretAccessKey: 'tIi2bfVqRv46voH3iyishk14VJ0efd7GE3ZpEPP2',
  sessionToken: 'IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIG/9CbHXTa1xFHEnDpU8kmdWkI3Hl0yUVSvFVpDIrxz3AiEAwDPlDTg8B7/79kUPj2al+6WqpL30MyizD9oMoNr6s4MqsQIIGBAAGgw4Nzk1OTkyMTQyNzkiDOdJuqdAZ24n1uk1tSqOAgM3ywiXddZbPvODnKwC49eIntaQs/XEgSgzvQ32bKAO3KeK/Q0bs1SkBCYOGAmQOF4za/9VRUsrSLcFiYh2UItIg/2gyLmpZnJALhqgJaUdsPJuFtqLUYHlRXCf4x+DSObCv3W9zOvPnlHoFJDJuulozehk5vk7IPvOD9KIbCj8yF1njsg5+ZVIj5aV2BlM7HM/VveYCKfliduMRmz5qBz+zKPg0WNDjn9OWvn8I/3yQ0gVoS+0FpK42F/L10Xjg9x4Bum90FeH5DgAsb5dFWNymWjHYfimYLjPD0Sj4JAIhEPPWUgV4YvUU1WoAfQ9lL8f1Qk9xUzTix+Mj6GQSa0p0PRq28OcuUacPtA+1DDYoanABjqdAWGDPUpY4vA7wVtUoSKjB/EwcFo9/B3yYjN8BEGYJZmdD4k6VzkWR/tMlqCbTfDjYd2PyLsCPRLmnSiwjRdYRw8ZDAytRmlahqWyxSiXrWyuqlk/s2u2zOKzTBc7zbIBbpXockJuwuTgSlwA4MalOIsJNxNJ0dH738skFquk0p0zof6xXM7Cs5gU4pL3ZC74RHNdnR0QnPyIwsPLh+Q=',
  region: 'us-east-1', // ajuste para a sua região
  signatureVersion: 'v4',
});

export default s3;
