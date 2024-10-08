import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import update from "react-addons-update";

import { ImageData } from "../../interfaces/imageDataInterface";
import { DragItem } from "../../interfaces/common";
import Loader from "../Loader/Loader";
import Card from "./ImageCard";
import Modal from "../Modal/Modal";
import {
  addImageData,
  getAllImages,
  updateBulkImage,
} from "../../helper/api/methods";
import { getLastUpdateAt } from "../../helper/readableDateFormat";
import { mockData } from "../../helper/mockData";
import "./Images.css";

const ImagesGrid: React.FC = () => {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const [imageOverlay, setImageOverlay] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string>("");
  const [savingUpdate, setSavingUpdate] = useState<boolean>(false);
  const [lastTouch, setLastTouch] = useState<Date>();
  const [startSaving, setStartSaving] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const flag = false;
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedData = await getAllImages();
        if (!fetchedData?.data || fetchedData?.data?.length === 0) {
          const { updatedAt } = await addImageData(mockData);
          setImagesData(mockData);
          setLastUpdatedAt(updatedAt);
        } else {
          setImagesData(
            fetchedData?.data?.sort(
              (a: ImageData, b: ImageData) => a.position - b.position
            )
          );
          setLastUpdatedAt(fetchedData?.updatedAt);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const updateDataHandler = async () => {
      try {
        setSavingUpdate(true);
        const { updatedAt } = await updateBulkImage(imagesData);
        setLastUpdatedAt(updatedAt);
      } catch (error) {
        console.error(error);
      } finally {
        setSavingUpdate(false);
      }
    };
    let intervalId: NodeJS.Timeout | undefined;

    if (startSaving) {
      intervalId = setInterval(() => {
        updateDataHandler();
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imagesData), startSaving]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeDifference = lastTouch && Math.abs(
        lastTouch?.getTime() - new Date().getTime()
      );
  
      if (timeDifference && timeDifference > 10000) {
        setStartSaving(false);
      }
      setCurrentTime(new Date());
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [lastTouch]);

  const moveCard = async (dragIndex: number, hoverIndex: number) => {
    const dragCard = imagesData[dragIndex];
    const updatedCards = update(imagesData, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });
    setImagesData(updatedCards);

    setLastTouch(new Date());
    setStartSaving(true);
  };

  const [, drop] = useDrop({
    accept: "card",
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = imagesData.findIndex(
        (image) => image.type === item.id
      );

      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
      setLastTouch(new Date());
      setStartSaving(true);
    },
  });

  const handleImageClick = (item: ImageData) => setImageOverlay(item);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {flag && currentTime}
          <div className="update-info">
            <span>
              Last updated:{" "}
              {getLastUpdateAt(lastTouch ? `"${lastTouch.toISOString()}"` : lastUpdatedAt)}
            </span>
            {savingUpdate && <span className="saving">Saving...</span>}
          </div>
          <div ref={drop} className="card-grid">
            {imagesData?.map((card, index) => (
              <Card
                key={card.type}
                item={card}
                index={index}
                onClick={handleImageClick}
                moveCard={moveCard}
              />
            ))}
            {imageOverlay && (
              <Modal
                data={imageOverlay}
                onClose={() => setImageOverlay(null)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImagesGrid;
