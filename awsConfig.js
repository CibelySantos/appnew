// Cibely Cristiny dos Santos

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'ASIAV3QTLJ64R4UONWKJ',
  secretAccessKey: 'fKds6oZ1YV4fWo6rcLbLyThKfQcxK4YJglbQlQBl',
  sessionToken: 'IQoJb3JpZ2luX2VjENP//////////wEaCXVzLXdlc3QtMiJGMEQCIEAVx/P7bF2Xg826oEZSpZmx8c9Sg3/uwx9/5lb61qbxAiA7oT1XOL0k/Hie0wG3AfDMyNDSoDBHMlscOegHflqYIyq2AghcEAEaDDQwMjY5Mzc3MTE5MyIMyAlXKxvJ0OvbEXR7KpMCHEa5XMPLfpYPRMPeEnveQxzUqn+DqhN4NHKweL+O3Q3qf/h3gBprAJ7DNUK5/7ai3vKDItIQBPDO6dW+ETC62u6ssC/yfEOm9jOK7sNYfaTODBAdDY3c56+B6hn1eXHPXVOrQpFOPVkepS34fRIRJydwNHoxkQ85744+WG7rdgowXj+dL4pe1yQzr4SnN2bTGH2fg34szZbFjHmZgkUEFNwtK4C8w/yffAEsqHRdW846UE03SSeYc6xY4SXN8RXGWSZb8JcQ8tT3UaKacgjeMCBuuZ0GPa70TLu5uQkAnZfmhofdQnFzpJhg4Jss8GlP9owd9N3FxhnaOX+woU9IE44bkabWP7qx2fXrRBWq+A+RgZgwr7uDwAY6ngFb9b4yFph9q5j2ZcS4tI8Pzu0I1bAlW73xCZqH0WMsT231rD/RJjEFh+hGhpf/Rj5OMY2Z2AeBrVXjXYNMeitbJuom71GJSTnbiDoKsstx1jebNo6XRN84L+fjC1B6P+RrIydrDcOo0eANA7ceeP6egOrbexORoY89q3dJAmIyOS6DU53pPdLKXTd1pt+EqyvwyQE6H5EbNEHnasXmdA==',
  region: 'us-east-1', 
  signatureVersion: 'v4',
});

export default s3;