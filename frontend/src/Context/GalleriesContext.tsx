import {
  createContext,
  useContext,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import useApi from "../hooks/useApi";
import { GalleryMetadata } from "../components/pages/Home/Home";

export type Gallery = {
  id?: string;
  title?: string;
  format?: "html" | "json" | "yaml";
  createdTime?: string;
  description?: string;
  numberOfFiles?: number;
  files?: File[];
  template?: string;
  parsedTemplates?: string;
};

export type ResponseData = {
  template?: string;
  parsedTemplates?: string;
};

export type UpdateResponse = {
  title?: string;
  description?: string;
  parsedTemplates?: string;
};

type GalleriesContext = {
  galleries: Gallery[];
  saveTemplateCtx: (galleryId: string, responseData: ResponseData) => void;
  appendGalleryCtx: (newGallery: Gallery) => void;
  setGalleries: React.Dispatch<SetStateAction<Gallery[]>>;
  isInitialLoad: boolean;
  isInitialError: boolean;

  deleteGalleryCtx: (id: string) => void;
  updateGalleryCtx: (id: string, obj: UpdateResponse) => void;
};

export const GalleriesContext = createContext<GalleriesContext | undefined>(
  undefined
);

export function GalleriesProvider({ children }: { children: ReactNode }) {
  const {
    data: initialData,
    isLoading: isInitialLoad,
    isError: isInitialError,
  } = useApi<GalleryMetadata[]>("http://localhost:8000/galleries/metadata");
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  useEffect(() => {
    if (initialData) {
      setGalleries(initialData);
    }
  }, [initialData]);

  const saveTemplateCtx = (galleryId: string, responseData: ResponseData) => {
    setGalleries((prevGalleries) =>
      prevGalleries.map((gallery) =>
        gallery.id === galleryId
          ? {
              ...gallery,
              template: responseData.template,
              parsedTemplates: responseData.parsedTemplates,
            }
          : gallery
      )
    );
  };

  const deleteGalleryCtx = (id: string) => {
    setGalleries((prevGalleries) =>
      prevGalleries.filter((gallery) => gallery.id !== id)
    );
  };

  const appendGalleryCtx = (newGallery: Gallery) => {
    setGalleries((prev) => [newGallery, ...prev]);
  };

  const updateGalleryCtx = (id: string, obj: UpdateResponse) => {
    setGalleries((prev) =>
      prev.map((gallery) =>
        gallery.id === id
          ? {
              ...gallery,
              ...(obj.title !== undefined && { title: obj.title }),
              ...(obj.description !== undefined && {
                description: obj.description,
              }),
              ...(obj.parsedTemplates !== undefined && {
                parsedTemplates: obj.parsedTemplates,
              }),
            }
          : gallery
      )
    );
  };

  return (
    <GalleriesContext.Provider
      value={{
        galleries,
        saveTemplateCtx,
        appendGalleryCtx,
        setGalleries,
        isInitialLoad,
        isInitialError,
        updateGalleryCtx,

        deleteGalleryCtx,
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
