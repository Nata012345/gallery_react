import {useLayoutEffect, useMemo, useRef, useState} from "react";
import * as React from "react";
import cl from "classnames";
import { CommonClassProps, Photo } from "../types.ts";
import styles from "./index.module.scss";

interface TransitionPhotoProps extends CommonClassProps {
    photos: Photo[],
    indexActivePhoto: number,
}
type RefT = React.MutableRefObject<HTMLDivElement | null>;
const getPhotoByRef = (ref: RefT, index: number) : HTMLElement | null =>
    (
        ref.current!.querySelector(`img:nth-of-type(${index + 1})`)
    );
const hidePhoto = (element: HTMLElement | null) => {
    if (!element) {
        return;
    }
    element.dataset.active = 'false';
    if (element.previousSibling) {
        element.previousSibling.dataset.active = 'false'
    }
    if (element.nextSibling) {
        element.nextSibling.dataset.active = 'false'
    }
}
const showPhoto = (element: HTMLElement | null) => {
    if (!element) {
        return;
    }
    element.dataset.active = 'true';
    if (element.previousSibling) {
        element.previousSibling.dataset.active = 'prepared'
    }
    if (element.nextSibling) {
        element.nextSibling.dataset.active = 'prepared'
    }
}
export const TransitionPhoto: React.FC<TransitionPhotoProps> = ({
                                                        className, photos, indexActivePhoto,
}) => {
    const [prevActiveIndexPhoto, setPrevIndexPhoto] = useState(indexActivePhoto);
    const containerRef = useRef<HTMLDivElement | null>(null)
    useLayoutEffect(() => {
        if (!containerRef.current) {
            return;
        }
        const activePhoto = getPhotoByRef(containerRef, prevActiveIndexPhoto);
        const nextActivePhoto = getPhotoByRef(containerRef, indexActivePhoto);
        if (prevActiveIndexPhoto !== indexActivePhoto) {
            hidePhoto(activePhoto);
            showPhoto(nextActivePhoto);
        } else {
            showPhoto(activePhoto);
        }
        setPrevIndexPhoto(indexActivePhoto);
    }, [ indexActivePhoto ]);
    return useMemo(() => (
            <div className={cl(className, styles.transitionPhoto)} ref={containerRef}>
                {photos.map((photo, id) => (
                    <img
                        key={photo.id}
                        className={styles.transitionPhotoImage}
                        data-active={id === indexActivePhoto}
                        src={photo.src}
                        alt={photo.description}
                        loading="lazy"
                    />
                ))}
            </div>
    ), []);
};