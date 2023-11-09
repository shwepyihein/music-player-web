import { getMp3SignUrl } from '@/api/uploadService';
import axios from 'axios';
import { FileIcon, UploadCloud } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface IDropzoneProps extends DropzoneOptions {
  onDrop: (data: any) => void;
}

interface IDropzoneState {
  previewImage?: any;
  File: File | undefined;
  files?: File[];
  duration?: number;
  url?: string;
}

const UploadFile: React.FC<IDropzoneProps> = ({ onDrop }) => {
  const [state, setState] = useState<IDropzoneState>({
    previewImage: undefined,
    duration: 0,
    File: undefined,
    url: '',
  });

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    const resizedFile = acceptedFiles[0];

    var file = acceptedFiles[0];
    var reader = new FileReader();
    let duration;
    if (file) {
      var reader = new FileReader();
      var audio: any = document.createElement('audio');

      reader.onload = function (e: any) {
        audio.src = e.target.result;
        audio.addEventListener(
          'loadedmetadata',
          function () {
            // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
            duration = audio.duration;

            // example 12.3234 seconds
            console.log(
              'The duration of the song is of: ' + duration + ' seconds'
            );

            setState({ File: resizedFile, duration: duration });
          },
          false
        );
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const UploadFile = async (file: File | undefined) => {
    if (file) {
      setLoading(true);
      var readFile = file;
      var reader = new FileReader();
      reader.readAsDataURL(readFile);
      await getMp3SignUrl(file)
        .then(async (data) => {
          return await axios
            .put(data.url, readFile, {
              headers: {
                'Content-Type': file.type,
              },
              onUploadProgress(progressEvent: any) {
                setProgress(
                  Math.round(100 * progressEvent.loaded) / progressEvent.total
                );
              },
            })
            .then((res) => {
              setState({ ...state });
              onDrop({ file_path: data.filename, duration: state.duration });
              setLoading(false);
            });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <p className="font-semibold text-sm">Uploading Audio File</p>
      {!state.File && (
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="!mt-3  cursor-pointer ">
              <input data-testid="dropzone" {...getInputProps()} />
              {!state.previewImage && (
                <div className="border border-dashed rounded-lg h-52 w-full flex flex-col items-center justify-center">
                  <UploadCloud size={28} className="mb-5" />
                  Upload Audio File
                </div>
              )}

              {state.File && (
                <div className="flex flex-col justify-center gap-2">
                  <div>
                    <FileIcon size={24} />
                  </div>
                  <div>{state.File.type}</div>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      )}
      {state.url && <div></div>}
      {state.File && (
        <div className="!mt-1">
          <div className="py-3 mb-3">
            <Progress value={progress} />
          </div>

          <div className="flex gap-3">
            <Button
              disabled={loading}
              onClick={() => {
                setState({
                  previewImage: undefined,
                  duration: 0,
                  File: undefined,
                });
                setProgress(0);
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={() => UploadFile(state?.File)}
              type="button"
            >
              upload File
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadFile;
