import "../styles/paper-card.css";

function PaperCard({
    children,
    className = "",
    onClick,
    padding = "md"
}) {

    return (
        <div
            className={`paper-card paper-card-${padding} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );

}

export default PaperCard;