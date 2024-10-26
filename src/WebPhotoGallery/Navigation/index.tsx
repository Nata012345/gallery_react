import * as React from "react";
import cl from "classnames";
import { CommonClassProps } from "../types.ts";
import styles from "./index.module.scss";

interface NavigationProps extends CommonClassProps {
    disablePrev: boolean;
    disableNext: boolean;
    onPrevClick: () => void;
    onNextClick: () => void;
}
export const Navigation: React.FC<NavigationProps> = ({
                                                          disablePrev,
                                                          disableNext,
                                                          onPrevClick,
                                                          onNextClick,
                                                          className
}) => (
    <div className={cl(styles.navigation, className)}>
        <button
            disabled={disablePrev}
            className={cl(
                styles.navigationBtn,
                styles.navigationLeft,
            )}
            onClick={onPrevClick}
        >
            Show previous photo
        </button>
        <button
            disabled={disableNext}
            className={cl(
                styles.navigationBtn,
                styles.navigationBtnRight,
            )}
            onClick={onNextClick}
        >
            Show next photo
        </button>
    </div>
);