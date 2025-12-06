"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Add01Icon } from "hugeicons-react";

interface PreviewFile extends File {
    preview: string;
}

export const ImagesUpload = () => {
    const [files, setFiles] = useState<PreviewFile[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const mapped = acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles((prev) => [...prev, ...mapped]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: true,
    });

    const removeFile = (file: PreviewFile) => {
        setFiles((prev) => prev.filter((f) => f !== file));
        URL.revokeObjectURL(file.preview);
    };

    return (
        <section className="w-full space-y-4">
            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={`
          flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed
          transition cursor-pointer bg-foreground/5 text-foreground-500
          hover:bg-foreground/10

          ${isDragActive ? "border-primary bg-primary/10" : "border-default-300"}
        `}
            >
                <input {...getInputProps()} />

                <Add01Icon className="text-primary w-12 h-12 mb-3" />

                {isDragActive ? (
                    <p className="text-primary font-medium">Suelta la imagen aquí…</p>
                ) : (
                    <>
                        <p className="font-medium text-foreground">Sube una imagen</p>
                        <p className="text-sm text-foreground-500 mt-1">
                            Arrastra y suelta o haz clic para seleccionar
                        </p>
                    </>
                )}
            </div>

            {/* Previews */}
            {files.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {files.map((file) => (
                        <div
                            key={file.name + file.size}
                            className="
                relative group rounded-xl overflow-hidden shadow-md
                bg-content1 border border-default-200
              "
                        >
                            <Image
                                src={file.preview}
                                alt={file.name}
                                width={300}
                                height={300}
                                className="object-cover w-full h-40"
                            />

                            <button
                                onClick={() => removeFile(file)}
                                className="
                  absolute top-2 right-2 bg-red-600 text-white
                  rounded-full w-7 h-7 text-sm flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition
                "
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
