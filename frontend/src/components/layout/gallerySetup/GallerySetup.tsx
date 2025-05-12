import FileAdder, { FilesData } from "../../widgets/FileAdder/FileAdder";
import GalleryInputs, {
  GalleryFormInputs,
} from "../../widgets/galleryInputs/GalleryInputs";
import Button from "../../UI/button/Button";
import ButtonsAction from "../../widgets/ButtonsAction/ButtonsAction";
import Modal from "../modal/Modal";
import "./gallerySetup.css";
import { useEffect, useState } from "react";
import { errObj } from "../../../types/types";
import Progress from "../../UI/Progress/Progress";
import Typography from "../../UI/typography/typography";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Countdown from "../../UI/countdown/Countdown";

type ChangeEvt = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type Props = {
  handleGalleryInputChange: (data: GalleryFormInputs) => void;
  handleFilesChange: (filesData: FilesData, isAditional: boolean) => void;
  uploadedFiles?: number;
  submitForm: () => void;
  valueTitle: string;
  valueDescription: string;
  valueFiles: File[];
  countdownTimeRes: string;
  nextFormStep: (b: boolean) => void;
};
export default function GallerySetup({
  uploadedFiles,
  handleFilesChange,

  handleGalleryInputChange,
  submitForm,
  valueTitle,
  valueDescription,
  valueFiles,
  countdownTimeRes,
  nextFormStep,
}: Props) {
  const [error, setError] = useState<errObj>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [addingMoreImages, setAddingMoreImages] = useState(false);
  const [secondsLeftCoutdown, setSecondsLeftCountdown] = useState(null);
  const [countingFinished, setCountingFinished] = useState(false);
  const STARTING_COUNTDOWN_SECONDS = 25;

  useEffect(() => {
    console.log("Countdown time received:", countdownTimeRes);

    if (countdownTimeRes) {
      const currentTime = new Date().getTime();
      const backendTime = new Date(countdownTimeRes).getTime();

      const secondsDiff = Math.max(
        0,
        Math.floor((currentTime - backendTime) / 1000)
      );
      const countdownDuration = Math.max(
        0,
        STARTING_COUNTDOWN_SECONDS - secondsDiff
      );

      console.log("Seconds left for countdown:", countdownDuration);
      setSecondsLeftCountdown(countdownDuration);
    }
  }, [countdownTimeRes]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextFormStep(true);
    setIsLoading(true);
    try {
      submitForm();
    } catch (error) {
      console.log("error occured", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsImagesModalOpen(true);
      setCountdown(true);
    }
  };

  const handleAddMoreImages = async () => {
    setIsImagesModalOpen(false);
    setAddingMoreImages(true);
  };

  const handleFinishCounting = () => {
    setCountingFinished(true);
    return { shouldRepeat: false };
  };

  return (
    <>
      <form className="create-wrapper">
        <GalleryInputs
          inputName="title"
          textAreaName="description"
          radioHTML_value="html"
          radioJSON_value="json"
          radioYAML_value="yaml"
          valueTitle={valueTitle}
          valueDescription={valueDescription}
          textAreaSize="full"
          txtInputSize="full"
          // validateTitle={error.title}
          // validateDescription={error.description}
          // validateFormat={error.format}
          onChange={handleGalleryInputChange}
          showFields={{ title: true, description: true, format: true }}
          inputsWrapWidth="48%"
        />
        <div className="right-side-wrapp">
          <FileAdder
            filesName="files"
            // validateFile={error.files}
            onChange={(filesData) => handleFilesChange(filesData, false)}
            uploadedFiles={uploadedFiles}
            valueFiles={valueFiles}
            isAddingActive={addingMoreImages}
          />
        </div>
        {/* TODO, MICI OVAJ BOTUN ODAVDE I IZBACI GA VANKA I ONDA PORAVNAJ ONE INPUTE */}
      </form>
      <ButtonsAction end={true} direction="row" style={{ marginTop: "15px" }}>
        <Button
          type="button"
          onClick={handleFormSubmit}
          color="black"
          size="medium"
          disabled={addingMoreImages}
        >
          CONTINUE
        </Button>
      </ButtonsAction>
      {/* <Modal
        isModalOpen={isImagesModalOpen}
        size="small"
        flexDirection="column"
      >
        <Typography>
          Hi, if you want to add more images you can do it but you will need to
          wait about 2 minutes or less
        </Typography>
        <ButtonsAction>
          <Button
            type="button"
            size="medium"
            outline="black"
            onClick={() => nextFormStep(true)}
          >
            I dont want to add
          </Button>
          <Button size="medium" color="black" onClick={handleAddMoreImages}>
            add more
          </Button>
        </ButtonsAction>
      </Modal>
      <Modal
        isModalOpen={addingMoreImages}
        size="medium"
        flexDirection="column"
        placement="center"
      >
        {!countingFinished ? (
          <>
            {" "}
            <Typography body={true} color="black">
              {!secondsLeftCoutdown
                ? "Ok, now please wait a little while, it's not going to be so long"
                : "You can add images for..."}
            </Typography>
            <>
              {!secondsLeftCoutdown ? (
                <DotLottieReact
                  src="https://lottie.host/955bb47f-b82f-44bc-aef8-008ad139f7b5/CDuOrZaMt9.lottie"
                  loop
                  autoplay
                />
              ) : (
                <Countdown
                  size={120}
                  duration={secondsLeftCoutdown}
                  isPlaying={addingMoreImages}
                  strokeWidth={8}
                  onComplete={handleFinishCounting}
                />
              )}
            </>
            <ButtonsAction end={true}>
              <Button
                type="button"
                size="medium"
                outline="black"
                onClick={() => nextFormStep(true)}
              >
                continue without adding
              </Button>
            </ButtonsAction>
          </>
        ) : (
          <>
            <FileAdder
              filesName="files"
              // validateFile={error.files}
              onChange={(filesData) => handleFilesChange(filesData, true)}
              uploadedFiles={uploadedFiles}
              valueFiles={valueFiles}
              isAddingActive={addingMoreImages}
            />
            <ButtonsAction end={true}>
              <Button size="medium" color="black" onClick={extraFilesSubmit}>
                Next
              </Button>
            </ButtonsAction>
          </>
        )}
      </Modal> */}
    </>
  );
}
