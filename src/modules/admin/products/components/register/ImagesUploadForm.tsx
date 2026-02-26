"use client";

import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Add01Icon } from "hugeicons-react";
import { Alert, Card, CardBody, CardHeader } from "@heroui/react";
import clsx from "clsx";

interface PreviewFile extends File {
  preview: string;
}

interface Props {
  files: PreviewFile[];
  setFiles: (files: PreviewFile[]) => void;
  error?: string;
}

export const ImagesUploadForm = ({ files, setFiles, error }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mapped = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );
      setFiles([...files, ...mapped]);
    },
    [files, setFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    noClick: true,
  });

  const openFileDialog = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    inputRef.current?.click();
  };

  const removeFile = (file: PreviewFile) => {
    setFiles(files.filter((f) => f !== file));
    URL.revokeObjectURL(file.preview);
  };

  return (
    <Card className="min-w-fit max-h-fit bg-foreground-900">
      <CardHeader className="flex justify-between items-center">
        <span className="text-foreground text-2xl">Imagen del Producto</span>
      </CardHeader>
      <CardBody
        {...getRootProps()}
        onClick={files.length === 0 ? openFileDialog : undefined}
      >
        {error && (
          <div className="flex items-center justify-center w-full pb-4">
            <Alert
              hideIconWrapper
              color="danger"
              description={error}
              title="Error al agregar"
              variant="bordered"
            />
          </div>
        )}
        <div
          className={clsx(
            "flex flex-col items-center justify-center min-w-fit min-h-fit p-8 transition cursor-pointer bg-foreground/5 text-foreground-500 hover:bg-foreground/10 rounded-2xl border-2 border-dashed",
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-default-300",
            files.length === 0 && "h-64",
          )}
        >
          <input {...getInputProps()} ref={inputRef} />

          {files.length === 0 ? (
            <>
              <Add01Icon className="text-primary w-12 h-12 mb-3" />
              {isDragActive ? (
                <p className="text-primary font-medium">
                  Suelta la imagen aquí…
                </p>
              ) : (
                <>
                  <p className="font-medium text-foreground">Sube una imagen</p>
                  <p className="text-sm text-foreground-500 mt-1">
                    Arrastra y suelta o haz clic para seleccionar
                  </p>
                  <button
                    onClick={openFileDialog}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition"
                  >
                    Seleccionar imagen
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((file) => (
                <div
                  key={file.preview}
                  className="
                  flex flex-col items-center rounded-xl overflow-hidden shadow-md
                  bg-foreground-800 border border-default-200 p-2
                "
                >
                  <div className="relative group w-full">
                    <Image
                      src={file.preview}
                      alt={file.name}
                      width={300}
                      height={300}
                      className="object-contain w-full h-24 rounded-lg"
                    />
                    <button
                      onClick={() => removeFile(file)}
                      className="
                      absolute top-1 right-1 bg-red-600 text-white
                      rounded-full w-5 h-5 text-xs flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition
                    "
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-foreground mt-2 text-center truncate w-full">
                    {file.name}
                  </p>
                </div>
              ))}
              <div
                className="
                flex flex-col items-center justify-center rounded-xl overflow-hidden shadow-md
                bg-foreground-800 border border-default-200 p-2 cursor-pointer hover:bg-foreground-700 transition
              "
                onClick={openFileDialog}
              >
                <Add01Icon className="text-primary w-8 h-8 mb-2" />
                <p className="text-xs text-foreground text-center">
                  Agregar imagen
                </p>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
