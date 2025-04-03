import "./dragDrop.css";
import { useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  count: number;
  formats: string[];
  onUpload: (droppedFiles: File[]) => void;
};

export default function DragDrop({
  children,
  count,
  formats,
  onUpload,
}: Props) {
  const drop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropZone = drop.current;
    if (dropZone) {
      dropZone.addEventListener("dragover", handleDragOver);
      dropZone.addEventListener("drop", handleDrop);
    }

    return () => {
      if (dropZone) {
        dropZone.removeEventListener("dragover", handleDragOver);
        dropZone.removeEventListener("drop", handleDrop);
      }
    };
  }, []);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer?.files || []);

    if (count && count < files.length) {
      console.log(`sorry max uploading files is ${count}`);
      return;
    }

    if (
      formats &&
      files.some(
        (file) =>
          !formats.some((format) =>
            file.name.toLowerCase().endsWith(format.toLowerCase())
          )
      )
    ) {
      console.log(
        `Only following file formats are acceptable: ${formats.join(", ")}`
      );
      return;
    }

    if (files && files.length) {
      onUpload(files);
    }
  };

  return (
    <div className="file-adder-el" ref={drop}>
      {children}
    </div>
  );
}
