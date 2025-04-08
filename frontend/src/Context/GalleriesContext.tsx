import { createContext, useContext, ReactNode, SetStateAction } from "react";
import useApi from "../hooks/useApi";

export type Gallery = {
  id: string;
  title: string;
  format: "html" | "json" | "yaml";
  createdTime: string;
  description: string;
  files: any[];
  template?: string;
  code?: string;
};

type ResponseData = {
  template: string;
  parsedTemplates: string[];
};

type GalleriesContextType = {
  galleries: Gallery[];
  isError: boolean;
  isLoading: boolean;
  saveTemplateCtx: (galleryId: string, responseData: ResponseData) => void;
  appendGalleryCtx: (newGallery: Gallery) => void;
  setGalleries: React.Dispatch<SetStateAction<Gallery[]>>;
};

export const GalleriesContext = createContext<GalleriesContextType | undefined>(
  undefined
);

export function GalleriesProvider({ children }: { children: ReactNode }) {
  const {
    data: galleries,
    setData: setGalleries,
    isError,
    isLoading,
  } = useApi<Gallery[]>("http://localhost:8000/galleries");

  const saveTemplateCtx = (galleryId: string, responseData: ResponseData) => {
    setGalleries((prevGalleries) =>
      prevGalleries.map((gallery) =>
        gallery.id === galleryId
          ? {
              ...gallery,
              template: responseData.template,
              code: responseData.parsedTemplates.join("\n"),
            }
          : gallery
      )
    );
  };
  const appendGalleryCtx = (newGallery: Gallery) => {
    setGalleries((prev) => [newGallery, ...prev]);
  };
  return (
    <GalleriesContext.Provider
      value={{
        galleries,
        isError,
        isLoading,
        saveTemplateCtx,
        setGalleries,
        appendGalleryCtx,
      }}
    >
      {children}
    </GalleriesContext.Provider>
  );
}

const useGalleries = () => {
  const context = useContext(GalleriesContext);

  if (!context) {
    throw new Error("useGalleries must be used within a GalleriesProvider");
  }

  return context;
};

export default useGalleries;
