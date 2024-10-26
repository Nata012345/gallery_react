import * as React from "react";
import { Photo } from './types.ts';
import styles from "./index.module.scss";
import { useState } from "react";
import { TransitionPhoto } from "./TransitionPhoto";
import { Navigation } from "./Navigation";
import { PreviewGallery } from "./PreviewGallery";

interface WebPhotoGalleryProps {
    photos: Photo[];
}
export const WebPhotoGallery: React.FC<WebPhotoGalleryProps> = ({
    photos,
}) => {
    if (!photos.length) {
        return null;
    }
    const [indexActivePhoto, setIndexActivePhoto] = useState(0);
    // const activePhoto = photos[indexActivePhoto];
    const prevPhoto = photos[indexActivePhoto - 1];
    const nextPhoto = photos[indexActivePhoto + 1];

    return (
        <div className={styles.webPhotoGallery}>
            <div className={styles.webPhotoGalleryContainer}>
                <TransitionPhoto
                    photos={photos}
                    indexActivePhoto={indexActivePhoto}
                />
                <Navigation
                    className={styles.webPhotoGalleryNavigation}
                    disablePrev={!prevPhoto}
                    disableNext={!nextPhoto}
                    onPrevClick={() => {
                        setIndexActivePhoto(indexActivePhoto - 1)
                    }}
                    onNextClick={() => {
                        setIndexActivePhoto(indexActivePhoto + 1)
                    }}
                />
            </div>
            <PreviewGallery
                activePhotoIndex={indexActivePhoto}
                photos={photos}
                className={styles.webPhotoGalleryPreview}
                setNewPhoto={setIndexActivePhoto}
            />
        </div>
    )
}