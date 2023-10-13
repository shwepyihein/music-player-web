import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';

interface IDropzoneProps extends DropzoneOptions {
  onDrop: (acceptedFiles: File[]) => void;

  imageUrl: string | null | undefined;
}

interface IDropzoneState {
  previewImage?: string;
  files?: File[];
}

const UploadImage: React.FC<IDropzoneProps> = ({ onDrop, imageUrl }) => {
  const [state, setState] = useState<IDropzoneState>({
    previewImage: undefined,
  });

  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    const resizedFile = acceptedFiles[0];
    onDrop([resizedFile]);
    setState({ previewImage: URL.createObjectURL(resizedFile) });
  }, []);

  useEffect(() => {
    if (imageUrl) {
      setState({ previewImage: imageUrl });
    }
  }, []);

  return (
    <>
      <p className="font-semibold text-sm">Uploading Audio Image</p>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="!mt-2  cursor-pointer ">
            <input data-testid="dropzone" {...getInputProps()} />
            {!state.previewImage && (
              <div className="border border-dashed rounded-lg h-52 w-full flex flex-col items-center justify-center">
                <UploadCloud size={28} className="mb-5" />
                Upload Audio Image
              </div>
            )}

            {state.previewImage && (
              <div className="border border-dashed rounded-lg h-full w-full flex flex-col items-center justify-center">
                <Image
                  width="300"
                  height="400"
                  role="img"
                  src={state.previewImage}
                  alt="Preview"
                  className={
                    ' bg-[#F2F2F2]   border-gray-500 border flex items-center justify-center  '
                  }
                />
              </div>
            )}
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default UploadImage;
