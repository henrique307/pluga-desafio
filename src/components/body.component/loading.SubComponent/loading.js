import loadingSVG from "../../../assets/gears-spinner.svg";

export function LoadingComponent() {
    return (
        <div className="loading-container"><img className="loading-svg" src={loadingSVG} alt="carregando..." /></div>
    )
}