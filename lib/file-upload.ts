import { toast } from 'sonner';

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const ACCEPTED_PDF_TYPES = ['application/pdf'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateFile(file: File, acceptedTypes: string[]): boolean {
  if (!acceptedTypes.includes(file.type)) {
    toast.error('Type de fichier non pris en charge');
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    toast.error('Le fichier est trop volumineux (max 5MB)');
    return false;
  }

  return true;
}