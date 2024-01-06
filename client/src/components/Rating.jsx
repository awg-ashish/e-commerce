/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
const Rating = ({ rating }) => {
    return (
        <div className="text-orange-600 h-10">
            <span className="-mr-1">
                {rating >= 1 ? (
                    <StarIcon className="scale-75" />
                ) : rating >= 0.5 ? (
                    <StarHalfIcon className="scale-75" />
                ) : (
                    <StarOutlineIcon className="scale-75" />
                )}
            </span>
            <span className="-mr-1">
                {rating >= 2 ? (
                    <StarIcon className="scale-75" />
                ) : rating >= 1.5 ? (
                    <StarHalfIcon className="scale-75" />
                ) : (
                    <StarOutlineIcon className="scale-75" />
                )}
            </span>
            <span className="-mr-1">
                {rating >= 3 ? (
                    <StarIcon className="scale-75" />
                ) : rating >= 2.5 ? (
                    <StarHalfIcon className="scale-75" />
                ) : (
                    <StarOutlineIcon className="scale-75" />
                )}
            </span>
            <span className="-mr-1">
                {rating >= 4 ? (
                    <StarIcon className="scale-75" />
                ) : rating >= 3.5 ? (
                    <StarHalfIcon className="scale-75" />
                ) : (
                    <StarOutlineIcon className="scale-75" />
                )}
            </span>
            <span className="-mr-1">
                {rating >= 5 ? (
                    <StarIcon className="scale-75" />
                ) : rating >= 4.5 ? (
                    <StarHalfIcon className="scale-75" />
                ) : (
                    <StarOutlineIcon className="scale-75" />
                )}
            </span>
        </div>
    );
};

export default Rating;
