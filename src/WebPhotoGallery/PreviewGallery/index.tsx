import * as React from "react";
import cl from "classnames";
import { CommonClassProps, Photo } from "../types.ts";
import styles from "./index.module.scss";
import {useEffect, useMemo, useRef} from "react";

interface PreviewGalleryProps extends CommonClassProps {
    activePhotoIndex: number;
    photos: Photo[];
    setNewPhoto: (id: number) => void;
}
export const PreviewGallery: React.FC<PreviewGalleryProps> = (
    { activePhotoIndex, photos, className, setNewPhoto }) => {
        if (!photos.length) {
            return null;
        }
        const previewContainer = useRef<HTMLUListElement>(null);
        useEffect(() => {
            if (!previewContainer.current) {
                return;
            }
            previewContainer.current.style.transform = `translate3d(-${activePhotoIndex * 164}px, 0, 0)`;
        }, [ activePhotoIndex ]);
        return (
            <div className={cl(styles.previewGallery, className)}>
                {useMemo(() => (
                        <ul
                            className={styles.previewGalleryTrack}
                            ref={previewContainer}
                        >
                            {photos.map((photo, id) => (
                                <li key={photo.id}>
                                    <button
                                        className={styles.previewGalleryPreview}
                                        onClick={() => setNewPhoto(id)}>
                                        <img
                                            src={photo.preview}
                                            alt={photo.description}
                                            className={styles.previewGalleryImage}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                ), [])}
                <div className={styles.previewGalleryCover}>
                    {activePhotoIndex + 1} / {photos.length}
                </div>
            </div>
        )
};