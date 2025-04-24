import { Buffer } from 'buffer';

const S3_BUCKET = 'bucket-storage-senai-14';
const REGION = 'us-east-1';

export default async function uploadImageToS3(uri, userId = 'default') {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const filename = uri.split('/').pop();
    const filePath = `profile_images/${userId}/${filename}`;
    const uploadUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${filePath}`;

    const res = await fetch(uploadUrl, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': 'image/jpeg',
        'x-amz-acl': 'public-read',
      },
    });

    if (!res.ok) throw new Error('Erro ao enviar imagem para o S3');

    return uploadUrl;
  } catch (error) {
    console.error('Erro no upload da imagem:', error);
    throw error;
  }
}
