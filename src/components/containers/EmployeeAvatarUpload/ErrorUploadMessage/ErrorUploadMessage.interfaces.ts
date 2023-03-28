import { FileError } from 'react-dropzone'

export interface IErrorUploadMessageProps {
  file: File
  errors: FileError[]
}
